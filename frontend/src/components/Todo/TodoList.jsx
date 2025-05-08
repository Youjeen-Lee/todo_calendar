import React from 'react';
import styled from '@emotion/styled';
import { IconButton } from '../UI/Buttons';

// Todo 그룹 전체 영역
const TodoGroup = styled.div`
    margin-bottom: 2rem;
`;

// 그룹 제목 (예: 오늘, 예정 등)
const GroupTitle = styled.h2`
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
`;

// 할 일 목록 ul 태그 스타일
const TodoListWrapper = styled.ul`
    list-style: none;
    padding: 0;
`;

// 개별 할 일 아이템 스타일
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

// 할 일 제목 텍스트 영역
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

// 체크박스 스타일
const Checkbox = styled.input`
    margin-right: 1rem;
    width: 20px;
    height: 20px;
`;

// 우선순위 점 표시 스타일
const PriorityDot = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: ${props => {
        switch (props.priority) {
            case 'HIGH':
                return '#ff3b30'; // 빨강
            case 'MID':
                return '#ff9500'; // 주황
            case 'LOW':
                return '#34c759'; // 초록
            default:
                return '#8e8e93'; // 회색
        }
    }};
`;

/**
 * TodoList 컴포넌트 - 날짜별 또는 그룹별 할 일 목록을 렌더링
 * @param title - 그룹 이름 (예: 오늘, 예정 등)
 * @param todos - 해당 그룹에 포함된 할 일 배열
 * @param toggleTodo - 체크박스 상태 변경 함수
 * @param handleEdit - 수정 버튼 클릭 시 호출되는 함수
 * @param deleteTodo - 삭제 버튼 클릭 시 호출되는 함수
 */
function TodoList({ title, todos, toggleTodo, handleEdit, deleteTodo }) {
    // 할 일이 없으면 아무것도 렌더링하지 않음
    if (todos.length === 0) return null;

    return (
        <TodoGroup>
            <GroupTitle>{title}</GroupTitle>
            <TodoListWrapper>
                {todos.map(todo => (
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
                        <IconButton onClick={() => handleEdit(todo)}>✏️</IconButton>
                        <IconButton onClick={() => deleteTodo(todo.id)}>🗑️</IconButton>
                    </TodoItem>
                ))}
            </TodoListWrapper>
        </TodoGroup>
    );
}

export default TodoList;

