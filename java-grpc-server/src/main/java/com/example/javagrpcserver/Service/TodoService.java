package com.example.javagrpcserver.service;

import com.example.javagrpcserver.entity.TodoEntity;
import com.example.javagrpcserver.repository.TodoRepository;
import com.example.proto.todo.*;
import io.grpc.stub.StreamObserver;
import lombok.AllArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@GrpcService
@AllArgsConstructor
public class TodoService extends TodoServiceGrpc.TodoServiceImplBase {
    private TodoRepository todoRepository;

    @Override
    public void createTodo(CreateTodoRequest request, StreamObserver<TodoId> responseObserver) {
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
    public void readTodos(Empty request, StreamObserver<GetTodosResponse> streamObserver) {
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

    @Override
    public void deleteTodo(TodoId request, StreamObserver<TodoId> streamObserver) {
        System.out.println("delete request");
        todoRepository.delete(TodoEntity.builder().id(request.getId()).build());
        streamObserver.onNext(TodoId.newBuilder(request).build());
        streamObserver.onCompleted();
    }

    @Override
    public void updateTodo(Todo request, StreamObserver<TodoId> streamObserver) {
        System.out.println("request" + request.getChecked());
        TodoEntity target = TodoEntity.builder()
                .id(request.getId())
                .title(request.getTitle())
                .checked(request.getChecked())
                .build();
        todoRepository.saveAndFlush(target);
        streamObserver.onNext(TodoId.newBuilder().setId(request.getId()).build());
        streamObserver.onCompleted();
    }

}
