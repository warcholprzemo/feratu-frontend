<template>
  <div>
    <h1>List of tasks</h1>
    <button id="create-task-button" @click="$router.push({name: 'task-create'})">Create task</button>
  </div>
  <div>
    <table :key="main_table_key">
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
        <tr v-for="(task, index) in tasks">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.done }}</td>
          <td>{{ task.created.split("T").join(" ").split(".")[0] }}</td>
          <td>{{ task.finished ? task.finished.split("T").join(" ").split(".")[0] : null }}</td>
          <td>
            <RouterLink :to="{ name: 'task-edit', params: { id: task.id }}">Edit</RouterLink>
            <span id="delete-task" @click="delete_task(task, index)">Delete</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from "vue";

const router = useRouter();
let main_table_key = ref(1);

let tasks = await axios
    .get(router.options.base + '/tasks/')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return [];
    });

async function delete_task(task, index) {
  if (confirm("Do you want to remove: " + task.title)) {
    await axios
      .delete(router.options.base + '/tasks/' + task.id)
      .then(() => {
        tasks.splice(index, 1);
        main_table_key.value += 1;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
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
#create-task-button{
  position: absolute;
  right: 170px;
  top: 15px;
  padding: 5px 15px;
  background-color: lightgreen;
  border-radius: 10px;
  cursor: pointer;
}
#delete-task {
  color: hsla(160, 100%, 37%, 1);
  padding-left: 10px;
  cursor: pointer;
}
</style>
