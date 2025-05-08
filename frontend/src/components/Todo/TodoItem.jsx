import React from 'react';
import styled from '@emotion/styled';
import { EditButton, DeleteButton } from '../UI/Buttons';

// 할 일 항목 전체 영역
const TodoItemWrapper = styled.li`
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

// 체크박스
const Checkbox = styled.input`
  margin-right: 1rem;
  width: 20px;
  height: 20px;
`;

// 우선순위 점
const PriorityDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => {
    switch (props.priority) {
        case 'HIGH': return '#ff3b30';
        case 'MID': return '#ff9500';
        case 'LOW': return '#34c759';
        default: return '#8e8e93';
    }
}};
`;

// 할 일 텍스트 영역
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

// 날짜 텍스트
const TodoDate = styled.span`
  font-size: 0.9rem;
  color: #666;
  background-color: #f5f5f7;
  padding: 4px 8px;
  border-radius: 6px;
  margin-left: 10px;
`;


function TodoItem({ todo, onToggle, onEdit, onDelete }) {
    const { id, title, priority, completed, dueDate } = todo;

    return (
        <TodoItemWrapper>
            <Checkbox
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id, completed)}
            />
            <TodoText completed={completed}>
                <PriorityDot priority={priority} />
                {title}
                {dueDate && (
                    <TodoDate>{dueDate.split('T')[0]}</TodoDate>
                )}
            </TodoText>
            <EditButton onClick={() => onEdit(todo)}>수정</EditButton>
            <DeleteButton onClick={() => onDelete(id)}>삭제</DeleteButton>
        </TodoItemWrapper>
    );
}

export default TodoItem;
