<script setup lang="ts">
import { useTodosStore } from '@/stores/todo';
const todosStore = useTodosStore();

const deleteTodo = async (id: number) => {
    const response = await fetch(`http://localhost:3001/api/todo/${id}`,
        { method: "DELETE" }
    );
    if (response.ok) {
        const body = await response.json();
        todosStore.refetchTodos();
    }
}

const checkTodo = async (todo: any, event: any) => {
    todo.checked = event.target.checked;
    const response = await fetch(`http://localhost:3001/api/todo/${todo.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(todo),
        }
    )
    if (response.ok) {
        const body = await response.json();
        todosStore.refetchTodos();
    }
}

</script>

<template>
    <div class="wrapper">
        <md-tabs style="width: 100%; max-width: 720px;">
            <md-primary-tab @click="todosStore.changeFilter('ALL')">전체</md-primary-tab>
            <md-primary-tab @click="todosStore.changeFilter('TODO')">진행중</md-primary-tab>
            <md-primary-tab @click="todosStore.changeFilter('DONE')">완료</md-primary-tab>
        </md-tabs>
        <md-list style="width: 100%; max-width: 720px;">
            <md-list-item interactive v-for="todo in todosStore.filteredTodos">
                <div slot="start"><md-checkbox :checked="todo.checked" @change="checkTodo(todo, $event)" touch-target="wrapper"></md-checkbox></div>
                {{ todo.title }}
                <div slot="end">
                    <md-outlined-button @click="deleteTodo(todo.id)">삭제</md-outlined-button>
                </div>
            </md-list-item>
        </md-list>
    </div>
</template>

<style scoped>
.wrapper {
    width: 80%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--md-sys-color-outline);
    border-radius: 16px;
    overflow: hidden;
}
</style>
