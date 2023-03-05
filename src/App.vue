<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="main-screen">
    <header>
      <div class="wrapper">
        <h1 id="feratu-brand">Feratu</h1>
        <nav>
          <RouterLink to="/">List of tasks</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/calendar">Calendar</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
#main-screen{
  display:flex;
  flex-direction:row;
}
header {
  max-width: 150px;
}
#feratu-brand{
  background-color: #eee;
}
nav {
  background-color: #eee;
  padding:10px;
  height: 1000px;
}
nav a {
  display: block;
  text-align: center;
  font-size:20px;
}
nav a:hover {
  background-color: #aaa;
}
main{
  background-color: #ddd;
  flex-grow: 1;
}
</style>
