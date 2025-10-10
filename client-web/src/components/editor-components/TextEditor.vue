<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { onBeforeUnmount, watch, computed } from 'vue'
import Toolbar from './toolbar.vue'

// Props / v-model support
const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>()

// Create editor with a minimal, non-duplicating set of extensions.
// StarterKit already provides headings, lists, paragraphs, history, etc.
const editor = useEditor({
        extensions: [
            StarterKit,
        Underline,
        Link.configure({ openOnClick: false }),
    ],
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
        },
    },
    content: props.modelValue ?? '',
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
})

onBeforeUnmount(() => editor?.value?.destroy())

// If parent updates the v-model from outside, update the editor content.
watch(
        () => props.modelValue,
        (val) => {
            if (!editor?.value) return
            const current = editor.value.getHTML()
                if (val != null && val !== current) {
                    // replace the document without triggering another update event
                    editor.value.commands.setContent(val, { emitUpdate: false })
                }
        }
)

const isEditorEmpty = computed(() => {
    if (!editor) return true
    const e = ((editor as unknown) as { value?: unknown }).value ?? editor
    if (!e) return true
        try {
            // isEmpty is a tiptap Editor helper method; guard at runtime
            return Boolean((e as { isEmpty?: () => boolean }).isEmpty?.())
        } catch {
            return false
        }
})
</script>

<template>
    <div class="max-w-3xl mx-auto">
        <div class="border rounded-lg bg-white shadow-sm overflow-hidden">
            <!-- toolbar sits on top -->
            <div class="bg-white">
                <Toolbar :editor="editor" />
            </div>

            <!-- editor area -->
            <div class="min-h-[240px] p-6">
            <EditorContent :editor="editor" class="min-h-[200px] prose max-w-full focus:outline-none" />
            <!-- simple placeholder overlay when editor empty -->
            <div v-if="isEditorEmpty" class="pointer-events-none text-gray-400 absolute ml-6 mt-6">Start typing your story...</div>
            </div>
        </div>
    </div>
</template>


