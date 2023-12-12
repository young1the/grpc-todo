import { defineStore } from "pinia";
import { computed, getCurrentInstance, onMounted, ref, shallowRef } from "vue";

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
    const filter = ref("ALL");
    const changeFilter = (value: string) => {
        filter.value = value;
    }
    const filteredTodos = computed(() => {
        if (todos.value.length == 0 || filter.value === "ALL") return todos.value;
        const condition = { "ALL": -1, "TODO": false, "DONE": true };
        if (condition[filter.value] < 0) return todos.value;
        return todos.value.filter(ele => {
            return ele.checked === condition[filter.value]
        });
    })
    return { todos, refetchTodos, filteredTodos, filter, changeFilter }
})