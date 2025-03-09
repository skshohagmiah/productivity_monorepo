"use client"
import { Calendar, CheckCircle, Clock, FileText, MessageSquare, MoreHorizontal, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Lead",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    tasks: { completed: 12, total: 15 },
    lastActive: "Just now",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    tasks: { completed: 8, total: 10 },
    lastActive: "5 minutes ago",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Content Writer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    tasks: { completed: 5, total: 8 },
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    tasks: { completed: 18, total: 20 },
    lastActive: "3 hours ago",
  },
  {
    id: 5,
    name: "Alex Wong",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    tasks: { completed: 22, total: 25 },
    lastActive: "30 minutes ago",
  },
]

// Mock data for team projects
const teamProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Revamp the company website with new design and improved UX",
    progress: 65,
    members: [1, 2, 4, 5],
    dueDate: "Oct 30, 2023",
    tasks: { completed: 18, total: 32 },
  },
  {
    id: 2,
    name: "Q4 Marketing Campaign",
    description: "Plan and execute the holiday season marketing campaign",
    progress: 40,
    members: [1, 3, 5],
    dueDate: "Dec 15, 2023",
    tasks: { completed: 12, total: 28 },
  },
  {
    id: 3,
    name: "Mobile App Update",
    description: "Release new features and fix bugs in the mobile application",
    progress: 80,
    members: [2, 4, 5],
    dueDate: "Nov 10, 2023",
    tasks: { completed: 24, total: 30 },
  },
]

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    user: teamMembers[0],
    action: "completed a task",
    target: "Finalize Q4 Marketing Plan",
    time: "10 minutes ago",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  {
    id: 2,
    user: teamMembers[1],
    action: "added a comment on",
    target: "Website Redesign",
    time: "30 minutes ago",
    icon: <MessageSquare className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 3,
    user: teamMembers[4],
    action: "created a new project",
    target: "Mobile App Update",
    time: "2 hours ago",
    icon: <Plus className="h-4 w-4 text-violet-500" />,
  },
  {
    id: 4,
    user: teamMembers[2],
    action: "uploaded a document",
    target: "Content Calendar.docx",
    time: "Yesterday",
    icon: <FileText className="h-4 w-4 text-amber-500" />,
  },
  {
    id: 5,
    user: teamMembers[3],
    action: "scheduled a meeting",
    target: "Code Review",
    time: "Yesterday",
    icon: <Calendar className="h-4 w-4 text-indigo-500" />,
  },
]

export default function TeamSection() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium">Team Collaboration</h2>
          <p className="text-slate-500 dark:text-slate-400">Work together with your team members</p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Users className="h-4 w-4" />
            Invite Member
          </Button>
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700" size="sm">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Team Members Tab */}
        <TabsContent value="members" className="mt-0">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Input type="search" placeholder="Search members..." className="max-w-xs" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${
                            member.status === "online"
                              ? "bg-green-500"
                              : member.status === "away"
                                ? "bg-amber-500"
                                : "bg-slate-300 dark:bg-slate-600"
                          }`}
                        />
                      </div>

                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{member.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                          Tasks: {member.tasks.completed}/{member.tasks.total}
                        </div>
                        <Progress value={(member.tasks.completed / member.tasks.total) * 100} className="h-1.5 w-24">
                          <div className="h-full bg-violet-600 rounded-full" />
                        </Progress>
                      </div>

                      <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {member.lastActive}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Assign Task</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-0">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Team Projects</CardTitle>
                <Input type="search" placeholder="Search projects..." className="max-w-xs" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 mt-4">
                {teamProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 border rounded-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{project.name}</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">{project.description}</p>
                      </div>

                      <Badge variant="outline" className="w-fit">
                        Due: {project.dueDate}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-slate-500 dark:text-slate-400">Progress: {project.progress}%</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          Tasks: {project.tasks.completed}/{project.tasks.total}
                        </div>
                      </div>
                      <Progress value={project.progress} className="h-2">
                        <div className="h-full bg-violet-600 rounded-full" />
                      </Progress>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.members.map((memberId) => {
                          const member = teamMembers.find((m) => m.id === memberId)
                          return (
                            <Avatar key={memberId} className="h-8 w-8 border-2 border-white dark:border-slate-800">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )
                        })}
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-dashed">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback>
                        {activity.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.user.name}</span>
                        <span className="text-slate-500 dark:text-slate-400">{activity.action}</span>
                        <span className="font-medium">{activity.target}</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <div className="mr-2">{activity.icon}</div>
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

