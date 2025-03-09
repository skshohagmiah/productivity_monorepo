"use client"

import { useState } from "react"
import { Calendar, CheckCircle, ChevronDown, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    title: "Finalize Q4 Marketing Plan",
    description: "Complete the draft and send for review",
    priority: "high",
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

export default function TaskListView({ onTaskSelect, filter, selectedProject, selectedTag }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [sortBy, setSortBy] = useState("dueDate")
  const [sortOrder, setSortOrder] = useState("asc")

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

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

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      if (!a.dueDate) return sortOrder === "asc" ? 1 : -1
      if (!b.dueDate) return sortOrder === "asc" ? -1 : 1
      return sortOrder === "asc" ? a.dueDate.localeCompare(b.dueDate) : b.dueDate.localeCompare(a.dueDate)
    }

    if (sortBy === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return sortOrder === "asc"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority]
    }

    if (sortBy === "title") {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    }

    return 0
  })

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

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            <ChevronDown className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Input type="search" placeholder="Filter tasks..." className="max-w-xs" />
        </div>
      </div>

      <div className="space-y-2">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`
                p-4 border rounded-lg transition-all
                ${
                  task.completed
                    ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                  className={`mt-1 h-5 w-5 rounded-full ${
                    task.priority === "high"
                      ? "text-red-500 border-red-500"
                      : task.priority === "medium"
                        ? "text-amber-500 border-amber-500"
                        : "text-slate-500 border-slate-500"
                  }`}
                />

                <div className="flex-1 min-w-0" onClick={() => onTaskSelect(task)}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4
                        className={`font-medium ${task.completed ? "line-through text-slate-500 dark:text-slate-400" : ""}`}
                      >
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
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
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleTaskCompletion(task.id)
                          }}
                        >
                          {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {task.project && (
                      <Badge
                        variant="outline"
                        className={`
                          bg-${task.project.color}-100 dark:bg-${task.project.color}-900/20 
                          text-${task.project.color}-600 dark:text-${task.project.color}-400 
                          border-${task.project.color}-200 dark:border-${task.project.color}-800
                        `}
                      >
                        {task.project.name}
                      </Badge>
                    )}

                    {task.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="outline"
                        className={`
                          text-${tag.color}-600 dark:text-${tag.color}-400
                          border-${tag.color}-200 dark:border-${tag.color}-800
                        `}
                      >
                        {tag.name}
                      </Badge>
                    ))}

                    {task.subtasks.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <CheckCircle className="h-3 w-3" />
                        {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length}
                      </div>
                    )}

                    <div className="ml-auto flex items-center gap-2">
                      {task.assignee && (
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                          <AvatarFallback>
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
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No tasks found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {filter === "completed"
                ? "You don't have any completed tasks."
                : filter === "today"
                  ? "You don't have any tasks due today."
                  : filter === "upcoming"
                    ? "You don't have any upcoming tasks."
                    : selectedProject
                      ? `You don't have any tasks in the ${selectedProject.name} project.`
                      : selectedTag
                        ? `You don't have any tasks with the ${selectedTag.name} tag.`
                        : "You don't have any tasks yet."}
            </p>
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

