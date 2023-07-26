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

    <div class="uber-comments">
      <div v-if="task.comments" class="comments">
        <h3>Comments</h3>
        <ul v-for="(comment, index) in task.comments">
          <li>
            <span class="comment-author">{{ comment.author }}</span><br />
            {{ comment.message }}
          </li>
        </ul>
      </div>
      <div v-else class="comments">
        <h3>No comments yet</h3>
      </div>
      <div class="add-comment">
        <h3>You can add new comment</h3>
        <div class="add-comment-grid">
          <div>Author</div><div><input type="text" v-model="new_comment.author" /></div>
          <div>Message</div><div><input type="text" v-model="new_comment.message" /></div>
        </div>
      </div>
    </div>

    <div id="update-section">
      <button id="update-button" @click="update_task">Update</button>
      <span id="update-info" :class="update_info_class">{{ update_info_text }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from "axios";
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
let update_info_text = ref();
let update_info_class = "";

const task_id = route.params.id;
let task = await axios
  .get(router.options.base + '/tasks/' + task_id )
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
    return {};
  });

let new_comment = {
  author: "",
  message: "",
};

async function update_task() {
  if (new_comment.author && !new_comment.message) {
    alert("Put Message if you want to add new comment");
    return;
  }
  if (!new_comment.author && new_comment.message) {
    alert("Put Author if you want to add new comment");
    return;
  }
  let request_data = {
    title: task.title,
    description: task.description,
    done: task.done,
    finished: task.finished,
  };
  let refresh_comments = false;
  if (new_comment.author && new_comment.message) {
    request_data["new_comment"] = new_comment;
    refresh_comments = true;
  }
  await axios
    .put(router.options.base + '/tasks/' + task_id, request_data)
    .then(response => {
      update_info_text.value = response.data.info + " (" + new Date().toJSON().replace('T', ' ').split('.')[0] + ")";
      update_info_class = "correct_data";
      task.finished = response.data.finished;
      if (refresh_comments) {
        if (!task["comments"]) {
          task["comments"] = [];
        }
        task["comments"].push(Object.assign({}, new_comment));
        new_comment = {
          author: "",
          message: "",
        };
      }
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
th {
  font-weight: bold;
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
.comments, .add-comment{
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  display: block;
  padding:10px;
  width: 400px;
}
.add-comment-grid{
  display: grid;
  grid-template-columns: auto auto;
}
.uber-comments{
  width: 100%;
}
.comment-author{
  font-weight: bold;
}
</style>