"use client"

import { useState } from "react"
import { Clock, Edit, FileText, Grid, List, MoreHorizontal, Plus, Search, Star, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for notes
const initialNotes = [
  {
    id: 1,
    title: "Q4 Marketing Strategy",
    content:
      "Key points for the upcoming quarter:\n- Focus on retention campaigns\n- Increase social media presence\n- Launch email nurture sequence",
    tags: ["marketing", "strategy"],
    starred: true,
    lastEdited: "10 minutes ago",
  },
  {
    id: 2,
    title: "Website Redesign Ideas",
    content:
      "- Simplify navigation\n- Add more customer testimonials\n- Improve mobile experience\n- Update product screenshots",
    tags: ["website", "design"],
    starred: false,
    lastEdited: "2 hours ago",
  },
  {
    id: 3,
    title: "Meeting Notes: Client Feedback",
    content:
      "Acme Corp feedback:\n1. Love the new dashboard\n2. Need more customization options\n3. Would like better reporting features\n4. Timeline concerns for phase 2",
    tags: ["meeting", "client"],
    starred: true,
    lastEdited: "Yesterday",
  },
  {
    id: 4,
    title: "Product Roadmap 2023",
    content: "Q1: Feature X, Y\nQ2: Performance improvements\nQ3: Mobile app redesign\nQ4: Enterprise features",
    tags: ["product", "planning"],
    starred: false,
    lastEdited: "3 days ago",
  },
  {
    id: 5,
    title: "Team OKRs",
    content:
      "Objective 1: Improve user retention\nKR1: Increase 30-day retention by 15%\nKR2: Reduce churn by 10%\n\nObjective 2: Launch new platform",
    tags: ["team", "goals"],
    starred: false,
    lastEdited: "1 week ago",
  },
  {
    id: 6,
    title: "Content Calendar",
    content:
      "Blog posts:\n- 10 Tips for Productivity\n- How to Use Our New Features\n- Customer Success Story: XYZ Corp",
    tags: ["content", "marketing"],
    starred: false,
    lastEdited: "2 weeks ago",
  },
]

export default function NotesPanel() {
  const [notes, setNotes] = useState(initialNotes)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [filter, setFilter] = useState("all") // all, starred

  // Toggle star status
  const toggleStarred = (noteId) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, starred: !note.starred } : note)))
  }

  // Delete note
  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    if (filter === "all") return true
    if (filter === "starred") return note.starred
    return true
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium">Notes</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className={
                filter === "all"
                  ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                  : ""
              }
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={
                filter === "starred"
                  ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                  : ""
              }
              onClick={() => setFilter("starred")}
            >
              Starred
            </Button>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${viewMode === "grid" ? "bg-slate-100 dark:bg-slate-800" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none ${viewMode === "list" ? "bg-slate-100 dark:bg-slate-800" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700" size="sm">
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
        <Input type="search" placeholder="Search notes..." className="pl-10" />
      </div>

      {/* Notes Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
        {filteredNotes.map((note) => (
          <Card key={note.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-base">{note.title}</CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-amber-500"
                  onClick={() => toggleStarred(note.id)}
                >
                  <Star className={`h-4 w-4 ${note.starred ? "fill-amber-500 text-amber-500" : ""}`} />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleStarred(note.id)}>
                      <Star className="h-4 w-4 mr-2" />
                      {note.starred ? "Remove Star" : "Star Note"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => deleteNote(note.id)}>
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line mb-4 line-clamp-4">
                {note.content}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {note.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}

                <div className="ml-auto flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {note.lastEdited}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotes.length === 0 && (
          <div className="col-span-full text-center py-8">
            <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
              <FileText className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No notes found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              {filter === "all" ? "You don't have any notes yet." : "You don't have any starred notes."}
            </p>
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
              <Plus className="h-4 w-4" />
              New Note
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

