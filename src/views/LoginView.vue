<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const googleCallback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response);
  localStorage.setItem("loggedInUser", JSON.stringify(response));
  router.push({name: 'task-list'});
}
</script>

<template>
  <GoogleLogin :callback="googleCallback"/>
</template>
