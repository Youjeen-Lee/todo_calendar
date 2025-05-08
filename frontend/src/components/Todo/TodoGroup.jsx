import React from 'react';
import styled from '@emotion/styled';
import TodoItem from './TodoItem';

// 그룹 전체 컨테이너
const TodoGroupWrapper = styled.div`
  margin-bottom: 2rem;
`;

// 그룹 제목 스타일
const GroupTitle = styled.h2`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

// 리스트 컨테이너
const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

function TodoGroup({ title, todos, onToggle, onEdit, onDelete }) {
    if (todos.length === 0) return null;

    return (
        <TodoGroupWrapper>
            <GroupTitle>{title}</GroupTitle>
            <TodoList>
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </TodoList>
        </TodoGroupWrapper>
    );
}

export default TodoGroup;