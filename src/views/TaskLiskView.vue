<script setup>
import TaskList from '../components/TaskList.vue'
</script>

<template>
  <main>
    <Suspense>
      <TaskList />
    </Suspense>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
