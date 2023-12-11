<script setup lang="ts">
</script>

<template>
    <slot name="header"></slot>
    <main class="main-container">
        <slot name="content"></slot>
    </main>
</template>

<style scoped>
.main-container {
    width: 100%;
    margin-top: 76px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
