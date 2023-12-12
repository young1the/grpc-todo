<script setup lang="ts">
import { useTodosStore } from '@/stores/todo';
import { ref } from 'vue';
const todosStore = useTodosStore();
const inputValue = ref('');
const saveTodo = async () => {
    const response = await fetch("http://localhost:3001/api/todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: inputValue.value,
        })
    })
    if (response.ok) {
        todosStore.refetchTodos();
    }
}
</script>

<template>
    <div class="wrapper">
        <md-filled-text-field label="할 일을 입력하세요" type="text" v-model="inputValue">
        </md-filled-text-field>
        <md-filled-button @click="saveTodo">추가</md-filled-button>
    </div>
</template>

<style scoped>
.wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    gap: 8px;
}
</style>
