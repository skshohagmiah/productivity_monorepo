"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  Hash,
  Home,
  Image,
  LayoutGrid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Star,
  Table,
  Trash,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import NoteEditor from "@/components/notes/note-editor"
import NoteCard from "@/components/notes/note-card"
import NoteList from "@/components/notes/note-list"
import NoteTable from "@/components/notes/note-table"
import NoteProperties from "@/components/notes/note-properties"

// Mock data for workspaces
const workspaces = [
  { id: 1, name: "Personal", icon: "🏠", color: "violet" },
  { id: 2, name: "Work", icon: "💼", color: "blue" },
  { id: 3, name: "Projects", icon: "🚀", color: "indigo" },
  { id: 4, name: "Research", icon: "🔍", color: "amber" },
  { id: 5, name: "Learning", icon: "📚", color: "green" },
]

// Mock data for notes
const initialNotes = [
  {
    id: 1,
    title: "Getting Started Guide",
    content: "Welcome to your new workspace! Here are some tips to get started...",
    workspace: { id: 1, name: "Personal", icon: "🏠", color: "violet" },
    tags: ["guide", "welcome"],
    createdAt: "2023-10-10T10:00:00Z",
    updatedAt: "2023-10-10T10:30:00Z",
    favorite: true,
    emoji: "👋",
    coverImage: "/placeholder.svg?height=200&width=600",
    properties: {
      status: "Published",
      priority: "High",
      dueDate: "2023-10-20",
    },
  },
  {
    id: 2,
    title: "Project Ideas",
    content: "List of potential projects to work on this quarter...",
    workspace: { id: 3, name: "Projects", icon: "🚀", color: "indigo" },
    tags: ["ideas", "planning"],
    createdAt: "2023-10-09T14:00:00Z",
    updatedAt: "2023-10-11T09:15:00Z",
    favorite: true,
    emoji: "💡",
    properties: {
      status: "In Progress",
      priority: "Medium",
    },
  },
  {
    id: 3,
    title: "Weekly Meeting Notes",
    content: "Notes from our weekly team meeting...",
    workspace: { id: 2, name: "Work", icon: "💼", color: "blue" },
    tags: ["meeting", "team"],
    createdAt: "2023-10-11T15:30:00Z",
    updatedAt: "2023-10-11T16:45:00Z",
    favorite: false,
    emoji: "📝",
    properties: {
      status: "Completed",
      priority: "High",
      dueDate: "2023-10-12",
    },
  },
  {
    id: 4,
    title: "Research on AI Trends",
    content: "Latest trends in artificial intelligence and machine learning...",
    workspace: { id: 4, name: "Research", icon: "🔍", color: "amber" },
    tags: ["ai", "research", "technology"],
    createdAt: "2023-10-08T11:20:00Z",
    updatedAt: "2023-10-10T13:45:00Z",
    favorite: false,
    emoji: "🤖",
    properties: {
      status: "In Progress",
      priority: "Medium",
    },
  },
  {
    id: 5,
    title: "Book Recommendations",
    content: "List of books I want to read this year...",
    workspace: { id: 5, name: "Learning", icon: "📚", color: "green" },
    tags: ["books", "reading"],
    createdAt: "2023-10-07T09:00:00Z",
    updatedAt: "2023-10-09T10:30:00Z",
    favorite: true,
    emoji: "📚",
    properties: {
      status: "Ongoing",
      priority: "Low",
    },
  },
  {
    id: 6,
    title: "Travel Plans",
    content: "Ideas for upcoming vacation destinations...",
    workspace: { id: 1, name: "Personal", icon: "🏠", color: "violet" },
    tags: ["travel", "vacation", "planning"],
    createdAt: "2023-10-06T16:15:00Z",
    updatedAt: "2023-10-08T11:20:00Z",
    favorite: false,
    emoji: "✈️",
    properties: {
      status: "Planning",
      priority: "Medium",
      dueDate: "2023-12-15",
    },
  },
  {
    id: 7,
    title: "Product Roadmap",
    content: "Strategic roadmap for our product development...",
    workspace: { id: 2, name: "Work", icon: "💼", color: "blue" },
    tags: ["product", "strategy", "roadmap"],
    createdAt: "2023-10-05T13:45:00Z",
    updatedAt: "2023-10-11T14:30:00Z",
    favorite: true,
    emoji: "🗺️",
    coverImage: "/placeholder.svg?height=200&width=600",
    properties: {
      status: "In Review",
      priority: "High",
      dueDate: "2023-10-30",
    },
  },
  {
    id: 8,
    title: "Coding Snippets",
    content: "Useful code snippets for future reference...",
    workspace: { id: 3, name: "Projects", icon: "🚀", color: "indigo" },
    tags: ["code", "development", "reference"],
    createdAt: "2023-10-04T10:30:00Z",
    updatedAt: "2023-10-09T15:45:00Z",
    favorite: false,
    emoji: "💻",
    properties: {
      status: "Ongoing",
      priority: "Medium",
    },
  },
  {
    id: 9,
    title: "Fitness Goals",
    content: "My fitness goals and workout plan for the next 3 months...",
    workspace: { id: 1, name: "Personal", icon: "🏠", color: "violet" },
    tags: ["fitness", "health", "goals"],
    createdAt: "2023-10-03T08:15:00Z",
    updatedAt: "2023-10-07T09:30:00Z",
    favorite: false,
    emoji: "💪",
    properties: {
      status: "In Progress",
      priority: "Medium",
      dueDate: "2023-12-31",
    },
  },
  {
    id: 10,
    title: "Marketing Campaign Ideas",
    content: "Brainstorming for our upcoming marketing campaign...",
    workspace: { id: 2, name: "Work", icon: "💼", color: "blue" },
    tags: ["marketing", "campaign", "ideas"],
    createdAt: "2023-10-02T14:20:00Z",
    updatedAt: "2023-10-10T11:15:00Z",
    favorite: false,
    emoji: "📣",
    properties: {
      status: "Planning",
      priority: "High",
      dueDate: "2023-11-15",
    },
  },
]

// Mock data for tags
const tags = [
  { id: 1, name: "guide", color: "blue" },
  { id: 2, name: "welcome", color: "green" },
  { id: 3, name: "ideas", color: "amber" },
  { id: 4, name: "planning", color: "violet" },
  { id: 5, name: "meeting", color: "red" },
  { id: 6, name: "team", color: "indigo" },
  { id: 7, name: "ai", color: "cyan" },
  { id: 8, name: "research", color: "orange" },
  { id: 9, name: "technology", color: "slate" },
  { id: 10, name: "books", color: "amber" },
  { id: 11, name: "reading", color: "green" },
  { id: 12, name: "travel", color: "blue" },
  { id: 13, name: "vacation", color: "violet" },
  { id: 14, name: "product", color: "indigo" },
  { id: 15, name: "strategy", color: "red" },
  { id: 16, name: "roadmap", color: "amber" },
  { id: 17, name: "code", color: "slate" },
  { id: 18, name: "development", color: "blue" },
  { id: 19, name: "reference", color: "green" },
  { id: 20, name: "fitness", color: "red" },
  { id: 21, name: "health", color: "green" },
  { id: 22, name: "goals", color: "violet" },
  { id: 23, name: "marketing", color: "indigo" },
  { id: 24, name: "campaign", color: "amber" },
]

export default function NotesPage() {
  const [notes, setNotes] = useState(initialNotes)
  const [view, setView] = useState("grid") // grid, list, table
  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [filter, setFilter] = useState("all") // all, favorites, recent
  const [searchQuery, setSearchQuery] = useState("")
  const [newNoteOpen, setNewNoteOpen] = useState(false)
  const [propertiesOpen, setPropertiesOpen] = useState(false)

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (
        !note.title.toLowerCase().includes(query) &&
        !note.content.toLowerCase().includes(query) &&
        !note.tags.some((tag) => tag.toLowerCase().includes(query))
      ) {
        return false
      }
    }

    // Workspace filter
    if (selectedWorkspace && note.workspace.id !== selectedWorkspace.id) {
      return false
    }

    // Tag filter
    if (selectedTag && !note.tags.includes(selectedTag)) {
      return false
    }

    // Favorites filter
    if (filter === "favorites" && !note.favorite) {
      return false
    }

    // Recent filter
    if (filter === "recent") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      const updatedAt = new Date(note.updatedAt)
      if (updatedAt < oneWeekAgo) {
        return false
      }
    }

    return true
  })

  // Sort notes by updated date (most recent first)
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt)
  })

  // Handle note selection
  const handleNoteSelect = (note) => {
    setSelectedNote(note)
  }

  // Toggle note favorite status
  const toggleFavorite = (noteId) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, favorite: !note.favorite } : note)))
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      })
    }
  }

  // Create a new note
  const createNewNote = (data) => {
    const newNote = {
      id: notes.length + 1,
      title: data.title || "Untitled",
      content: data.content || "",
      workspace: workspaces.find((w) => w.id === Number.parseInt(data.workspace)) || workspaces[0],
      tags: data.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorite: false,
      emoji: data.emoji || "📝",
      properties: {
        status: "Draft",
        priority: "Medium",
      },
    }

    setNotes([newNote, ...notes])
    setSelectedNote(newNote)
    setNewNoteOpen(false)
  }

  // Update note properties
  const updateNoteProperties = (noteId, properties) => {
    setNotes(
      notes.map((note) => (note.id === noteId ? { ...note, properties: { ...note.properties, ...properties } } : note)),
    )
    setPropertiesOpen(false)
  }

  // Effect to handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + / to search
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault()
        document.getElementById("search-notes").focus()
      }

      // Ctrl/Cmd + N to create new note
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault()
        setNewNoteOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto hidden md:block">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Notes</h3>

              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "all" ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                  onClick={() => {
                    setFilter("all")
                    setSelectedWorkspace(null)
                    setSelectedTag(null)
                  }}
                >
                  <Home className="h-4 w-4 mr-2" />
                  All Notes
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "favorites" ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                  onClick={() => {
                    setFilter("favorites")
                    setSelectedWorkspace(null)
                    setSelectedTag(null)
                  }}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Favorites
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "recent" ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                  onClick={() => {
                    setFilter("recent")
                    setSelectedWorkspace(null)
                    setSelectedTag(null)
                  }}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Recent
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <Collapsible defaultOpen>
              <div className="flex items-center justify-between mb-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    <h3 className="text-sm font-medium">Workspaces</h3>
                  </Button>
                </CollapsibleTrigger>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <CollapsibleContent>
                <div className="space-y-1 ml-2">
                  {workspaces.map((workspace) => (
                    <Button
                      key={workspace.id}
                      variant="ghost"
                      className={`w-full justify-start ${selectedWorkspace?.id === workspace.id ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                      onClick={() => {
                        setSelectedWorkspace(workspace)
                        setSelectedTag(null)
                        setFilter(null)
                      }}
                    >
                      <span className="mr-2">{workspace.icon}</span>
                      {workspace.name}
                      <Badge className="ml-auto">
                        {notes.filter((note) => note.workspace.id === workspace.id).length}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator className="my-4" />

            <Collapsible defaultOpen>
              <div className="flex items-center justify-between mb-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    <h3 className="text-sm font-medium">Tags</h3>
                  </Button>
                </CollapsibleTrigger>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <CollapsibleContent>
                <div className="space-y-1 ml-2">
                  {tags.slice(0, 10).map((tag) => (
                    <Button
                      key={tag.id}
                      variant="ghost"
                      className={`w-full justify-start ${selectedTag === tag.name ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                      onClick={() => {
                        setSelectedTag(tag.name)
                        setSelectedWorkspace(null)
                        setFilter(null)
                      }}
                    >
                      <Hash className={`h-4 w-4 mr-2 text-${tag.color}-500`} />
                      {tag.name}
                      <Badge className="ml-auto">{notes.filter((note) => note.tags.includes(tag.name)).length}</Badge>
                    </Button>
                  ))}

                  {tags.length > 10 && (
                    <Button variant="ghost" className="w-full justify-start text-slate-500 dark:text-slate-400">
                      <span className="ml-6">+ {tags.length - 10} more tags</span>
                    </Button>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>

            <h1 className="text-xl font-bold">Notes</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                id="search-notes"
                type="search"
                placeholder="Search notes... (Ctrl+/)"
                className="pl-8 bg-slate-100 dark:bg-slate-800 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
              {showSidebar ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        {/* Note Controls */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">
                {selectedWorkspace
                  ? selectedWorkspace.name
                  : selectedTag
                    ? `#${selectedTag}`
                    : filter === "favorites"
                      ? "Favorites"
                      : filter === "recent"
                        ? "Recent Notes"
                        : "All Notes"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {sortedNotes.length} {sortedNotes.length === 1 ? "note" : "notes"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={setView} className="w-auto">
                <TabsList>
                  <TabsTrigger value="grid">
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4 mr-2" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="table">
                    <Table className="h-4 w-4 mr-2" />
                    Table
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Dialog open={newNoteOpen} onOpenChange={setNewNoteOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                    <Plus className="h-4 w-4" />
                    New Note
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Create New Note</DialogTitle>
                    <DialogDescription>Add details for your new note.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Note title" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emoji">Icon</Label>
                      <div className="flex gap-2">
                        <Button variant="outline" className="text-lg">
                          📝
                        </Button>
                        <Input id="emoji" placeholder="Search for an emoji..." className="flex-1" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workspace">Workspace</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="workspace">
                          <SelectValue placeholder="Select workspace" />
                        </SelectTrigger>
                        <SelectContent>
                          {workspaces.map((workspace) => (
                            <SelectItem key={workspace.id} value={workspace.id.toString()}>
                              <div className="flex items-center gap-2">
                                <span>{workspace.icon}</span>
                                {workspace.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 8).map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="outline"
                            className={`cursor-pointer text-${tag.color}-600 dark:text-${tag.color}-400 border-${tag.color}-200 dark:border-${tag.color}-800`}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="cursor-pointer">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Tag
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewNoteOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-violet-600 hover:bg-violet-700"
                      onClick={() => createNewNote({ title: "New Note", workspace: "1" })}
                    >
                      Create Note
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Notes Content */}
        <div className="flex-1 overflow-auto">
          {selectedNote ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedNote(null)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedNote.emoji}</span>
                    <h2 className="text-xl font-medium">{selectedNote.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => toggleFavorite(selectedNote.id)}>
                          <Star className={`h-5 w-5 ${selectedNote.favorite ? "fill-amber-400 text-amber-400" : ""}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {selectedNote.favorite ? "Remove from favorites" : "Add to favorites"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Dialog open={propertiesOpen} onOpenChange={setPropertiesOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Properties
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Note Properties</DialogTitle>
                      </DialogHeader>
                      <NoteProperties
                        note={selectedNote}
                        onUpdate={(properties) => updateNoteProperties(selectedNote.id, properties)}
                      />
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Image className="h-4 w-4 mr-2" />
                        Add Cover
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {selectedNote.coverImage && (
                <div className="relative h-40 w-full">
                  <img
                    src={selectedNote.coverImage || "/placeholder.svg"}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex-1 overflow-auto p-4">
                <NoteEditor note={selectedNote} />
              </div>

              <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <div>Last edited {formatDate(selectedNote.updatedAt)}</div>
                <div className="flex items-center gap-2">
                  {selectedNote.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Tabs>
              <TabsContent value="grid" className="h-full m-0">
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sortedNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onSelect={() => handleNoteSelect(note)}
                      onToggleFavorite={() => toggleFavorite(note.id)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list" className="h-full m-0">
                <NoteList
                  notes={sortedNotes}
                  onSelect={handleNoteSelect}
                  onToggleFavorite={toggleFavorite}
                  formatDate={formatDate}
                />
              </TabsContent>

              <TabsContent value="table" className="h-full m-0">
                <NoteTable
                  notes={sortedNotes}
                  onSelect={handleNoteSelect}
                  onToggleFavorite={toggleFavorite}
                  formatDate={formatDate}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

