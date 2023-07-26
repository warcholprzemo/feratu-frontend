<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const removeUserSession = () => {
  localStorage.removeItem("loggedInUser");
  router.push({name: 'login-page'});
}

removeUserSession();
</script>

<template>
</template>
