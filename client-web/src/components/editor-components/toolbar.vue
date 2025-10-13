<script setup lang="ts">
defineOptions({ name: 'EditorToolbar' })

import type { Editor } from '@tiptap/vue-3'
import {
  Bold,
  Italic,
  Underline,
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

// props
type Props_Type = {
  editor: Editor;
}
const {editor} = defineProps<Props_Type>();


function promptAndSetLink(editor: Editor) {
  const url = window.prompt('Enter URL (leave empty to remove link):')
  if (url === null) return
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function addImage(editor: Editor) {
  const url = window.prompt('Enter image URL:');
  if (url && url.trim()) {
    editor.chain().focus().setImage({ src: url }).run();
  }
}

function addYoutubeVideo(editor: Editor) {
  const url = window.prompt('Enter YouTube URL:')
  if (url) {
    editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }
}

function toggleHeading(editor: Editor, level: 1 | 2 | 3) {
  editor.chain().focus().toggleHeading({ level }).run();
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 border-b p-3 bg-popover text-popover-foreground border-border">
    <div class="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="sm" variant="ghost">Heading</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="() => toggleHeading(editor, 1)">H1</DropdownMenuItem>
          <DropdownMenuItem @click="toggleHeading(editor, 2)">H2</DropdownMenuItem>
          <DropdownMenuItem @click="toggleHeading(editor, 3)">H3</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" class="h-6 mx-2" />

      <Toggle size="sm" :pressed="editor.isActive('bold')" @click="editor.chain().focus().toggleBold().run()" title="Bold">
        <Bold class="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" :pressed="editor.isActive('italic')" @click="editor.chain().focus().toggleItalic().run()" title="Italic">
        <Italic class="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" :pressed="editor.isActive('underline')" @click="editor.chain().focus().toggleUnderline().run()" title="Underline">
        <Underline class="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" class="h-6 mx-2" />

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="sm" variant="ghost">Align</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="editor.chain().focus().setTextAlign('left').run()">Left</DropdownMenuItem>
          <DropdownMenuItem @click="editor.chain().focus().setTextAlign('center').run()">Center</DropdownMenuItem>
          <DropdownMenuItem @click="editor.chain().focus().setTextAlign('right').run()">Right</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" class="h-6 mx-2" />

      <Toggle size="sm" :pressed="editor.isActive('bulletList')" @click="editor.chain().focus().toggleBulletList().run()" title="Bullet List">
        <List class="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" :pressed="editor.isActive('orderedList')" @click="editor.chain().focus().toggleOrderedList().run()" title="Ordered List">
        <ListOrdered class="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" class="h-6 mx-2" />

      <Button size="sm" variant="ghost" @click="addImage(editor)" title="Add Image">
        <ImageIcon class="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" @click="addYoutubeVideo(editor)" title="Add YouTube Video">
        <Youtube class="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" @click="promptAndSetLink(editor)" title="Add Link">
        <LinkIcon class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
