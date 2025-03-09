"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Globe,
  Home,
  LayoutGrid,
  List,
  Lock,
  Pencil,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Table,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import NoteCard from "@/components/notes/note-card"
import NoteList from "@/components/notes/note-list"

// Mock data for the workspace
const workspace = {
  id: 1,
  name: "Product Roadmap",
  description: "Strategic planning for our product development",
  icon: "🗺️",
  color: "blue",
  team: {
    id: 1,
    name: "Product Team",
    icon: "🚀",
    color: "violet",
  },
  members: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      isAdmin: true,
    },
    { id: 2, name: "Michael Chen", role: "Designer", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    { id: 3, name: "Emma Rodriguez", role: "Developer", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
    { id: 4, name: "David Kim", role: "Developer", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
  ],
  pages: [
    { id: 1, title: "Overview", icon: "📄", type: "page" },
    { id: 2, title: "Q4 Goals", icon: "🎯", type: "page" },
    { id: 3, title: "Feature Backlog", icon: "📋", type: "database" },
    { id: 4, title: "Design Assets", icon: "🎨", type: "page" },
    { id: 5, title: "Meeting Notes", icon: "📝", type: "page" },
    { id: 6, title: "Resources", icon: "📚", type: "page" },
  ],
  recentActivity: [
    {
      id: 1,
      user: { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      action: "updated",
      target: "Q4 Goals",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
      action: "commented on",
      target: "Feature Backlog",
      time: "Yesterday",
    },
    {
      id: 3,
      user: { id: 3, name: "Emma Rodriguez", avatar: "/placeholder.svg?height=40&width=40" },
      action: "created",
      target: "New Design Assets",
      time: "2 days ago",
    },
  ],
  privacy: "private",
  createdAt: "2023-09-15T10:00:00Z",
  updatedAt: "2023-10-12T14:30:00Z",
}

// Mock data for notes in the workspace
const workspaceNotes = [
  {
    id: 1,
    title: "Q4 Product Roadmap",
    content: "Strategic plan for our product development in Q4...",
    workspace: { id: 1, name: "Product Roadmap", icon: "🗺️", color: "blue" },
    tags: ["roadmap", "planning", "q4"],
    createdAt: "2023-10-10T10:00:00Z",
    updatedAt: "2023-10-12T10:30:00Z",
    favorite: true,
    emoji: "🗺️",
    coverImage: "/placeholder.svg?height=200&width=600",
    properties: {
      status: "In Progress",
      priority: "High",
      dueDate: "2023-12-31",
    },
  },
  {
    id: 2,
    title: "Feature Prioritization Framework",
    content: "How we decide which features to build next...",
    workspace: { id: 1, name: "Product Roadmap", icon: "🗺️", color: "blue" },
    tags: ["framework", "prioritization"],
    createdAt: "2023-10-08T14:00:00Z",
    updatedAt: "2023-10-11T09:15:00Z",
    favorite: true,
    emoji: "📊",
    properties: {
      status: "Published",
      priority: "Medium",
    },
  },
  {
    id: 3,
    title: "Competitor Analysis",
    content: "Detailed analysis of our main competitors...",
    workspace: { id: 1, name: "Product Roadmap", icon: "🗺️", color: "blue" },
    tags: ["research", "competitors"],
    createdAt: "2023-10-05T15:30:00Z",
    updatedAt: "2023-10-10T16:45:00Z",
    favorite: false,
    emoji: "🔍",
    properties: {
      status: "Completed",
      priority: "High",
    },
  },
  {
    id: 4,
    title: "User Feedback Summary",
    content: "Key insights from recent user interviews and surveys...",
    workspace: { id: 1, name: "Product Roadmap", icon: "🗺️", color: "blue" },
    tags: ["feedback", "users", "research"],
    createdAt: "2023-10-03T11:20:00Z",
    updatedAt: "2023-10-09T13:45:00Z",
    favorite: false,
    emoji: "👥",
    properties: {
      status: "In Review",
      priority: "Medium",
    },
  },
  {
    id: 5,
    title: "Product Vision 2024",
    content: "Long-term vision and goals for our product...",
    workspace: { id: 1, name: "Product Roadmap", icon: "🗺️", color: "blue" },
    tags: ["vision", "strategy", "planning"],
    createdAt: "2023-09-28T09:00:00Z",
    updatedAt: "2023-10-08T10:30:00Z",
    favorite: true,
    emoji: "🔭",
    coverImage: "/placeholder.svg?height=200&width=600",
    properties: {
      status: "Draft",
      priority: "High",
    },
  },
  {
    id: 6,
    title: "Release Planning Template",
    content: "Standard template for planning product releases...",
    workspace: { id: 1, name: "Product Roadmap", icon: "🗺️", color: "blue" },
    tags: ["template", "release"],
    createdAt: "2023-09-25T16:15:00Z",
    updatedAt: "2023-10-05T11:20:00Z",
    favorite: false,
    emoji: "📅",
    properties: {
      status: "Published",
      priority: "Medium",
    },
  },
]

export default function WorkspacePage({ params }) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [view, setView] = useState("grid") // grid, list
  const [selectedPage, setSelectedPage] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newPageOpen, setNewPageOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  // Filter notes based on search query
  const filteredNotes = workspaceNotes.filter((note) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

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

  // Toggle note favorite status
  const toggleFavorite = (noteId) => {
    // In a real app, this would update the note's favorite status
  }

  // Create a new page
  const createNewPage = (data) => {
    // In a real app, this would create a new page
    setNewPageOpen(false)
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto hidden md:block">
          <div className="p-4">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`flex items-center justify-center h-8 w-8 rounded-md bg-${workspace.color}-100 dark:bg-${workspace.color}-900/30 text-${workspace.color}-600 dark:text-${workspace.color}-400`}
                >
                  {workspace.icon}
                </div>
                <h3 className="text-lg font-medium truncate">{workspace.name}</h3>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <div
                  className={`flex items-center justify-center h-5 w-5 rounded-full bg-${workspace.team.color}-100 dark:bg-${workspace.team.color}-900/30 text-${workspace.team.color}-600 dark:text-${workspace.team.color}-400`}
                >
                  {workspace.team.icon}
                </div>
                <span>{workspace.team.name}</span>
              </div>

              <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => setNewPageOpen(true)}>
                <Plus className="h-3.5 w-3.5" />
                New Page
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedPage(null)}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>

              <Button variant="ghost" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </Button>

              <Button variant="ghost" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Favorites
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="mb-2">
              <h4 className="px-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Pages</h4>
              <div className="space-y-1">
                {workspace.pages.map((page) => (
                  <Button
                    key={page.id}
                    variant="ghost"
                    className={`w-full justify-start ${selectedPage?.id === page.id ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                    onClick={() => setSelectedPage(page)}
                  >
                    <span className="mr-2">{page.icon}</span>
                    {page.title}
                    {page.type === "database" && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        DB
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
              {showSidebar ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="/teams">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>

              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center h-8 w-8 rounded-md bg-${workspace.color}-100 dark:bg-${workspace.color}-900/30 text-${workspace.color}-600 dark:text-${workspace.color}-400`}
                >
                  {workspace.icon}
                </div>
                <h1 className="text-xl font-bold">{workspace.name}</h1>
                {workspace.privacy === "private" && <Lock className="h-4 w-4 text-slate-400" />}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search workspace..."
                className="pl-8 bg-slate-100 dark:bg-slate-800 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex -space-x-2">
              {workspace.members.slice(0, 3).map((member) => (
                <TooltipProvider key={member.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-900">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{member.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              {workspace.members.length > 3 && (
                <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800">
                  <AvatarFallback>+{workspace.members.length - 3}</AvatarFallback>
                </Avatar>
              )}
            </div>

            <Dialog open={shareOpen} onOpenChange={setShareOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Share Workspace</DialogTitle>
                  <DialogDescription>Invite people to collaborate on this workspace.</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>People with access</Label>
                    <div className="space-y-2">
                      {workspace.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">{member.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{member.role}</div>
                            </div>
                          </div>

                          <Select defaultValue={member.isAdmin ? "admin" : "member"}>
                            <SelectTrigger className="w-[110px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invite-email">Invite people</Label>
                    <div className="flex gap-2">
                      <Input id="invite-email" placeholder="Email address" />
                      <Button>Invite</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Share link</Label>
                    <div className="flex gap-2">
                      <Input value="https://productive.app/workspace/1" readOnly />
                      <Button variant="outline">Copy</Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Switch id="link-access" />
                      <Label htmlFor="link-access">Anyone with the link can view</Label>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Workspace Settings</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="workspace-name">Name</Label>
                    <Input id="workspace-name" defaultValue={workspace.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workspace-description">Description</Label>
                    <Textarea id="workspace-description" defaultValue={workspace.description} />
                  </div>

                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="text-lg">
                        {workspace.icon}
                      </Button>
                      <Input placeholder="Search for an emoji..." className="flex-1" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="workspace-privacy">Privacy</Label>
                    <Select defaultValue={workspace.privacy}>
                      <SelectTrigger id="workspace-privacy">
                        <SelectValue placeholder="Select privacy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Private - Only members can access
                          </div>
                        </SelectItem>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Public - Anyone in the team can access
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Danger Zone</h3>
                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg">
                      <div>
                        <h4 className="font-medium">Delete Workspace</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Permanently delete this workspace and all its data
                        </p>
                      </div>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Workspace Content */}
        <div className="flex-1 overflow-auto">
          {selectedPage ? (
            <div className="p-6 max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl">{selectedPage.icon}</div>
                <h1 className="text-3xl font-bold">{selectedPage.title}</h1>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-slate-500 dark:text-slate-400">
                  This is a placeholder for the {selectedPage.title} page content. In a real application, this would
                  display the actual content of the page.
                </p>

                {selectedPage.type === "database" && (
                  <div className="mt-6 border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                            Name
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                            Priority
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                            Assigned To
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                            Due Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <tr key={item} className="bg-white dark:bg-slate-900">
                            <td className="px-4 py-3 text-sm">Feature {item}</td>
                            <td className="px-4 py-3">
                              <Badge
                                variant="outline"
                                className={
                                  item % 3 === 0
                                    ? "text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                                    : item % 3 === 1
                                      ? "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                                      : "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                                }
                              >
                                {item % 3 === 0 ? "Completed" : item % 3 === 1 ? "In Progress" : "Planned"}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                variant="outline"
                                className={
                                  item % 3 === 0
                                    ? "text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                                    : item % 3 === 1
                                      ? "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                                      : "text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                                }
                              >
                                {item % 3 === 0 ? "High" : item % 3 === 1 ? "Medium" : "Low"}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={workspace.members[item % workspace.members.length].avatar}
                                    alt={workspace.members[item % workspace.members.length].name}
                                  />
                                  <AvatarFallback>
                                    {workspace.members[item % workspace.members.length].name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">
                                  {workspace.members[item % workspace.members.length].name}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {new Date(new Date().setDate(new Date().getDate() + item * 3)).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                },
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Workspace Home</h2>
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
                    </TabsList>
                  </Tabs>

                  <Dialog open={newPageOpen} onOpenChange={setNewPageOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                        <Plus className="h-4 w-4" />
                        New Page
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Page</DialogTitle>
                        <DialogDescription>Add a new page to your workspace.</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="page-title">Title</Label>
                          <Input id="page-title" placeholder="Page title" />
                        </div>

                        <div className="space-y-2">
                          <Label>Icon</Label>
                          <div className="flex gap-2">
                            <Button variant="outline" className="text-lg">
                              📄
                            </Button>
                            <Input placeholder="Search for an emoji..." className="flex-1" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="page-type">Type</Label>
                          <Select defaultValue="page">
                            <SelectTrigger id="page-type">
                              <SelectValue placeholder="Select page type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="page">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  Page
                                </div>
                              </SelectItem>
                              <SelectItem value="database">
                                <div className="flex items-center gap-2">
                                  <Table className="h-4 w-4" />
                                  Database
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setNewPageOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => createNewPage({})}>
                          Create
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{workspace.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Created</span>
                        <span>{formatDate(workspace.createdAt)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Last updated</span>
                        <span>{formatDate(workspace.updatedAt)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Team</span>
                        <span>{workspace.team.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Members</span>
                        <span>{workspace.members.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">Pages</span>
                        <span>{workspace.pages.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workspace.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                            <AvatarFallback>
                              {activity.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                              <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(activity.time)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {workspace.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white dark:border-slate-800 ${
                                  member.status === "online"
                                    ? "bg-green-500"
                                    : member.status === "away"
                                      ? "bg-amber-500"
                                      : "bg-slate-300 dark:bg-slate-600"
                                }`}
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{member.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{member.role}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Pages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {workspace.pages.map((page) => (
                    <Card
                      key={page.id}
                      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedPage(page)}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-2xl">{page.icon}</div>
                          <CardTitle className="text-base">{page.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                          <Badge variant="outline">{page.type === "database" ? "Database" : "Page"}</Badge>
                          <span>Updated 2 days ago</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card
                    className="overflow-hidden border-dashed hover:shadow-md transition-shadow cursor-pointer flex items-center justify-center"
                    onClick={() => setNewPageOpen(true)}
                  >
                    <div className="p-6 text-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 mx-auto mb-2">
                        <Plus className="h-5 w-5" />
                      </div>
                      <p className="font-medium">New Page</p>
                    </div>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Notes</h3>

                <TabsContent value="grid" className="m-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onSelect={() => {}}
                        onToggleFavorite={() => toggleFavorite(note.id)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="m-0">
                  <NoteList
                    notes={filteredNotes}
                    onSelect={() => {}}
                    onToggleFavorite={toggleFavorite}
                    formatDate={formatDate}
                  />
                </TabsContent>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

