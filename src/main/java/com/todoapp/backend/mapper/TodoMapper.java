package com.todoapp.backend.mapper;

import com.todoapp.backend.domain.entity.TodoEntity;
import org.apache.ibatis.annotations.Mapper;
import java.util.List;

/**
 * 할 일(Todo) 관련 DB 작업을 처리하는 MyBatis 매퍼 인터페이스
 */
@Mapper
public interface TodoMapper {

    // 할 일 등록
    void insertTodo(TodoEntity todoEntity);

    // 할 일 전체 조회
    List<TodoEntity> selectAllTodos();

    // 특정 할 일 조회
    TodoEntity selectTodoById(Long id);

    // 할 일 수정
    void updateTodo(TodoEntity todoEntity);

    // 할 일 삭제
    void deleteTodo(Long id);
}
