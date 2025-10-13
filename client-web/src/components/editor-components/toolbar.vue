<script setup lang="ts">
defineOptions({ name: 'EditorToolbar' })

import { computed } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Youtube,
  Link as LinkIcon,
} from 'lucide-vue-next'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const props = defineProps<{ editor?: Editor | null | { value?: Editor | null } }>()

const ed = computed<Editor | null>(() => {
  const e = props.editor as unknown
  if (e && typeof e === 'object' && 'value' in (e as Record<string, unknown>)) {
    return ((e as Record<string, unknown>)['value'] ?? null) as Editor | null
  }
  return (props.editor ?? null) as Editor | null
})

function promptAndSetLink(editor: Editor | null) {
  if (!editor) return
  const url = window.prompt('Enter URL (leave empty to remove link):')
  if (url === null) return
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function addImage(editor: Editor | null) {
  if (!editor) return
  const url = window.prompt('Enter image URL:')
  if (url) {
    editor.chain().focus().setImage({ src: url }).run()
  }
}

function addYoutubeVideo(editor: Editor | null) {
  if (!editor) return
  const url = window.prompt('Enter YouTube URL:')
  if (url) {
    editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }
}

function toggleHeading(editor: Editor | null, level: 1 | 2 | 3) {
  editor?.chain().focus().toggleHeading({ level }).run()
}
</script>

<template>
  <div v-if="ed" class="flex flex-wrap items-center gap-2 border-b p-3 bg-popover text-popover-foreground border-border">
    <div class="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="sm" variant="ghost">Heading</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="toggleHeading(ed, 1)">H1</DropdownMenuItem>
          <DropdownMenuItem @click="toggleHeading(ed, 2)">H2</DropdownMenuItem>
          <DropdownMenuItem @click="toggleHeading(ed, 3)">H3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" class="h-6 mx-2" />

      <Toggle size="sm" :pressed="ed.isActive('bold')" @click="ed.chain().focus().toggleBold().run()" title="Bold">
        <Bold class="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" :pressed="ed.isActive('italic')" @click="ed.chain().focus().toggleItalic().run()" title="Italic">
        <Italic class="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" :pressed="ed.isActive('underline')" @click="ed.chain().focus().toggleUnderline().run()" title="Underline">
        <Underline class="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" class="h-6 mx-2" />

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="sm" variant="ghost">Align</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="ed.chain().focus().setTextAlign('left').run()">Left</DropdownMenuItem>
          <DropdownMenuItem @click="ed.chain().focus().setTextAlign('center').run()">Center</DropdownMenuItem>
          <DropdownMenuItem @click="ed.chain().focus().setTextAlign('right').run()">Right</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" class="h-6 mx-2" />

      <Toggle size="sm" :pressed="ed.isActive('bulletList')" @click="ed.chain().focus().toggleBulletList().run()" title="Bullet List">
        <List class="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" :pressed="ed.isActive('orderedList')" @click="ed.chain().focus().toggleOrderedList().run()" title="Ordered List">
        <ListOrdered class="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" class="h-6 mx-2" />

      <Button size="sm" variant="ghost" @click="addImage(ed)" title="Add Image">
        <ImageIcon class="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" @click="addYoutubeVideo(ed)" title="Add YouTube Video">
        <Youtube class="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" @click="promptAndSetLink(ed)" title="Add Link">
        <LinkIcon class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
