package com.todoapp.backend.service;

import com.todoapp.backend.domain.dto.TodoDTO;

import java.util.List;

/**
 * 할 일(Todo) 비즈니스 로직을 정의하는 서비스 인터페이스
 */
public interface TodoService {

    // 할 일 등록
    void createTodo(TodoDTO todoDTO);

    // 모든 할 일 조회
    List<TodoDTO> getAllTodos();

    // 특정 할 일 조회
    TodoDTO getTodoById(Long id);

    // 할 일 수정
    void updateTodo(TodoDTO todoDTO);

    // 할 일 삭제
    void deleteTodo(Long id);
}
