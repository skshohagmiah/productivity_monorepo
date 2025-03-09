"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  },
]

export default function TaskCalendarView({ onTaskSelect, filter, selectedProject, selectedTag }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateTasks, setSelectedDateTasks] = useState([])
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [newTaskOpen, setNewTaskOpen] = useState(false)

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Get days from previous month to fill the first week
  const daysFromPrevMonth = firstDayOfMonth

  // Get days from next month to fill the last week
  const daysFromNextMonth = 42 - daysInMonth - daysFromPrevMonth // 42 = 6 rows * 7 days

  // Generate calendar days array
  const calendarDays = []

  // Add days from previous month
  const prevMonthDays = getDaysInMonth(year, month - 1)
  for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
    calendarDays.push({
      day: i,
      month: "prev",
      date: new Date(year, month - 1, i),
    })
  }

  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: "current",
      date: new Date(year, month, i),
    })
  }

  // Add days from next month
  for (let i = 1; i <= daysFromNextMonth; i++) {
    calendarDays.push({
      day: i,
      month: "next",
      date: new Date(year, month + 1, i),
    })
  }

  // Format date to YYYY-MM-DD for comparison
  const formatDateForComparison = (date) => {
    return date.toISOString().split("T")[0]
  }

  // Filter tasks
  const filteredTasks = initialTasks.filter((task) => {
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

  // Get tasks for a specific day
  const getTasksForDay = (date) => {
    const dateStr = formatDateForComparison(date)
    return filteredTasks.filter((task) => {
      const taskDate = task.dueDate
      return taskDate === dateStr
    })
  }

  // Handle day click
  const handleDayClick = (day) => {
    setSelectedDate(day.date)
    setSelectedDateTasks(getTasksForDay(day.date))
    setEventDialogOpen(true)
  }

  // Check if a day is today
  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Navigate to previous month
  const prevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  // Navigate to next month
  const nextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium ml-2">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="text-center p-2 font-medium text-sm text-slate-500 dark:text-slate-400">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day, index) => {
          const dayTasks = getTasksForDay(day.date)
          const isCurrentDay = isToday(day.date)

          return (
            <div
              key={index}
              className={`
                border rounded-lg p-1 min-h-[100px] relative cursor-pointer
                ${
                  day.month === "current"
                    ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800/50 text-slate-400 dark:text-slate-500"
                }
                ${isCurrentDay ? "ring-2 ring-violet-500 dark:ring-violet-400" : ""}
              `}
              onClick={() => handleDayClick(day)}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`
                  text-sm font-medium p-1 h-7 w-7 flex items-center justify-center rounded-full
                  ${isCurrentDay ? "bg-violet-500 text-white" : ""}
                `}
                >
                  {day.day}
                </span>

                {day.month === "current" && dayTasks.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedDate(day.date)
                      setSelectedDateTasks(dayTasks)
                      setEventDialogOpen(true)
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Tasks */}
              <div className="mt-1 space-y-1 max-h-[80px] overflow-hidden">
                {dayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className={`
                      text-xs p-1 rounded truncate
                      ${
                        task.completed
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 line-through"
                          : `bg-${task.project.color}-100 dark:bg-${task.project.color}-900/20
                           text-${task.project.color}-700 dark:text-${task.project.color}-300
                           border border-${task.project.color}-200 dark:border-${task.project.color}-800/50`
                      }
                    `}
                    onClick={(e) => {
                      e.stopPropagation()
                      onTaskSelect(task)
                    }}
                  >
                    {task.title}
                  </div>
                ))}

                {dayTasks.length > 3 && (
                  <div className="text-xs text-center text-slate-500 dark:text-slate-400">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>

              {/* Add task button (only visible on hover for current month) */}
              {day.month === "current" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedDate(day.date)
                    setNewTaskOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          )
        })}
      </div>

      {/* Task Dialog */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDate &&
                selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </DialogTitle>
            <DialogDescription>{selectedDateTasks.length} tasks due on this day</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {selectedDateTasks.map((task) => (
              <div
                key={task.id}
                className={`
                  p-3 rounded-lg cursor-pointer
                  ${
                    task.completed
                      ? "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                      : `bg-${task.project.color}-50 dark:bg-${task.project.color}-900/20
                       border border-${task.project.color}-200 dark:border-${task.project.color}-800`
                  }
                `}
                onClick={() => {
                  setEventDialogOpen(false)
                  onTaskSelect(task)
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className={`font-medium ${task.completed ? "line-through text-slate-500 dark:text-slate-400" : ""}`}
                  >
                    {task.title}
                  </h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          setEventDialogOpen(false)
                          onTaskSelect(task)
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Mark as {task.completed ? "Incomplete" : "Complete"}</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="text-sm text-slate-600 dark:text-slate-300">{task.description}</div>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="outline">{task.project.name}</Badge>

                  {task.priority === "high" && (
                    <Badge
                      variant="outline"
                      className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                    >
                      High Priority
                    </Badge>
                  )}
                </div>
              </div>
            ))}

            {selectedDateTasks.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">No tasks due on this day</div>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              className="gap-2 bg-violet-600 hover:bg-violet-700"
              onClick={() => {
                setEventDialogOpen(false)
                setNewTaskOpen(true)
              }}
            >
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Task Dialog */}
      <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Add details for your new task.</DialogDescription>
          </DialogHeader>
          <TaskForm initialDate={selectedDate} onClose={() => setNewTaskOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

