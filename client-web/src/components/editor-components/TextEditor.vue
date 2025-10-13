<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { onBeforeUnmount, watch } from 'vue'
import Toolbar from './toolbar.vue'

const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>()

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Underline,
    Image,
    Youtube,
    Link.configure({ openOnClick: false }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose max-w-none focus:outline-none',
    },
  },
  content: props.modelValue ?? '',
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

onBeforeUnmount(() => editor?.value?.destroy())

watch(
  () => props.modelValue,
  (val) => {
    if (!editor?.value) return
    const current = editor.value.getHTML()
    if (val != null && val !== current) {
      editor.value.commands.setContent(val, { emitUpdate: false })
    }
  }
)
</script>

<template>
  <div class="border rounded-lg">
    <Toolbar :editor="editor" />
    <div class="p-4 min-h-[300px]">
      <EditorContent :editor="editor"/>
    </div>
  </div>
</template>
