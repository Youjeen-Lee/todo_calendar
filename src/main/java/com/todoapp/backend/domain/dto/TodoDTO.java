package com.todoapp.backend.domain.dto;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 할 일(Todo) 데이터를 주고받을 때 사용하는 DTO 클래스
 */
@Data
public class TodoDTO {
    private Long id;
    private String title;
    private String description;
    private String priority;
    private Boolean completed;
    private LocalDateTime dueDate;
    private String memo;
}
