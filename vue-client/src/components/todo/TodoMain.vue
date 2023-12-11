<script setup lang="ts">
import { useTodosStore } from '@/stores/todo';
const todosStore = useTodosStore();
</script>

<template>
    <div class="wrapper">
        <md-tabs style="width: 100%; max-width: 720px;">
            <md-primary-tab>전체</md-primary-tab>
            <md-primary-tab>진행중</md-primary-tab>
            <md-primary-tab>완료</md-primary-tab>
        </md-tabs>
        <md-list style="width: 100%;">
            <md-list-item interactive v-for="todo in todosStore.todos">
                <div slot="start"><md-checkbox touch-target="wrapper"></md-checkbox></div>
                {{ todo.title }}
            </md-list-item>
        </md-list>
    </div>
</template>

<style scoped>
.wrapper {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--md-sys-color-outline);
    border-radius: 16px;
    overflow: hidden;
}
</style>
