<template>
  <h1>Task Create</h1>
  <div>
    <table>
      <tr>
        <td>Title</td>
        <td>
          <input type="text" v-model="task.title" />
          <span class="form-errors">{{ title_errors }}</span>
        </td>
      </tr>
      <tr>
        <td>Description</td>
        <td><input type="text" v-model="task.description" /></td>
      </tr>
    </table>
    <div id="update-section">
      <button id="update-button" @click="create_task">Create</button>
      <span id="update-info" :class="create_info_class">{{ create_info_text }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from "axios";
import { ref } from "vue";

const router = useRouter();
let title_errors = ref();
let create_info_text = ref();
let create_info_class = "";
let task = {
  title: "",
  description: "",
  done: false,
};

async function create_task() {
  if (task.title === "") {
    title_errors.value = "This field is required";
    return;
  } else {
    title_errors.value = "";
  }
  await axios
    .post("http://localhost:8001/tasks/", task)
    .then(response => {
      router.push({name: 'task-list'})
    })
    .catch(error => {
      create_info_text.value = error.message;
      create_info_class = "error_data";
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
  border: 1px solid #000;
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
.form-errors {
  color: #FF0000;
}
.error_data{
  color: #FF0000;
}
</style>