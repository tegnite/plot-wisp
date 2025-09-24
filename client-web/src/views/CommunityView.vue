<template>
    <div>
        <h1>Community page</h1>

      <div class="w-full h-56">
          <div ref="editor_container" class="bg-red-500 w-full h-full"></div>
      </div>
    </div>
</template>
<script setup lang="ts">
import Quill from 'quill';
import { onMounted, ref, type Ref } from 'vue';


// refs
const editor_container : Ref<HTMLElement | null> = ref(null);

onMounted(() => {
  if(editor_container.value) {
    const options = {
      modules: {
        toolbar: true,
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    };
    const quill = new Quill(editor_container.value, options);
  }
})
</script>
