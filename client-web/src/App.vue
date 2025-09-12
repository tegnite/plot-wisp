<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ModeToggle from '@/components/ui/Theme-Provider/mode-toggle.vue'
</script>

<template>
  <header>
      <nav class="main-nav">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/browse" class="nav-link">Browse</RouterLink>
        <RouterLink to="/community" class="nav-link">Community</RouterLink>
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
        <RouterLink to="/logout" class="nav-link">Logout</RouterLink>
        <ModeToggle />
      </nav>
  </header>

  <RouterView />
</template>
