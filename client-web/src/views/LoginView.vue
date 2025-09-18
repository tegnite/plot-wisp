<template>
  <div class="login min-h-screen flex flex-col items-center justify-center bg-main-gradient">
    <div class="card shadow-lg rounded-xl p-8 bg-white/80 backdrop-blur-md  w-full max-w-md">
      <h1 class="title text-3xl font-bold text-primary mb-6 text-center">Welcome Back!</h1>
      <form @submit.prevent="handleLogin" class="form flex flex-col gap-4">
        <div>
          <label for="username" class="label block text-sm font-medium text-secondary mb-1">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="custom-input"
            placeholder="Enter your username"
            autocomplete="username"
          />
        </div>
        <div>
          <label for="password" class="label block text-sm font-medium text-secondary mb-1">Password</label>
          <input
            required
            type="password"
            id="password"
            v-model="password"
            class="custom-input"
            placeholder="Enter your password"
            autocomplete="current-password"
          />
        </div>
        <div class="flex justify-end">
          <router-link to="/register" class="text-primary text-sm hover:underline">Don't have an account? Register</router-link>
        </div>
        <button
          type="submit"
          class="custom-button"
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
