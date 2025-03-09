"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  KanbanIcon as LayoutKanban,
  List,
  Plus,
  Search,
  Settings,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import TaskListView from "@/components/tasks/task-list-view"
import TaskBoardView from "@/components/tasks/task-board-view"
import TaskCalendarView from "@/components/tasks/task-calendar-view"
import TaskForm from "@/components/tasks/task-form"
import TaskDetails from "@/components/tasks/task-details"

export default function TasksPage() {
  const [view, setView] = useState("list") // list, board, calendar
  const [showSidebar, setShowSidebar] = useState(true)
  const [newTaskOpen, setNewTaskOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(false)
  const [filter, setFilter] = useState("all") // all, today, upcoming, completed
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)

  // Handle task selection
  const handleTaskSelect = (task) => {
    setSelectedTask(task)
    setTaskDetailsOpen(true)
  }

  // Calculate task statistics
  const totalTasks = 24
  const completedTasks = 8
  const overdueTasks = 3
  const upcomingTasks = 5

  const completionPercentage = Math.round((completedTasks / totalTasks) * 100)

  // Projects data
  const projects = [
    { id: 1, name: "Personal", color: "violet", count: 8 },
    { id: 2, name: "Work", color: "blue", count: 12 },
    { id: 3, name: "Website Redesign", color: "indigo", count: 5 },
    { id: 4, name: "Marketing Campaign", color: "green", count: 7 },
    { id: 5, name: "Research", color: "amber", count: 3 },
  ]

  // Tags data
  const tags = [
    { id: 1, name: "Urgent", color: "red", count: 3 },
    { id: 2, name: "Important", color: "amber", count: 7 },
    { id: 3, name: "In Progress", color: "blue", count: 5 },
    { id: 4, name: "Blocked", color: "slate", count: 2 },
    { id: 5, name: "Low Priority", color: "green", count: 4 },
  ]

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto hidden md:block">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Tasks</h3>

              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "all" ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                  onClick={() => {
                    setFilter("all")
                    setSelectedProject(null)
                    setSelectedTag(null)
                  }}
                >
                  <List className="h-4 w-4 mr-2" />
                  All Tasks
                  <Badge className="ml-auto">{totalTasks}</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "today" ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                  onClick={() => {
                    setFilter("today")
                    setSelectedProject(null)
                    setSelectedTag(null)
                  }}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Today
                  <Badge className="ml-auto">{upcomingTasks}</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "upcoming" ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                  onClick={() => {
                    setFilter("upcoming")
                    setSelectedProject(null)
                    setSelectedTag(null)
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming
                  <Badge className="ml-auto">{upcomingTasks + overdueTasks}</Badge>
                </Button>

                <Button
                  variant="ghost"
                  className={`w-full justify-start ${filter === "completed" ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                  onClick={() => {
                    setFilter("completed")
                    setSelectedProject(null)
                    setSelectedTag(null)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Completed
                  <Badge className="ml-auto">{completedTasks}</Badge>
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            <Collapsible defaultOpen>
              <div className="flex items-center justify-between mb-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    <h3 className="text-sm font-medium">Projects</h3>
                  </Button>
                </CollapsibleTrigger>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <CollapsibleContent>
                <div className="space-y-1 ml-2">
                  {projects.map((project) => (
                    <Button
                      key={project.id}
                      variant="ghost"
                      className={`w-full justify-start ${selectedProject?.id === project.id ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                      onClick={() => {
                        setSelectedProject(project)
                        setSelectedTag(null)
                        setFilter(null)
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-${project.color}-500 mr-2`}></div>
                      {project.name}
                      <Badge className="ml-auto">{project.count}</Badge>
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
                  {tags.map((tag) => (
                    <Button
                      key={tag.id}
                      variant="ghost"
                      className={`w-full justify-start ${selectedTag?.id === tag.id ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400" : ""}`}
                      onClick={() => {
                        setSelectedTag(tag)
                        setSelectedProject(null)
                        setFilter(null)
                      }}
                    >
                      <Tag className={`h-4 w-4 mr-2 text-${tag.color}-500`} />
                      {tag.name}
                      <Badge className="ml-auto">{tag.count}</Badge>
                    </Button>
                  ))}
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

            <h1 className="text-xl font-bold">Tasks</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8 bg-slate-100 dark:bg-slate-800 border-none"
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

        {/* Task Controls */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">
                {selectedProject
                  ? selectedProject.name
                  : selectedTag
                    ? `#${selectedTag.name}`
                    : filter === "today"
                      ? "Today's Tasks"
                      : filter === "upcoming"
                        ? "Upcoming Tasks"
                        : filter === "completed"
                          ? "Completed Tasks"
                          : "All Tasks"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {selectedProject
                  ? `${selectedProject.count} tasks in this project`
                  : selectedTag
                    ? `${selectedTag.count} tasks with this tag`
                    : filter === "today"
                      ? `${upcomingTasks} tasks due today`
                      : filter === "upcoming"
                        ? `${upcomingTasks + overdueTasks} tasks upcoming`
                        : filter === "completed"
                          ? `${completedTasks} completed tasks`
                          : `${totalTasks} tasks total`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={setView} className="w-auto">
                <TabsList>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4 mr-2" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="board">
                    <LayoutKanban className="h-4 w-4 mr-2" />
                    Board
                  </TabsTrigger>
                  <TabsTrigger value="calendar">
                    <Calendar className="h-4 w-4 mr-2" />
                    Calendar
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                    <Plus className="h-4 w-4" />
                    Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>Add details for your new task.</DialogDescription>
                  </DialogHeader>
                  <TaskForm onClose={() => setNewTaskOpen(false)} projects={projects} tags={tags} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Task Statistics */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Completion Rate</p>
                  <h3 className="text-xl font-bold">{completionPercentage}%</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <List className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total Tasks</p>
                  <h3 className="text-xl font-bold">{totalTasks}</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Due Today</p>
                  <h3 className="text-xl font-bold">{upcomingTasks}</h3>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Overdue</p>
                  <h3 className="text-xl font-bold">{overdueTasks}</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Task Views */}
        <div className="flex-1 overflow-auto">
          <Tabs>
          <TabsContent value="list" className="h-full m-0">
            <TaskListView
              onTaskSelect={handleTaskSelect}
              filter={filter}
              selectedProject={selectedProject}
              selectedTag={selectedTag}
            />
          </TabsContent>

          <TabsContent value="board" className="h-full m-0">
            <TaskBoardView
              onTaskSelect={handleTaskSelect}
              filter={filter}
              selectedProject={selectedProject}
              selectedTag={selectedTag}
            />
          </TabsContent>

          <TabsContent value="calendar" className="h-full m-0">
            <TaskCalendarView
              onTaskSelect={handleTaskSelect}
              filter={filter}
              selectedProject={selectedProject}
              selectedTag={selectedTag}
            />
          </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Task Details Drawer */}
      <Dialog open={taskDetailsOpen} onOpenChange={setTaskDetailsOpen}>
        <DialogContent className="sm:max-w-[550px]">
          {selectedTask && (
            <TaskDetails
              task={selectedTask}
              onClose={() => setTaskDetailsOpen(false)}
              projects={projects}
              tags={tags}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

