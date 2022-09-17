<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="Screen">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/main">Main</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
nav {
  display: none;
}
</style>
