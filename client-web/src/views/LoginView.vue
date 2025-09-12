<template>
  <div class="login min-h-screen flex flex-col items-center justify-center bg-main-gradient">
    <div class="card shadow-lg rounded-xl p-8 bg-white/80 backdrop-blur-md">
      <h1 class="title text-3xl font-bold text-primary mb-6 text-center">Welcome Back!</h1>
      <form @submit.prevent="handleLogin" class="form flex flex-col gap-4">
        <div>
          <label for="username" class="label block text-sm font-medium text-secondary mb-1">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="input w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="Enter your username"
            autocomplete="username"
          />
        </div>
        <div>
          <label for="password" class="label block text-sm font-medium text-secondary mb-1">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="input w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
        </div>
        <button
          type="submit"
          class="button w-full py-2 mt-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  // In a real app, you would perform authentication here
  console.log('Logging in with:', username.value, password.value)
  // Redirect to home page after login
  router.push('/')
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
}
</style>
