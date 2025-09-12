<template>
  <div class="logout">
    <h1>You have been logged out.</h1>
    <p>Redirecting to the home page...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // In a real app, you would clear authentication tokens here
  console.log('User logged out.')
  setTimeout(() => {
    router.push('/')
  }, 2000)
})
</script>

<style scoped>
.logout {
  text-align: center;
  padding: 2rem;
}
</style>
