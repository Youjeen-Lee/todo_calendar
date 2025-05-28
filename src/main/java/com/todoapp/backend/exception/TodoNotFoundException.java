package com.todoapp.backend.exception;

public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(String message) {
        super(message); // 부모 생성자에 메시지 전달
    }
}

