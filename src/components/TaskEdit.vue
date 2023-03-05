<template>
  <h1>Task Edit {{ task_id }}</h1>
  <div>
    <table>
      <tr>
        <td>Title</td>
        <td><input type="text" v-model="task.title" /></td>
      </tr>
      <tr>
        <td>Description</td>
        <td><input type="text" v-model="task.description" /></td>
      </tr>
      <tr>
        <td>Done</td>
        <td><input type="checkbox" v-model="task.done" /></td>
      </tr>
      <tr>
        <td>Created</td>
        <td>{{ task.created.split("T").join(" ") }}</td>
      </tr>
      <tr>
        <td>Finished</td>
        <td>{{ task.finished ? task.finished.split("T").join(" ").split(".")[0] : null }}</td>
      </tr>
    </table>
    <div id="update-section">
      <button id="update-button" @click="update_task">Update</button>
      <span id="update-info" :class="update_info_class">{{ update_info_text }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import axios from "axios";
import { ref } from 'vue';

const route = useRoute();
let update_info_text = ref();
let update_info_class = "";

const task_id = route.params.id;
let task = await axios
  .get('http://localhost:8001/tasks/' + task_id )
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
    return {};
  });

async function update_task() {
  await axios
    .put('http://localhost:8001/tasks/' + task_id,{
      'title': task.title,
      'description': task.description,
      'done': task.done,
      'finished': task.finished
    })
    .then(response => {
      update_info_text.value = response.data.info + " (" + new Date().toJSON().replace('T', ' ').split('.')[0] + ")";
      update_info_class = "correct_data";
      task.finished = response.data.finished;
    })
    .catch(error => {
      update_info_text.value = error.message;
      update_info_class = "error_data";
    });
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
#update-section{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
#update-info{
  display: block;
}
.correct_data{
  color: #009900;
}
.error_data{
  color: #FF0000;
}
</style>