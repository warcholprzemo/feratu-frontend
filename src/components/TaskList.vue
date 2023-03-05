<template>
  <h1>List of tasks</h1>
  <div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Done</th>
          <th>Created</th>
          <th>Finished</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.done }}</td>
          <td>{{ task.created.split("T").join(" ") }}</td>
          <td>{{ task.finished ? task.finished.split("T").join(" ").split(".")[0] : null }}</td>
          <td><RouterLink :to="{ name: 'task-edit', params: { id: task.id }}">Edit</RouterLink></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import axios from 'axios'

let tasks = await axios
    .get('http://localhost:8001/tasks/')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return [];
    });
</script>

<style scoped>
h1 {
  text-align: center;
}
table {
  margin: 15px auto 15px auto;
}
table, th, td{
  border: 1px solid;
  border-collapse: collapse;
}
th, td {
  padding: 4px;
}
tr:hover td {
  background-color: #aaaaaa;
}
</style>
