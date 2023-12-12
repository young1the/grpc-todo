# grpc-todo

## architecture

![architecture](https://github.com/young1the/grpc-todo/assets/86599495/f0f2625a-08f8-4533-8be8-1bc742cfda36)

## Spring Boot

- [grpc-spring](https://github.com/grpc-ecosystem/grpc-spring)
  
gRPC를 쉽게 적용하기 위해 grpc-spring 라이브러리를 사용했습니다.

#### 참고

- [Spring boot로 Grpc를 사용해보자](https://velog.io/@chb1828/Spring-boot%EB%A1%9C-Grpc%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90)
- [grpc-spring getting started](https://grpc-ecosystem.github.io/grpc-spring/en/server/getting-started.html)

## Express.js

- [ts-proto](https://github.com/stephenh/ts-proto)

프로토콜 버퍼 컴파일러 (protoc)가 TypeScript를 공식적으로 지원하지 않아서 ts-proto 라이브러리를 사용했습니다.

## Vue.js

- [material-web](https://github.com/material-components/material-web)

Web Component를 사용하는 구글의 오픈소스 디자인 시스템인 Material 3를 적용했습니다.

## proto

```proto
syntax = "proto3";

package todo;

option java_multiple_files = true;
option java_package = "com.example.proto.todo";
option java_outer_classname = "TodoProtos";

message Empty {

}

message TodoId {
  int64 id = 1;
}

message Todo {
  int64 id = 1;
  string title = 2;
  bool checked = 3;
}

message CreateTodoRequest {
  string title = 1;
}

message ReadTodosResponse {
  repeated Todo Todos = 1;
}

service TodoService {
  rpc createTodo(CreateTodoRequest) returns (TodoId);
  rpc readTodo(TodoId) returns (Todo);
  rpc updateTodo(Todo) returns (TodoId);
  rpc deleteTodo(TodoId) returns (TodoId);
  rpc readTodos(Empty) returns (ReadTodosResponse);
}
```
