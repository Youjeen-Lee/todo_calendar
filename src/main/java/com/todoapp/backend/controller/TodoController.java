package com.todoapp.backend.controller;

import com.todoapp.backend.domain.dto.TodoDTO;
import lombok.RequiredArgsConstructor;
import com.todoapp.backend.service.TodoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * 할 일(Todo) 관련 요청을 처리하는 컨트롤러
 */
@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3002")
public class TodoController {

    private final TodoService todoService;

//    public TodoController(TodoService todoService) {
//        this.todoService = todoService;
//    }


    // 할 일 등록
    @PostMapping
    public void createTodo(@RequestBody TodoDTO todoDTO) {
        todoService.createTodo(todoDTO);
    }

    // 모든 할 일 조회
    @GetMapping
    public List<TodoDTO> getAllTodos() {
        return todoService.getAllTodos();
    }

    // 특정 할 일 조회
    @GetMapping("/{id}")
    public TodoDTO getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id);
    }

    // 할 일 수정
    @PutMapping("/{id}")
    public void updateTodo(@PathVariable Long id, @RequestBody TodoDTO todoDTO) {
        todoDTO.setId(id); // URL의 id를 DTO에도 세팅
        todoService.updateTodo(todoDTO);
    }

    // 할 일 삭제
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
