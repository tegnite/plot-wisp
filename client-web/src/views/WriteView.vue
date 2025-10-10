<script setup lang="ts">
import TextEditor from '@/components/editor-components/TextEditor.vue'
import { ref } from 'vue'
const content = ref<string>('')

</script>

<template>
  <div class="max-w-3xl mx-auto py-10">
    <TextEditor v-model="content" />
    <div class="mt-10">
      <h2 class="text-2xl font-bold mb-4">Content Preview:</h2>
      <div class="prose max-w-none border p-5 rounded-md bg-white" v-html="content"></div>
    </div>
  </div>
</template>
