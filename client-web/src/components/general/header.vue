<template>
    <header class="bg-main-gradient shadow-md">
    <nav class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

    <!-- Logo -->
    <div class="text-2xl font-bold">
        <RouterLink to="/home">Plot Wisp</RouterLink>
    </div>

  <!-- Nav Links -->
  <div class="hidden md:flex space-x-6">
      <RouterLink
        to="/home"
        class="hover:text-yellow-700 transition"
      >
          Home
      </RouterLink>
      <RouterLink
        to="/about"
        class=" hover:text-yellow-700 transition"
      >
          About
      </RouterLink>
    <RouterLink
    to="/browse"
    class=" hover:text-yellow-700 transition"
    >Browse</RouterLink>
    <RouterLink
    to="/community"
    class=" hover:text-yellow-700 transition"
    >Community</RouterLink>
  </div>

  <div class="flex items-center space-x-4">
    <ModeToggle />
    <RouterLink
    to="/login"
    class="flex items-center space-x-1 hover:text-yellow-700 transition"
    >
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 12H3m12 0l-4-4m4 4l-4 4m9-8v8a2 2 0 01-2 2h-4" />
    </svg>
    <span>Login</span>
    </RouterLink>
  </div>
  </nav>
  </header>
</template>

<script setup lang="ts">
import ModeToggle from '@/components/theme-provider/mode-toggle.vue';
</script>
