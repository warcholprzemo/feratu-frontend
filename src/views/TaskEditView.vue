<script setup>
import TaskEdit from '../components/TaskEdit.vue'
</script>

<template>
  <main>
    <Suspense>
      <TaskEdit />
    </Suspense>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>