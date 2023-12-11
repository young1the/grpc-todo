package com.example.javagrpcserver.service;

import com.example.javagrpcserver.entity.TodoEntity;
import com.example.javagrpcserver.repository.TodoRepository;
import com.example.proto.todo.*;
import lombok.AllArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import io.grpc.stub.StreamObserver;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@GrpcService
@AllArgsConstructor
public class TodoService extends TodoServiceGrpc.TodoServiceImplBase {
    private TodoRepository todoRepository;

    @Override
    public void saveTodo(SaveTodoRequest request, StreamObserver<TodoId> responseObserver) {
        System.out.println(request.getTitle());
        TodoEntity todo = TodoEntity.builder()
                .title(request.getTitle())
                .checked(false)
                .build();
        Long _id = todoRepository.save(todo).getId();
        TodoId todoId = TodoId.newBuilder().setId(_id).build();
        responseObserver.onNext(todoId);
        responseObserver.onCompleted();
    }

    @Override
    public void getTodos(Empty request, StreamObserver<GetTodosResponse> streamObserver) {
        List<TodoEntity> todoEntities = todoRepository.findAll();
        List<Todo> todos = todoEntities.stream().map(ele -> {
            return Todo.newBuilder()
                    .setId(ele.getId())
                    .setTitle(ele.getTitle())
                    .setChecked(ele.isChecked())
                    .build();
        }).toList();
        GetTodosResponse getTodosResponse = GetTodosResponse.newBuilder().addAllTodos(todos).build();
        streamObserver.onNext(getTodosResponse);
        streamObserver.onCompleted();
    }

}
