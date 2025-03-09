"use client"

import { useState } from "react"
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  Filter,
  Globe,
  Lock,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

// Mock data for teams
const teams = [
  {
    id: 1,
    name: "Product Team",
    description: "Core product development team",
    icon: "🚀",
    color: "violet",
    members: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Product Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        isAdmin: true,
      },
      {
        id: 2,
        name: "Michael Chen",
        role: "Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        role: "Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
      },
      { id: 4, name: "David Kim", role: "Developer", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
    ],
    workspaces: [
      { id: 1, name: "Product Roadmap", icon: "🗺️", color: "blue" },
      { id: 2, name: "Design System", icon: "🎨", color: "indigo" },
      { id: 3, name: "Sprint Planning", icon: "📅", color: "violet" },
    ],
    recentActivity: [
      {
        id: 1,
        user: { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
        action: "created a note",
        target: "Q4 Product Roadmap",
        time: "2 hours ago",
      },
      {
        id: 2,
        user: { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
        action: "updated",
        target: "Design System Documentation",
        time: "Yesterday",
      },
      {
        id: 3,
        user: { id: 3, name: "Emma Rodriguez", avatar: "/placeholder.svg?height=40&width=40" },
        action: "completed a task",
        target: "Implement New Feature",
        time: "2 days ago",
      },
    ],
    privacy: "private",
  },
  {
    id: 2,
    name: "Marketing Team",
    description: "Marketing and communications team",
    icon: "📣",
    color: "blue",
    members: [
      {
        id: 5,
        name: "Alex Wong",
        role: "Marketing Lead",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        isAdmin: true,
      },
      {
        id: 6,
        name: "Jessica Taylor",
        role: "Content Writer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
      },
      {
        id: 7,
        name: "Ryan Garcia",
        role: "Social Media Manager",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
      },
    ],
    workspaces: [
      { id: 4, name: "Content Calendar", icon: "📆", color: "green" },
      { id: 5, name: "Campaign Planning", icon: "📢", color: "amber" },
    ],
    recentActivity: [
      {
        id: 4,
        user: { id: 5, name: "Alex Wong", avatar: "/placeholder.svg?height=40&width=40" },
        action: "scheduled",
        target: "Q4 Marketing Campaign",
        time: "1 day ago",
      },
      {
        id: 5,
        user: { id: 6, name: "Jessica Taylor", avatar: "/placeholder.svg?height=40&width=40" },
        action: "created a note",
        target: "Blog Post Ideas",
        time: "3 days ago",
      },
    ],
    privacy: "private",
  },
  {
    id: 3,
    name: "Leadership",
    description: "Executive team and leadership",
    icon: "👑",
    color: "amber",
    members: [
      {
        id: 8,
        name: "Robert Chen",
        role: "CEO",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        isAdmin: true,
      },
      { id: 9, name: "Lisa Park", role: "COO", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
      { id: 10, name: "James Wilson", role: "CTO", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
    ],
    workspaces: [
      { id: 6, name: "Strategic Planning", icon: "🎯", color: "red" },
      { id: 7, name: "OKRs", icon: "📊", color: "blue" },
    ],
    recentActivity: [
      {
        id: 6,
        user: { id: 8, name: "Robert Chen", avatar: "/placeholder.svg?height=40&width=40" },
        action: "updated",
        target: "Company OKRs",
        time: "1 week ago",
      },
    ],
    privacy: "private",
  },
  {
    id: 4,
    name: "Design Team",
    description: "UI/UX and graphic design team",
    icon: "🎨",
    color: "indigo",
    members: [
      {
        id: 2,
        name: "Michael Chen",
        role: "Lead Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
        isAdmin: true,
      },
      {
        id: 11,
        name: "Sophia Lee",
        role: "UI Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
      },
      {
        id: 12,
        name: "Daniel Brown",
        role: "Graphic Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
      },
    ],
    workspaces: [
      { id: 8, name: "Design System", icon: "🎨", color: "indigo" },
      { id: 9, name: "Brand Assets", icon: "🖼️", color: "violet" },
    ],
    recentActivity: [
      {
        id: 7,
        user: { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
        action: "uploaded",
        target: "New Logo Designs",
        time: "3 days ago",
      },
      {
        id: 8,
        user: { id: 11, name: "Sophia Lee", avatar: "/placeholder.svg?height=40&width=40" },
        action: "commented on",
        target: "Homepage Redesign",
        time: "5 days ago",
      },
    ],
    privacy: "private",
  },
  {
    id: 5,
    name: "Engineering",
    description: "Software engineering and development",
    icon: "💻",
    color: "green",
    members: [
      {
        id: 10,
        name: "James Wilson",
        role: "Engineering Lead",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
        isAdmin: true,
      },
      {
        id: 3,
        name: "Emma Rodriguez",
        role: "Senior Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
      },
      {
        id: 4,
        name: "David Kim",
        role: "Backend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
      },
      {
        id: 13,
        name: "Thomas Moore",
        role: "Frontend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
    ],
    workspaces: [
      { id: 10, name: "Code Repository", icon: "📁", color: "slate" },
      { id: 11, name: "Technical Docs", icon: "📝", color: "blue" },
      { id: 12, name: "Architecture", icon: "🏗️", color: "amber" },
    ],
    recentActivity: [
      {
        id: 9,
        user: { id: 3, name: "Emma Rodriguez", avatar: "/placeholder.svg?height=40&width=40" },
        action: "merged",
        target: "Feature Branch",
        time: "1 day ago",
      },
      {
        id: 10,
        user: { id: 13, name: "Thomas Moore", avatar: "/placeholder.svg?height=40&width=40" },
        action: "created a note",
        target: "API Documentation",
        time: "2 days ago",
      },
    ],
    privacy: "private",
  },
]

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [newTeamOpen, setNewTeamOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter teams based on search query
  const filteredTeams = teams.filter((team) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      team.name.toLowerCase().includes(query) ||
      team.description.toLowerCase().includes(query) ||
      team.members.some((member) => member.name.toLowerCase().includes(query))
    )
  })

  // Format date for display
  const formatDate = (timeAgo) => {
    return timeAgo // In a real app, this would convert timestamps to relative time
  }

  // Handle team selection
  const handleTeamSelect = (team) => {
    setSelectedTeam(team)
    setActiveTab("overview")
  }

  // Create a new team
  const createNewTeam = (data) => {
    // In a real app, this would create a new team
    setNewTeamOpen(false)
  }

  // Invite members to team
  const inviteMembers = (emails) => {
    // In a real app, this would send invitations
    setInviteOpen(false)
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
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

            <h1 className="text-xl font-bold">Teams</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search teams..."
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
          </div>
        </header>

        {/* Teams Content */}
        <div className="flex-1 overflow-auto">
          {selectedTeam ? (
            <div className="h-full flex flex-col">
              {/* Team Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedTeam(null)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center justify-center h-10 w-10 rounded-md bg-${selectedTeam.color}-100 dark:bg-${selectedTeam.color}-900/30 text-${selectedTeam.color}-600 dark:text-${selectedTeam.color}-400 text-xl`}
                    >
                      {selectedTeam.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-medium flex items-center gap-2">
                        {selectedTeam.name}
                        {selectedTeam.privacy === "private" && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Lock className="h-4 w-4 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent>Private team</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{selectedTeam.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                        <Plus className="h-4 w-4" />
                        Invite
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Invite Team Members</DialogTitle>
                        <DialogDescription>Invite people to join the {selectedTeam.name} team.</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="emails">Email Addresses</Label>
                          <Textarea
                            id="emails"
                            placeholder="Enter email addresses separated by commas"
                            className="min-h-[100px]"
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            We'll send an invitation to each email address.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select defaultValue="member">
                            <SelectTrigger id="role">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Personal Message (Optional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Add a personal message to your invitation"
                            className="min-h-[80px]"
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setInviteOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => inviteMembers([])}>
                          Send Invitations
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Team Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        Manage Members
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Globe className="h-4 w-4 mr-2" />
                        Change Privacy
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        <X className="h-4 w-4 mr-2" />
                        Leave Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Team Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
                <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <TabsList className="mx-4 my-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="flex-1 p-4 overflow-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Team Stats */}
                    <div className="md:col-span-2 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Team Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <div className="text-sm text-slate-500 dark:text-slate-400">Members</div>
                              <div className="text-2xl font-bold mt-1">{selectedTeam.members.length}</div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <div className="text-sm text-slate-500 dark:text-slate-400">Workspaces</div>
                              <div className="text-2xl font-bold mt-1">{selectedTeam.workspaces.length}</div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                              <div className="text-sm text-slate-500 dark:text-slate-400">Created</div>
                              <div className="text-2xl font-bold mt-1">2 months ago</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedTeam.recentActivity.map((activity) => (
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
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {formatDate(activity.time)}
                                  </p>
                                </div>
                              </div>
                            ))}

                            {selectedTeam.recentActivity.length === 0 && (
                              <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                                No recent activity
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Team Sidebar */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Team Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedTeam.members.slice(0, 5).map((member) => (
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
                                    <div className="text-sm font-medium flex items-center gap-1">
                                      {member.name}
                                      {member.isAdmin && (
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Shield className="h-3 w-3 text-violet-500" />
                                            </TooltipTrigger>
                                            <TooltipContent>Team Admin</TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      )}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{member.role}</div>
                                  </div>
                                </div>

                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}

                            {selectedTeam.members.length > 5 && (
                              <Button variant="outline" className="w-full text-sm" size="sm">
                                View All Members
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Workspaces</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedTeam.workspaces.slice(0, 5).map((workspace) => (
                              <div key={workspace.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`flex items-center justify-center h-8 w-8 rounded-md bg-${workspace.color}-100 dark:bg-${workspace.color}-900/30 text-${workspace.color}-600 dark:text-${workspace.color}-400`}
                                  >
                                    {workspace.icon}
                                  </div>
                                  <div className="text-sm font-medium">{workspace.name}</div>
                                </div>

                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}

                            <Button variant="outline" className="w-full text-sm" size="sm">
                              <Plus className="h-3.5 w-3.5 mr-1" />
                              New Workspace
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="members" className="flex-1 p-4 overflow-auto">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Team Members</CardTitle>
                      <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                        <Plus className="h-4 w-4" />
                        Invite Members
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                            <Input
                              type="search"
                              placeholder="Search members..."
                              className="pl-8 bg-slate-100 dark:bg-slate-800 border-none"
                            />
                          </div>

                          <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Roles</SelectItem>
                              <SelectItem value="admin">Admins</SelectItem>
                              <SelectItem value="member">Members</SelectItem>
                              <SelectItem value="viewer">Viewers</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-slate-50 dark:bg-slate-800">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                                  Name
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                                  Role
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                                  Status
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                                  Access
                                </th>
                                <th className="px-4 py-3 text-right text-sm font-medium text-slate-500 dark:text-slate-400">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                              {selectedTeam.members.map((member) => (
                                <tr key={member.id} className="bg-white dark:bg-slate-900">
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
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
                                        <div className="font-medium">{member.name}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-sm">{member.role}</td>
                                  <td className="px-4 py-3">
                                    <Badge
                                      variant="outline"
                                      className={`
                                      ${
                                        member.status === "online"
                                          ? "text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                                          : member.status === "away"
                                            ? "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                                            : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                                      }
                                    `}
                                    >
                                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                    </Badge>
                                  </td>
                                  <td className="px-4 py-3">
                                    <Badge
                                      variant={member.isAdmin ? "default" : "outline"}
                                      className={member.isAdmin ? "bg-violet-500" : ""}
                                    >
                                      {member.isAdmin ? "Admin" : "Member"}
                                    </Badge>
                                  </td>
                                  <td className="px-4 py-3 text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Mail className="h-4 w-4 mr-2" />
                                          Message
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Shield className="h-4 w-4 mr-2" />
                                          Change Role
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                          <X className="h-4 w-4 mr-2" />
                                          Remove
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="workspaces" className="flex-1 p-4 overflow-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium">Team Workspaces</h2>
                    <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                      <Plus className="h-4 w-4" />
                      New Workspace
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedTeam.workspaces.map((workspace) => (
                      <Card key={workspace.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex items-center justify-center h-8 w-8 rounded-md bg-${workspace.color}-100 dark:bg-${workspace.color}-900/30 text-${workspace.color}-600 dark:text-${workspace.color}-400`}
                              >
                                {workspace.icon}
                              </div>
                              <CardTitle className="text-base">{workspace.name}</CardTitle>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Settings className="h-4 w-4 mr-2" />
                                  Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Users className="h-4 w-4 mr-2" />
                                  Members
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                  <X className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>12 notes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              <span>8 tasks</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {selectedTeam.members.slice(0, 3).map((member) => (
                              <Avatar key={member.id} className="h-6 w-6 border-2 border-white dark:border-slate-900">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback className="text-[10px]">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {selectedTeam.members.length > 3 && (
                              <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px]">
                                +{selectedTeam.members.length - 3}
                              </div>
                            )}
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/workspaces/${workspace.id}`}>Open</a>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="flex-1 p-4 overflow-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Team Settings</CardTitle>
                      <CardDescription>Manage your team's settings and preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="team-name">Team Name</Label>
                        <Input id="team-name" defaultValue={selectedTeam.name} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="team-description">Description</Label>
                        <Textarea id="team-description" defaultValue={selectedTeam.description} />
                      </div>

                      <div className="space-y-2">
                        <Label>Team Icon</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="text-lg">
                            {selectedTeam.icon}
                          </Button>
                          <Input placeholder="Search for an emoji..." className="flex-1" />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="team-privacy">Privacy</Label>
                        <Select defaultValue={selectedTeam.privacy}>
                          <SelectTrigger id="team-privacy">
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
                                Public - Anyone in the organization can access
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">Notifications</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Configure team notification settings
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium">Allow Member Invitations</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Let members invite others to this team
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Danger Zone</h3>
                        <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900 rounded-lg">
                          <div>
                            <h4 className="font-medium">Delete Team</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Permanently delete this team and all its data
                            </p>
                          </div>
                          <Button variant="destructive">Delete Team</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Your Teams</h2>
                <Dialog open={newTeamOpen} onOpenChange={setNewTeamOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                      <Plus className="h-4 w-4" />
                      New Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New Team</DialogTitle>
                      <DialogDescription>Create a new team to collaborate with others.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="team-name">Team Name</Label>
                        <Input id="team-name" placeholder="Enter team name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="team-description">Description</Label>
                        <Textarea
                          id="team-description"
                          placeholder="What's this team about?"
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Team Icon</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="text-lg">
                            🚀
                          </Button>
                          <Input placeholder="Search for an emoji..." className="flex-1" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="team-privacy">Privacy</Label>
                        <Select defaultValue="private">
                          <SelectTrigger id="team-privacy">
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
                                Public - Anyone in the organization can access
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setNewTeamOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => createNewTeam({})}>
                        Create Team
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTeams.map((team) => (
                  <Card
                    key={team.id}
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleTeamSelect(team)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex items-center justify-center h-8 w-8 rounded-md bg-${team.color}-100 dark:bg-${team.color}-900/30 text-${team.color}-600 dark:text-${team.color}-400`}
                          >
                            {team.icon}
                          </div>
                          <CardTitle className="text-base">{team.name}</CardTitle>
                        </div>
                        {team.privacy === "private" && <Lock className="h-4 w-4 text-slate-400" />}
                      </div>
                      <CardDescription className="mt-1">{team.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{team.members.length} members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{team.workspaces.length} workspaces</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 3).map((member) => (
                          <Avatar key={member.id} className="h-6 w-6 border-2 border-white dark:border-slate-900">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="text-[10px]">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {team.members.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px]">
                            +{team.members.length - 3}
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredTeams.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                    <Users className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No teams found</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    {searchQuery ? `No teams matching "${searchQuery}"` : "You don't have any teams yet."}
                  </p>
                  <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                    <Plus className="h-4 w-4" />
                    Create Your First Team
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

