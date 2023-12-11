<script setup lang="ts">
import TodoMain from '@/components/todo/TodoMain.vue';
import TodoInput from '@/components/todo/TodoInput.vue';
</script>

<template>
  <div class="container">
    <TodoInput />
    <TodoMain />
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
</style>
