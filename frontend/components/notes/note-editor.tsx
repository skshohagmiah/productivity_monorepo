"use client"

import { useState } from "react"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Quote,
  Image,
  Link,
  Heading1,
  Heading2,
  Heading3,
  CheckSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function NoteEditor({ note }) {
  const [content, setContent] = useState(note.content)

  // Handle content change
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  // Insert formatting at cursor position
  const insertFormatting = (prefix, suffix = "") => {
    const textarea = document.getElementById("note-content")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const beforeText = content.substring(0, start)
    const afterText = content.substring(end)

    const newContent = beforeText + prefix + selectedText + suffix + afterText
    setContent(newContent)

    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, end + prefix.length)
    }, 0)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 p-1 border rounded-md bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-x-auto">
        <Button variant="ghost" size="sm" onClick={() => insertFormatting("# ")}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertFormatting("## ")}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertFormatting("### ")}>
          <Heading3 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="sm" onClick={() => insertFormatting("**", "**")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertFormatting("*", "*")}>
          <Italic className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="sm" onClick={() => insertFormatting("- ")}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertFormatting("1. ")}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertFormatting("- [ ] ")}>
          <CheckSquare className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="sm" onClick={() => insertFormatting("`", "`")}>
          <Code className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertFormatting("> ")}>
          <Quote className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="sm" onClick={() => insertFormatting("[", "](url)")}>
          <Link className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertFormatting("![alt text](", ")")}>
          <Image className="h-4 w-4" />
        </Button>
      </div>

      <Textarea
        id="note-content"
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing..."
        className="min-h-[300px] font-mono text-sm resize-none"
      />

      <div className="p-4 border rounded-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-medium mb-2">Preview</h3>
        <div className="prose dark:prose-invert max-w-none">
          {/* This would be a markdown renderer in a real app */}
          <div className="whitespace-pre-wrap text-sm">{content}</div>
        </div>
      </div>
    </div>
  )
}

