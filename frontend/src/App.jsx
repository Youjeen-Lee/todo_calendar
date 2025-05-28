import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TitleHeader from './components/UI/TitleHeader';
import CustomCalendar from './components/Calendar/CustomCalendar';
import TodoList from './components/Todo/TodoList';
import TodoModal from './components/Todo/TodoModal';
import { AddTodoButton } from './components/UI/Buttons';
import { formatDate, setKoreanMidnight } from './utils/dateUtils';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// API 기본 주소
const API_BASE_URL = 'http://localhost:8082/api';

// 전체 앱 컨테이너
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.section`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

function App() {
    const [todos, setTodos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newTodo, setNewTodo] = useState('');
    const [priority, setPriority] = useState('MID');

    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editPriority, setEditPriority] = useState('MID');

    useEffect(() => {
        fetchTodos();
    }, []);

    // 전체 할 일 목록 조회
    const fetchTodos = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/todos`);
            setTodos(res.data);
        } catch (err) {
            const errorMsg = err.response?.data || '할 일 목록 불러오기 실패';
            toast.error(errorMsg);
            console.error(err);
        }
    };

    // 날짜 클릭 시 선택
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // 선택된 날짜에 해당하는 할 일 목록 필터링
    const getTodosByDate = () => {
        const koreanDate = new Date(selectedDate);
        koreanDate.setHours(9, 0, 0, 0); // 한국 시간 00:00:00

        return todos
            .filter(todo => {
                if (!todo.dueDate) return false;
                const todoDate = new Date(todo.dueDate);
                todoDate.setHours(9, 0, 0, 0); // 한국 시간 00:00:00
                return todoDate.getTime() === koreanDate.getTime();
            })
            .sort((a, b) => {
                // 1. 완료 여부로 먼저 정렬
                if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                }
                
                // 2. 우선순위로 정렬 (HIGH > MID > LOW)
                const priorityOrder = { HIGH: 0, MID: 1, LOW: 2 };
                if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                }
                
                // 3. 같은 우선순위 내에서는 생성일자로 정렬
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
    };

    // 새로운 할 일 등록
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            // 한국 시간대로 날짜 설정
            const koreanDate = new Date(selectedDate);
            koreanDate.setHours(9, 0, 0, 0); // 한국 시간 00:00:00
            const formattedDueDate = koreanDate.toISOString();

            // 임시 ID로 UI에 먼저 추가
            const tempTodo = {
                id: Date.now(),
                title: newTodo,
                completed: false,
                priority: priority,
                dueDate: formattedDueDate
            };
            
            setTodos(prevTodos => [...prevTodos, tempTodo]);
            setNewTodo('');
            setPriority('MID');
            setEditingTodo(null);

            const response = await axios.post(`${API_BASE_URL}/todos`, {
                title: newTodo,
                completed: false,
                priority: priority,
                dueDate: formattedDueDate
            });

            if (response.data) {
                setTodos(prevTodos => prevTodos.map(todo =>
                    todo.id === tempTodo.id ? response.data : todo
                ));
            }
        } catch (err) {
            const errorMsg = err.response?.data || '할 일 추가 실패';
            toast.error(errorMsg);
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== tempTodo.id));
            console.error(err);
        }
    };

    // 할 일 수정 저장
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingTodo) return;

        try {
            const formattedDueDate = editingTodo.dueDate || null;

            const updatedData = {
                id: editingTodo.id,
                title: editTitle,
                priority: editPriority,
                completed: editingTodo.completed,
                dueDate: formattedDueDate,
                description: editingTodo.description || '',
                memo: editingTodo.memo || '',
                createdAt: editingTodo.createdAt,
                updatedAt: editingTodo.updatedAt
            };

            // 먼저 UI를 업데이트
            setTodos(prevTodos => prevTodos.map(todo =>
                todo.id === editingTodo.id ? {
                    ...todo,
                    title: editTitle,
                    priority: editPriority,
                    dueDate: formattedDueDate
                } : todo
            ));

            // 서버에 업데이트 요청
            const response = await axios.put(`${API_BASE_URL}/todos/${editingTodo.id}`, updatedData);

            // 서버 응답으로 최종 업데이트
            if (response.data) {
                setTodos(prevTodos => prevTodos.map(todo =>
                    todo.id === editingTodo.id ? response.data : todo
                ));
            }

            setEditingTodo(null);
            setEditTitle('');
            setEditPriority('MID');
        } catch (err) {
            const errorMsg = err.response?.data || '수정 실패';
            toast.error(errorMsg);
            setTodos(prevTodos => prevTodos.map(todo =>
                todo.id === editingTodo.id ? editingTodo : todo
            ));
            console.error(err);
        }
    };

    // 할 일 삭제
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/todos/${id}`);
            setTodos(prev => prev.filter(todo => todo.id !== id));
        } catch (err) {
            const errorMsg = err.response?.data || '삭제 실패';
            toast.error(errorMsg);
            console.error(err);
        }
    };

    // 할 일 완료 토글
    const toggleTodo = async (id, completed) => {
        const target = todos.find(todo => todo.id === id);
        if (!target) return;

        try {
            // 먼저 UI 업데이트
            setTodos(prevTodos => prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !completed } : todo
            ));

            const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
                ...target,
                completed: !completed
            });

            if (response.data) {
                setTodos(prevTodos => prevTodos.map(todo =>
                    todo.id === id ? response.data : todo
                ));
            }
        } catch (err) {
            const errorMsg = err.response?.data || '완료 상태 변경 실패';
            toast.error(errorMsg);
            setTodos(prevTodos => prevTodos.map(todo =>
                todo.id === id ? target : todo
            ));
            console.error(err);
        }
    };

    // 수정 버튼 클릭 시 모달 열기
    const handleEdit = (todo) => {
        setEditingTodo(todo);
        setEditTitle(todo.title);
        setEditPriority(todo.priority);
    };

    return (
        <Container>
            <ToastContainer position="top-right" autoClose={3000} />

            <TitleHeader />
            <CustomCalendar selectedDate={selectedDate} onDateChange={handleDateChange} todos={todos} />

            <AddTodoButton onClick={() => setEditingTodo({})}>
                할 일 +
            </AddTodoButton>

            <Section>
                <SectionTitle>{formatDate(selectedDate)}</SectionTitle>
                <TodoList
                    title=""
                    todos={getTodosByDate()}
                    toggleTodo={toggleTodo}
                    handleEdit={handleEdit}
                    deleteTodo={deleteTodo}
                />
            </Section>

            {editingTodo && (
                <TodoModal
                    editingTodo={editingTodo}
                    newTodo={newTodo}
                    setNewTodo={setNewTodo}
                    priority={priority}
                    setPriority={setPriority}
                    editTitle={editTitle}
                    setEditTitle={setEditTitle}
                    editPriority={editPriority}
                    setEditPriority={setEditPriority}
                    handleSubmit={handleSubmit}
                    handleEditSubmit={handleEditSubmit}
                    onCancel={() => setEditingTodo(null)}
                />
            )}
        </Container>
    );
}

export default App;
