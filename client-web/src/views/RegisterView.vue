<template>
  <div class="register min-h-screen flex flex-col items-center justify-center bg-main-gradient">
    <div class="card shadow-lg rounded-xl p-8 bg-white/80 backdrop-blur-md w-full max-w-md">
      <h1 class="title text-3xl font-bold text-primary mb-6 text-center">Create an Account</h1>
      <form @submit.prevent="handleRegister" class="form flex flex-col gap-4">
        <div>
          <label for="username" class="label block text-sm font-medium text-secondary mb-1">Username</label>
          <input
            required
            type="text"
            id="username"
            v-model="username"
            class="custom-input"
            placeholder="Enter your username"
            autocomplete="username"
          />
        </div>
        <div>
          <label for="age" class="label block text-sm font-medium text-secondary mb-1">Age</label>
          <input
            type="number"
            id="age"
            v-model="age"
            class="custom-input"
            placeholder="Enter your age"
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
            autocomplete="new-password"
          />
        </div>
        <div>
          <label for="re-password" class="label block text-sm font-medium text-secondary mb-1">Re-enter Password</label>
          <input
            required
            type="password"
            id="re-password"
            v-model="rePassword"
            class="custom-input"
            placeholder="Re-enter your password"
            autocomplete="new-password"
          />
        </div>
        <button
          type="submit"
          class="custom-button"
        >
          Register
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
const rePassword = ref('')
const age = ref<number | null>(null)
const router = useRouter()

const handleRegister = () => {
  if (password.value !== rePassword.value) {
    alert("Passwords do not match!")
    return
  }
  // you would perform registration here
  console.log('Registering with:', username.value, password.value, age.value)
  // Redirect to home page after registration
  router.push('/home')
}
</script>
