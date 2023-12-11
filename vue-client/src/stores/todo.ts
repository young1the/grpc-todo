import { defineStore } from "pinia";
import { getCurrentInstance, onMounted, shallowRef } from "vue";

export const useTodosStore = defineStore('todos', () => {
    const todos = shallowRef([]);
    const refetchTodos = async () => {
        const response = await fetch("http://localhost:3001/api/todo");
        if (response.ok) {
            const data = await response.json();
            todos.value = [...data.Todos];
        }
    }
    if (getCurrentInstance()) {
        onMounted(refetchTodos)
    }
    return { todos, refetchTodos }
})