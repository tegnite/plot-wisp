<script setup lang="ts">
defineOptions({ name: 'EditorToolbar' })

import { computed } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Quote,
  RotateCcw,
  RotateCw,
} from 'lucide-vue-next'
import { Button } from '../ui/button'
import { Toggle } from '../ui/toggle'

// accept flexible editor shapes (Editor or Ref<Editor>) to avoid failing before parent initializes
const props = defineProps<{ editor?: Editor | null | { value?: Editor | null } }>()

// normalized editor instance (unwrapping refs if needed)
const ed = computed<Editor | null>(() => {
  const e = props.editor as unknown
  if (e && typeof e === 'object' && 'value' in (e as Record<string, unknown>)) {
    return ((e as Record<string, unknown>)['value'] ?? null) as Editor | null
  }
  return (props.editor ?? null) as Editor | null
})

// small helpers used in template
function promptAndSetLink(editor: Editor | null) {
  if (!editor) return
  const url = window.prompt('Enter URL (leave empty to remove link):')
  if (url === null) return // cancelled
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function toggleHeading(editor: Editor | null, level: 1 | 2 | 3 | 4 | 5 | 6 = 1) {
  editor?.chain().focus().toggleHeading({ level }).run()
}

function toggleCodeBlock(editor: Editor | null) {
  editor?.chain().focus().toggleCodeBlock().run()
}

function clearFormatting(editor: Editor | null) {
  if (!editor) return
  // remove inline marks
  editor.chain().focus().unsetAllMarks().run()

  // handle block-level formats individually
  if (editor.isActive('codeBlock')) {
    editor.chain().focus().toggleCodeBlock().run()
  }

  if (editor.isActive('blockquote')) {
    editor.chain().focus().toggleBlockquote().run()
  }

  if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
    // lift list items out of lists
    try {
      editor.chain().focus().liftListItem('listItem').run()
    } catch {
      // some tiptap versions might not support liftListItem; ignore
    }
  }

  // finally convert current node to paragraph for a clean slate
  editor.chain().focus().setParagraph().run()
}

</script>

<template>
  <div
    v-if="ed"
    class="flex flex-wrap items-center gap-2 border-b p-3"
    :style="{ background: 'var(--color-popover)', color: 'var(--color-popover-foreground)', borderColor: 'var(--color-border)' }"
  >
    <!-- group: basic marks -->
    <div class="flex items-center gap-1">
      <Toggle
        size="sm"
        :pressed="ed.isActive('bold')"
        @click="ed.chain().focus().toggleBold().run()"
        title="Bold"
        :disabled="!ed.can().chain().focus().toggleBold().run()"
        aria-label="Bold"
      >
        <Bold class="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        :pressed="ed.isActive('italic')"
        @click="ed.chain().focus().toggleItalic().run()"
        title="Italic"
        :disabled="!ed.can().chain().focus().toggleItalic().run()"
        aria-label="Italic"
      >
        <Italic class="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        :pressed="ed.isActive('underline')"
        @click="ed.chain().focus().toggleUnderline().run()"
        title="Underline"
        :disabled="!ed.can().chain().focus().toggleUnderline().run()"
        aria-label="Underline"
      >
        <Underline class="h-4 w-4" />
      </Toggle>
    </div>

    <!-- group: lists & headings -->
    <div class="flex items-center gap-1">
      <Button size="sm" variant="ghost" @click="toggleHeading(ed, 1)" :class="{'bg-primary/10': ed.isActive('heading', { level: 1 })}" title="H1">H1</Button>
      <Button size="sm" variant="ghost" @click="toggleHeading(ed, 2)" :class="{'bg-primary/10': ed.isActive('heading', { level: 2 })}" title="H2">H2</Button>
      <Button size="sm" variant="ghost" @click="ed.chain().focus().toggleBulletList().run()" :class="{'bg-primary/10': ed.isActive('bulletList')}"> <List class="h-4 w-4" /> </Button>
      <Button size="sm" variant="ghost" @click="ed.chain().focus().toggleOrderedList().run()" :class="{'bg-primary/10': ed.isActive('orderedList')}"> <ListOrdered class="h-4 w-4" /> </Button>
    </div>

    <!-- group: blocks & misc -->
    <div class="flex items-center gap-1 ml-auto">
      <Button size="sm" variant="ghost" @click="toggleCodeBlock(ed)" :class="{'bg-primary/10': ed.isActive('codeBlock')}"> <Code class="h-4 w-4" /> </Button>
      <Button size="sm" variant="ghost" @click="ed.chain().focus().toggleBlockquote().run()" :class="{'bg-primary/10': ed.isActive('blockquote')}"> <Quote class="h-4 w-4" /> </Button>
      <Button size="sm" variant="ghost" @click="promptAndSetLink(ed)" title="Link"> <LinkIcon class="h-4 w-4" /> </Button>
      <Button size="sm" variant="ghost" @click="ed.chain().focus().undo().run()" title="Undo"> <RotateCcw class="h-4 w-4" /> </Button>
      <Button size="sm" variant="ghost" @click="ed.chain().focus().redo().run()" title="Redo"> <RotateCw class="h-4 w-4" /> </Button>
      <Button size="sm" variant="ghost" @click="clearFormatting(ed)" title="Clear formatting"> Clear </Button>
    </div>
  </div>
</template>
