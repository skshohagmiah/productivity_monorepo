"use client"

import { useState } from "react"
import { Calendar, CheckCircle, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import TaskForm from "@/components/tasks/task-form"

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    title: "Finalize Q4 Marketing Plan",
    description: "Complete the draft and send for review",
    priority: "high",
    status: "in-progress",
    completed: false,
    dueDate: "2023-10-18",
    project: { id: 2, name: "Work", color: "blue" },
    tags: [
      { id: 2, name: "Important", color: "amber" },
      { id: 3, name: "In Progress", color: "blue" },
    ],
    assignee: {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    subtasks: [
      { id: 101, title: "Research competitors", completed: true },
      { id: 102, title: "Draft content calendar", completed: false },
      { id: 103, title: "Create budget proposal", completed: false },
    ],
  },
  {
    id: 2,
    title: "Review website redesign mockups",
    description: "Provide feedback on the new homepage design",
    priority: "medium",
    status: "to-do",
    completed: false,
    dueDate: "2023-10-18",
    project: { id: 3, name: "Website Redesign", color: "indigo" },
    tags: [{ id: 3, name: "In Progress", color: "blue" }],
    assignee: {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    subtasks: [
      { id: 201, title: "Review homepage", completed: false },
      { id: 202, title: "Review about page", completed: false },
    ],
  },
  {
    id: 3,
    title: "Prepare for client meeting",
    description: "Gather materials and create agenda",
    priority: "high",
    status: "to-do",
    completed: false,
    dueDate: "2023-10-19",
    project: { id: 2, name: "Work", color: "blue" },
    tags: [{ id: 1, name: "Urgent", color: "red" }],
    assignee: {
      id: 5,
      name: "Alex Wong",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    subtasks: [
      { id: 301, title: "Create presentation", completed: true },
      { id: 302, title: "Prepare talking points", completed: false },
      { id: 303, title: "Gather case studies", completed: true },
    ],
  },
  {
    id: 4,
    title: "Update team documentation",
    description: "Add new processes and update existing ones",
    priority: "low",
    status: "backlog",
    completed: false,
    dueDate: "2023-10-25",
    project: { id: 2, name: "Work", color: "blue" },
    tags: [{ id: 5, name: "Low Priority", color: "green" }],
    assignee: {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    subtasks: [],
  },
  {
    id: 5,
    title: "Send weekly newsletter",
    description: "Finalize content and schedule for delivery",
    priority: "medium",
    status: "done",
    completed: true,
    dueDate: "2023-10-16",
    project: { id: 4, name: "Marketing Campaign", color: "green" },
    tags: [],
    assignee: {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    subtasks: [
      { id: 501, title: "Write main article", completed: true },
      { id: 502, title: "Design email template", completed: true },
      { id: 503, title: "Test email on different clients", completed: true },
    ],
  },
  {
    id: 6,
    title: "Research competitor products",
    description: "Analyze features and pricing",
    priority: "medium",
    status: "done",
    completed: true,
    dueDate: "2023-10-15",
    project: { id: 5, name: "Research", color: "amber" },
    tags: [],
    assignee: {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    subtasks: [],
  },
  {
    id: 7,
    title: "Schedule dentist appointment",
    description: "Call Dr. Smith's office for a checkup",
    priority: "medium",
    status: "backlog",
    completed: false,
    dueDate: "2023-10-20",
    project: { id: 1, name: "Personal", color: "violet" },
    tags: [],
    assignee: null,
    subtasks: [],
  },
  {
    id: 8,
    title: "Pay monthly bills",
    description: "Rent, utilities, and credit card",
    priority: "high",
    status: "to-do",
    completed: false,
    dueDate: "2023-10-28",
    project: { id: 1, name: "Personal", color: "violet" },
    tags: [{ id: 2, name: "Important", color: "amber" }],
    assignee: null,
    subtasks: [
      { id: 801, title: "Pay rent", completed: false },
      { id: 802, title: "Pay electricity bill", completed: false },
      { id: 803, title: "Pay internet bill", completed: false },
      { id: 804, title: "Pay credit card", completed: false },
    ],
  },
  {
    id: 9,
    title: "Buy groceries",
    description: "Get items for the week",
    priority: "medium",
    status: "to-do",
    completed: false,
    dueDate: "2023-10-18",
    project: { id: 1, name: "Personal", color: "violet" },
    tags: [],
    assignee: null,
    subtasks: [],
  },
  {
    id: 10,
    title: "Optimize landing page performance",
    description: "Improve load times and mobile responsiveness",
    priority: "medium",
    status: "in-progress",
    completed: false,
    dueDate: "2023-10-23",
    project: { id: 3, name: "Website Redesign", color: "indigo" },
    tags: [{ id: 3, name: "In Progress", color: "blue" }],
    assignee: {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    subtasks: [
      { id: 1001, title: "Optimize images", completed: false },
      { id: 1002, title: "Minify CSS and JS", completed: false },
      { id: 1003, title: "Implement lazy loading", completed: false },
    ],
  },
]

// Board columns
const columns = [
  { id: "backlog", name: "Backlog", color: "slate" },
  { id: "to-do", name: "To Do", color: "blue" },
  { id: "in-progress", name: "In Progress", color: "amber" },
  { id: "done", name: "Done", color: "green" },
]

export default function TaskBoardView({ onTaskSelect, filter, selectedProject, selectedTag }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [newTaskOpen, setNewTaskOpen] = useState(false)
  const [newTaskColumn, setNewTaskColumn] = useState(null)

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0]
      return task.dueDate === today && !task.completed
    }
    if (filter === "upcoming") {
      return !task.completed
    }
    if (filter === "completed") {
      return task.completed
    }

    // Filter by project
    if (selectedProject) {
      return task.project.id === selectedProject.id
    }

    // Filter by tag
    if (selectedTag) {
      return task.tags.some((tag) => tag.id === selectedTag.id)
    }

    // Default: show all
    return true
  })

  // Group tasks by status
  const groupedTasks = columns.reduce((acc, column) => {
    acc[column.id] = filteredTasks.filter((task) => task.status === column.id)
    return acc
  }, {})

  // Check if a task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    const today = new Date().toISOString().split("T")[0]
    return dueDate < today
  }

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return ""

    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    // Reset hours to compare just the dates
    today.setHours(0, 0, 0, 0)
    tomorrow.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)

    if (date.getTime() === today.getTime()) {
      return "Today"
    } else if (date.getTime() === tomorrow.getTime()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  // Handle adding a new task to a specific column
  const handleAddTask = (columnId) => {
    setNewTaskColumn(columnId)
    setNewTaskOpen(true)
  }

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="flex gap-4 h-full">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 min-w-[280px] max-w-[350px]">
            <Card className="h-full flex flex-col">
              <CardHeader className={`pb-2 border-b border-${column.color}-200 dark:border-${column.color}-800`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${column.color}-500`}></div>
                    <CardTitle className="text-base">{column.name}</CardTitle>
                    <Badge variant="outline">{groupedTasks[column.id].length}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleAddTask(column.id)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-2">
                {groupedTasks[column.id].length > 0 ? (
                  <div className="space-y-2">
                    {groupedTasks[column.id].map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => onTaskSelect(task)}
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onTaskSelect(task)
                                }}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Move to Backlog</DropdownMenuItem>
                              <DropdownMenuItem>Move to To Do</DropdownMenuItem>
                              <DropdownMenuItem>Move to In Progress</DropdownMenuItem>
                              <DropdownMenuItem>Move to Done</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {task.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-1 mt-2">
                          {task.project && (
                            <Badge
                              variant="outline"
                              className={`
                                text-xs py-0 px-1.5
                                bg-${task.project.color}-100 dark:bg-${task.project.color}-900/20 
                                text-${task.project.color}-600 dark:text-${task.project.color}-400 
                                border-${task.project.color}-200 dark:border-${task.project.color}-800
                              `}
                            >
                              {task.project.name}
                            </Badge>
                          )}

                          {task.priority === "high" && (
                            <Badge
                              variant="outline"
                              className="text-xs py-0 px-1.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                            >
                              High
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1">
                            {task.subtasks.length > 0 && (
                              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                <CheckCircle className="h-3 w-3" />
                                {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {task.assignee && (
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                                <AvatarFallback className="text-[8px]">
                                  {task.assignee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            )}

                            {task.dueDate && (
                              <div
                                className={`
                                flex items-center text-xs
                                ${
                                  isOverdue(task.dueDate) && !task.completed
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-slate-500 dark:text-slate-400"
                                }
                              `}
                              >
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(task.dueDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-4">
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">No tasks in this column</p>
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => handleAddTask(column.id)}>
                        <Plus className="h-3 w-3" />
                        Add Task
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* New Task Dialog */}
      <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Add details for your new task.</DialogDescription>
          </DialogHeader>
          <TaskForm onClose={() => setNewTaskOpen(false)} initialStatus={newTaskColumn} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

