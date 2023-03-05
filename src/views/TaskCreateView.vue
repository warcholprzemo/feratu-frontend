<script setup>
import TaskCreate from '../components/TaskCreate.vue';
</script>

<template>
  <main>
    <Suspense>
      <TaskCreate />
    </Suspense>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
