
<template>
    <main>
        <h1>Home page</h1>
        <Button
        @click="editor?.chain().focus().toggleBold().run()"
        >
        Click
        </Button>
        <editor-content v-if="editor" :editor="editor" />
    </main>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';

const editor = useEditor({
    content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
    extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Heading.configure({
            levels: [1, 2, 3],
        }),
    ],
    autofocus: true,
    editable : true
});
</script>
