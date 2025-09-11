<script setup lang="ts">
import Button from './components/ui/button/Button.vue';
</script>

<template>
  <div>
    <h1>Hello</h1>
    <Button>
      click
    </Button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
