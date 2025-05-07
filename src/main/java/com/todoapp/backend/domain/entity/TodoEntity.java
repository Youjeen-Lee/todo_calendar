package com.todoapp.backend.domain.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 할 일(Todo) 엔티티 클래스
 * DB의 todo 테이블과 매핑됨
 */
@Data
public class TodoEntity {
    private Long id;                  // 고유 ID (Primary Key)
    private String title;             // 할 일 제목
    private String description;       // 할 일 설명
    private String priority;          // 우선순위 (HIGH, MID, LOW)
    private Boolean completed;        // 완료 여부
    private LocalDateTime dueDate;     // 마감일
    private String memo;              // 메모
    private LocalDateTime createdAt;   // 생성일
    private LocalDateTime updatedAt;   // 수정일
}
