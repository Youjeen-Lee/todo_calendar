import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-calendar/dist/Calendar.css';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Pretendard', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const TodoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const DateInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0056b3;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoGroup = styled.div`
  margin-bottom: 2rem;
`;

const GroupTitle = styled.h2`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const Checkbox = styled.input`
  margin-right: 1rem;
  width: 20px;
  height: 20px;
`;

const PriorityDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => {
    switch (props.priority) {
      case 'HIGH':
        return '#ff3b30';
      case 'MID':
        return '#ff9500';
      case 'LOW':
        return '#34c759';
      default:
        return '#8e8e93';
    }
  }};
`;

const PriorityButton = styled.button`
  padding: 0.3rem 0.6rem;
  margin-left: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  font-size: 0.8rem;
  &:hover {
    background-color: #f5f5f7;
  }
`;

const TodoText = styled.span`
  flex: 1;
  font-size: 1.1rem;
  color: #333;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.5 : 1};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DeleteButton = styled.button`
  padding: 0.5rem;
  background-color: #ff3b30;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #d63029;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
  font-size: 1.5rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const ModalSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #9370db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #8a2be2;
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #8e8e93;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #6e6e73;
  }
`;

const TodoDate = styled.span`
  font-size: 0.9rem;
  color: #666;
  background-color: #f5f5f7;
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: 10px;
`;

const CalendarContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
`;

const MonthYear = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const NavigationButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const NavigationButton = styled.button`
  background: #fff;
  border: none;
  font-size: 1.2rem;
  color: #9370db;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  &:hover {
    color: #8a2be2;
  }
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  font-family: 'Pretendard', sans-serif;

  .react-calendar__navigation__label {
    background: none !important;
  }

  .react-calendar__tile {
    padding: 1rem 0.5rem;
    position: relative;
    border-radius: 12px;
    margin: 2px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .react-calendar__tile--now {
    background: #f0f0f0;
    abbr {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  .react-calendar__tile--active {
    background-color: #9370db !important;
    abbr {
      font-weight: bold;
      text-decoration: underline;
      color: white;
    }
  }

  .react-calendar__navigation button {
    font-size: 1rem;
    margin-top: 8px;
  }

  .react-calendar__month-view__weekdays {
    font-weight: bold;
    color: #666;
  }
`;

const AddTodoButton = styled.button`
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background-color: #9370db;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #8a2be2;
  }
`;

const TodoCount = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: ${props => props.isSelected ? '#8a2be2' : '#e6e6fa'};
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 2px;
`;

const SelectedDateTodos = styled.div`
  margin-top: 2rem;
`;

const SelectedDateTitle = styled.h2`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const CustomCalendar = styled.div`
  width: 100%;
  font-family: 'Pretendard', sans-serif;
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  color: #666;
  margin-bottom: 0.5rem;
`;

const Weekday = styled.div`
  padding: 0.5rem;
  color: ${props => props.isWeekend ? '#ff3b30' : '#666'};
  font-size: 1.1rem;
  font-weight: bold;
`;

const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const Day = styled.button`
  padding: 1.2rem 0.5rem;
  position: relative;
  border-radius: 12px;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.isWeekend ? '#ff3b30' : '#333'};
  min-height: 65px;
  font-size: 1.1rem;
  margin: 1px;

  &:hover {
    background-color: #e6e6fa;
  }

  &.selected {
    background-color: #9370db !important;
    color: white;
  }

  &.today {
    background: #fff;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const API_BASE_URL = 'http://localhost:8082/api';

function CustomCalendarComponent({ selectedDate, onDateChange, todos }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const formatMonthYear = (date) => {
    return format(date, 'yyyy년 MM월', { locale: ko });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // 현재 달의 날짜들만 추가
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      days.push(day);
    }

    // 첫 날의 요일을 기준으로 앞에 빈 칸 추가
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.unshift(null);
    }

    // 마지막 날의 요일을 기준으로 뒤에 빈 칸 추가
    const lastDayOfWeek = lastDay.getDay();
    for (let i = lastDayOfWeek; i < 6; i++) {
      days.push(null);
    }

    return days;
  };

  const getTodoCount = (date) => {
    return todos.filter(todo => {
      if (!todo.dueDate || todo.completed) return false;
      const todoDate = new Date(todo.dueDate);
      return todoDate.toDateString() === date.toDateString();
    }).length;
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <CustomCalendar>
      <CalendarHeader>
        <MonthYear>{formatMonthYear(currentDate)}</MonthYear>
        <NavigationButtons>
          <NavigationButton onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() - 1);
            setCurrentDate(newDate);
          }}>&lt;</NavigationButton>
          <NavigationButton onClick={() => {
            const newDate = new Date(currentDate);
            newDate.setMonth(newDate.getMonth() + 1);
            setCurrentDate(newDate);
          }}>&gt;</NavigationButton>
        </NavigationButtons>
      </CalendarHeader>

      <Weekdays>
        {weekdays.map((day, index) => (
          <Weekday key={day} isWeekend={index === 0 || index === 6}>
            {day}
          </Weekday>
        ))}
      </Weekdays>

      <Days>
        {days.map((date, index) => {
          if (date === null) {
            return <Day key={index} style={{ visibility: 'hidden' }} />;
          }

          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === today.toDateString();
          const todoCount = getTodoCount(date);

          return (
            <Day
              key={index}
              onClick={() => onDateChange(date)}
              className={`${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
              isWeekend={isWeekend}
            >
              {date.getDate()}
              {todoCount > 0 && (
                <TodoCount isSelected={isSelected}>
                  {todoCount}
                </TodoCount>
              )}
            </Day>
          );
        })}
      </Days>
    </CustomCalendar>
  );
}

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

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      console.log('Fetched todos:', JSON.stringify(response.data, null, 2));
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error.response?.data || error.message);
      alert('할 일 목록을 불러오는데 실패했습니다.');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatMonthYear = (date) => {
    return format(date, 'yyyy년 MM월', { locale: ko });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      // 한국 시간대로 날짜 설정
      const koreanDate = new Date(selectedDate);
      koreanDate.setHours(9, 0, 0, 0); // 한국 시간 00:00:00
      const formattedDueDate = koreanDate.toISOString();
      console.log('Sending dueDate:', formattedDueDate);

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
      console.log('Response from server:', response.data);

      if (response.data) {
        setTodos(prevTodos => prevTodos.map(todo =>
          todo.id === tempTodo.id ? response.data : todo
        ));
      }
    } catch (error) {
      console.error('Error creating todo:', error.response?.data || error.message);
      alert('할 일을 추가하는데 실패했습니다.');
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== Date.now()));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingTodo) return;

    try {
      const formattedDueDate = editingTodo.dueDate || null;
      console.log('Sending edited dueDate:', formattedDueDate);

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
      console.log('Response from server:', response.data);

      // 서버 응답으로 최종 업데이트
      if (response.data) {
        setTodos(prevTodos => prevTodos.map(todo =>
          todo.id === editingTodo.id ? response.data : todo
        ));
      }

      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error.response?.data || error.message);
      alert('할 일을 수정하는데 실패했습니다.');
      // 에러 발생 시 원래 상태로 복구
      setTodos(prevTodos => prevTodos.map(todo =>
        todo.id === editingTodo.id ? editingTodo : todo
      ));
    }
  };

  const getTodosByDate = (date) => {
    const koreanDate = new Date(date);
    koreanDate.setHours(9, 0, 0, 0); // 한국 시간 00:00:00

    const filteredTodos = todos.filter(todo => {
      if (!todo.dueDate) return false;
      const todoDate = new Date(todo.dueDate);
      todoDate.setHours(9, 0, 0, 0); // 한국 시간 00:00:00
      return todoDate.getTime() === koreanDate.getTime();
    });

    return filteredTodos.sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });
  };

  const getTodoCountByDate = (date) => {
    const koreanDate = new Date(date);
    koreanDate.setHours(9, 0, 0, 0); // 한국 시간 00:00:00

    return todos.filter(todo => {
      if (!todo.dueDate || todo.completed) return false;
      const todoDate = new Date(todo.dueDate);
      todoDate.setHours(9, 0, 0, 0); // 한국 시간 00:00:00
      return todoDate.getTime() === koreanDate.getTime();
    }).length;
  };

  const toggleTodo = async (id, completed) => {
    try {
      const todo = todos.find(t => t.id === id);
      
      setTodos(prevTodos => {
        const updatedTodos = prevTodos.map(t =>
          t.id === id ? { ...t, completed: !completed } : t
        );
        return updatedTodos;
      });

      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
        ...todo,
        completed: !completed
      });

      if (response.data) {
        setTodos(prevTodos => {
          const updatedTodos = prevTodos.map(t =>
            t.id === id ? response.data : t
          );
          return updatedTodos;
        });
      }
    } catch (error) {
      console.error('Error updating todo:', error.response?.data || error.message);
      alert('할 일 상태를 변경하는데 실패했습니다.');
      setTodos(prevTodos => {
        const updatedTodos = prevTodos.map(t =>
          t.id === id ? { ...t, completed: completed } : t
        );
        return updatedTodos;
      });
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.response?.data || error.message);
      alert('할 일을 삭제하는데 실패했습니다.');
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
  };

  const groupTodosByDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const groups = {
      today: [],
      upcoming: [],
      past: [],
      noDate: []
    };

    todos.forEach(todo => {
      if (!todo.dueDate) {
        groups.noDate.push(todo);
        return;
      }

      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      if (dueDate.getTime() === today.getTime()) {
        groups.today.push(todo);
      } else if (dueDate > today) {
        groups.upcoming.push(todo);
      } else {
        groups.past.push(todo);
      }
    });

    // 각 그룹 내에서 우선순위에 따라 정렬
    const sortByPriority = (a, b) => {
      const priorityOrder = { HIGH: 0, MID: 1, LOW: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    };

    groups.today.sort(sortByPriority);
    groups.upcoming.sort(sortByPriority);
    groups.past.sort(sortByPriority);
    groups.noDate.sort(sortByPriority);

    return groups;
  };

  const renderTodoGroup = (title, todos) => {
    if (todos.length === 0) return null;

    return (
      <TodoGroup>
        <GroupTitle>{title}</GroupTitle>
        <TodoList>
          {todos.map(todo => {
            console.log('Rendering todo:', JSON.stringify(todo, null, 2));
            const dueDate = todo.dueDate;
            console.log('Due date for todo:', todo.id, dueDate);
            
            return (
              <TodoItem key={todo.id}>
                <Checkbox
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                />
                <TodoText completed={todo.completed}>
                  <PriorityDot priority={todo.priority} />
                  {todo.title}
                  {dueDate && (
                    <TodoDate>
                      {dueDate.split('T')[0]}
                    </TodoDate>
                  )}
                </TodoText>
                <EditButton onClick={() => handleEdit(todo)}>수정</EditButton>
                <DeleteButton onClick={() => deleteTodo(todo.id)}>삭제</DeleteButton>
              </TodoItem>
            );
          })}
        </TodoList>
      </TodoGroup>
    );
  };

  const groups = groupTodosByDate();

  const formatDate = (date) => {
    return format(date, 'yyyy년 MM월 dd일', { locale: ko });
  };

  const selectedDateTodos = getTodosByDate(selectedDate);

  const tileContent = ({ date }) => {
    const count = getTodoCountByDate(date);
    const isSelected = date.toDateString() === selectedDate.toDateString();
    return count > 0 ? <TodoCount isSelected={isSelected}>{count}</TodoCount> : null;
  };

  return (
    <Container>
      <Header>
        <Title>
          <span role="img" aria-label="calendar">📅</span>
          Todo Calendar
        </Title>
      </Header>
      
      <CalendarContainer>
        <CustomCalendarComponent
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          todos={todos}
        />
        
        <AddTodoButton onClick={() => setEditingTodo({})}>
          할 일 +
        </AddTodoButton>
      </CalendarContainer>

      <SelectedDateTodos>
        <SelectedDateTitle>{formatDate(selectedDate)}</SelectedDateTitle>
        <TodoList>
          {selectedDateTodos.map(todo => (
            <TodoItem key={todo.id}>
              <Checkbox
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
              />
              <TodoText completed={todo.completed}>
                <PriorityDot priority={todo.priority} />
                {todo.title}
              </TodoText>
              <IconButton onClick={() => handleEdit(todo)}>
                ✏️
              </IconButton>
              <IconButton onClick={() => deleteTodo(todo.id)}>
                🗑️
              </IconButton>
            </TodoItem>
          ))}
        </TodoList>
      </SelectedDateTodos>

      {editingTodo && (
        <Modal>
          <ModalContent>
            <ModalTitle>할 일 {editingTodo.id ? '수정' : '추가'}</ModalTitle>
            <ModalForm onSubmit={editingTodo.id ? handleEditSubmit : handleSubmit}>
              <ModalInput
                type="text"
                value={editingTodo.id ? editTitle : newTodo}
                onChange={(e) => editingTodo.id ? setEditTitle(e.target.value) : setNewTodo(e.target.value)}
                placeholder="할 일을 입력하세요..."
              />
              <ModalSelect
                value={editingTodo.id ? editPriority : priority}
                onChange={(e) => editingTodo.id ? setEditPriority(e.target.value) : setPriority(e.target.value)}
              >
                <option value="HIGH">높음</option>
                <option value="MID">중간</option>
                <option value="LOW">낮음</option>
              </ModalSelect>
              <ButtonGroup>
                <EditButton type="submit">저장</EditButton>
                <CancelButton type="button" onClick={() => setEditingTodo(null)}>
                  취소
                </CancelButton>
              </ButtonGroup>
            </ModalForm>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default App;
