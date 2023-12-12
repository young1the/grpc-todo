package com.example.javagrpcserver.repository;

import com.example.javagrpcserver.entity.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<TodoEntity, Long> {
}
