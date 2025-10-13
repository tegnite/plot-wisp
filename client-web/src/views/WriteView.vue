<script setup lang="ts">
import TextEditor from '@/components/editor-components/TextEditor.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'

const title = ref<string>('')
const content = ref<string>('')
const isPreview = ref<boolean>(false)

function save() {
  // todo: implement save logic
  console.log('Saving:', { title: title.value, content: content.value })
}

function publish() {
  // todo: implement publish logic
  console.log('Publishing:', { title: title.value, content: content.value })
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-foreground">Write your story</h1>
      <div class="flex items-center gap-2">
        <Button @click="save" variant="outline">Save</Button>
        <Button @click="isPreview = !isPreview" variant="outline">
          {{ isPreview ? 'Edit' : 'Preview' }}
        </Button>
        <Button @click="publish">Publish</Button>
      </div>
    </div>

    <div v-if="!isPreview" class="space-y-6">
      <Input
        v-model="title"
        placeholder="Title"
        class="text-5xl font-bold h-auto p-2 border-none focus-visible:ring-0 !ring-offset-0"
      />
      <TextEditor v-model="content" />
    </div>
    <div v-else class="prose max-w-none">
      <h1>{{ title }}</h1>
      <div v-html="content"></div>
    </div>
  </div>
</template>
