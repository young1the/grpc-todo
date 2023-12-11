<script setup lang="ts">
import Layout from "./components/layout/Layout.vue"
import Header from "./components/layout/Header.vue";
</script>

<template>
  <Layout>
    <template #header>
      <Header></Header>
    </template>
    <template #content>
      <RouterView></RouterView>
    </template>
  </Layout>
</template>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--md-sys-color-background);
  }
</style>
