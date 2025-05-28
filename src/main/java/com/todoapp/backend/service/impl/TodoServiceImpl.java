package com.todoapp.backend.service.impl;

import com.todoapp.backend.domain.dto.TodoDTO;
import com.todoapp.backend.domain.entity.TodoEntity;
import com.todoapp.backend.exception.TodoNotFoundException;
import com.todoapp.backend.mapper.TodoMapper;
import com.todoapp.backend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 할 일(Todo) 비즈니스 로직을 실제로 구현하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoMapper todoMapper;

    @Override
    public void createTodo(TodoDTO todoDTO) {
        TodoEntity entity = dtoToEntity(todoDTO);
        todoMapper.insertTodo(entity);
    }

    @Override
    public List<TodoDTO> getAllTodos() {
        List<TodoEntity> entities = todoMapper.selectAllTodos();
        return entities.stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public TodoDTO getTodoById(Long id) {
        TodoEntity entity = todoMapper.selectTodoById(id);
        if (entity == null) {
            throw new TodoNotFoundException("해당 ID의 할 일이 존재하지 않습니다.");
        }
        return entityToDto(entity);
    }

    @Override
    public void updateTodo(TodoDTO todoDTO) {
        TodoEntity entity = dtoToEntity(todoDTO);
        todoMapper.updateTodo(entity);
    }

    @Override
    public void deleteTodo(Long id) {
        TodoEntity entity = todoMapper.selectTodoById(id);
        if (entity == null) {
            throw new TodoNotFoundException("삭제 실패: 해당 할 일을 찾을 수 없습니다.");
        }
        todoMapper.deleteTodo(id);
    }

    // Entity -> DTO 변환 메서드
    private TodoDTO entityToDto(TodoEntity entity) {
        TodoDTO dto = new TodoDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setPriority(entity.getPriority());
        dto.setCompleted(entity.getCompleted());
        dto.setDueDate(entity.getDueDate());
        dto.setMemo(entity.getMemo());
        return dto;
    }

    // DTO -> Entity 변환 메서드
    private TodoEntity dtoToEntity(TodoDTO dto) {
        TodoEntity entity = new TodoEntity();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setPriority(dto.getPriority());
        entity.setCompleted(dto.getCompleted());
        entity.setDueDate(dto.getDueDate());
        entity.setMemo(dto.getMemo());
        return entity;
    }
}
