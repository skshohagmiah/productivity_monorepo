"use client"

import { useState } from "react"
import { CheckCircle, Clock, Filter, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    title: "Finalize Q4 Marketing Plan",
    description: "Complete the draft and send for review",
    priority: "high",
    completed: false,
    dueDate: "Today",
    project: "Marketing",
    tags: ["strategy", "q4"],
  },
  {
    id: 2,
    title: "Review website redesign mockups",
    description: "Provide feedback on the new homepage design",
    priority: "medium",
    completed: false,
    dueDate: "Today",
    project: "Website Redesign",
    tags: ["design", "feedback"],
  },
  {
    id: 3,
    title: "Prepare for client meeting",
    description: "Gather materials and create agenda",
    priority: "high",
    completed: false,
    dueDate: "Tomorrow",
    project: "Client Projects",
    tags: ["meeting", "prep"],
  },
  {
    id: 4,
    title: "Update team documentation",
    description: "Add new processes and update existing ones",
    priority: "low",
    completed: false,
    dueDate: "Oct 20",
    project: "Internal",
    tags: ["docs"],
  },
  {
    id: 5,
    title: "Send weekly newsletter",
    description: "Finalize content and schedule for delivery",
    priority: "medium",
    completed: true,
    dueDate: "Completed",
    project: "Marketing",
    tags: ["email", "content"],
  },
  {
    id: 6,
    title: "Research competitor products",
    description: "Analyze features and pricing",
    priority: "medium",
    completed: true,
    dueDate: "Completed",
    project: "Product",
    tags: ["research", "competitive"],
  },
]

// Project data
const projects = [
  { id: 1, name: "Marketing", color: "violet" },
  { id: 2, name: "Website Redesign", color: "indigo" },
  { id: 3, name: "Client Projects", color: "blue" },
  { id: 4, name: "Product", color: "green" },
  { id: 5, name: "Internal", color: "amber" },
]

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState("all") // all, today, completed

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed, dueDate: !task.completed ? "Completed" : task.dueDate }
          : task,
      ),
    )
  }

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "today") return task.dueDate === "Today" && !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  // Calculate completion percentage
  const completionPercentage = Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100)

  // Get project color
  const getProjectColor = (projectName) => {
    const project = projects.find((p) => p.name === projectName)
    return project ? project.color : "slate"
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-medium">Tasks</h2>
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
                filter === "today"
                  ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                  : ""
              }
              onClick={() => setFilter("today")}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={
                filter === "completed"
                  ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                  : ""
              }
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>

        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700" size="sm">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Task Progress */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Task Progress</h3>
            <Badge variant="outline" className="text-slate-500 dark:text-slate-400">
              {tasks.filter((task) => task.completed).length} of {tasks.length} completed
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2">
            <div className="h-full bg-violet-600 rounded-full" />
          </Progress>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle>Task List</CardTitle>
            <Input type="search" placeholder="Search tasks..." className="max-w-xs" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mt-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border rounded-lg ${
                  task.completed
                    ? "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-full border ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : task.priority === "high"
                          ? "border-red-500"
                          : task.priority === "medium"
                            ? "border-amber-500"
                            : "border-slate-300 dark:border-slate-600"
                    }`}
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    {task.completed && <CheckCircle className="h-5 w-5" />}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4
                          className={`font-medium ${task.completed ? "line-through text-slate-500 dark:text-slate-400" : ""}`}
                        >
                          {task.title}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{task.description}</p>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleTaskCompletion(task.id)}>
                            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Badge
                        variant="outline"
                        className={`bg-${getProjectColor(task.project)}-100 dark:bg-${getProjectColor(task.project)}-900/20 text-${getProjectColor(task.project)}-600 dark:text-${getProjectColor(task.project)}-400 border-${getProjectColor(task.project)}-200 dark:border-${getProjectColor(task.project)}-800`}
                      >
                        {task.project}
                      </Badge>

                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}

                      <div className="ml-auto flex items-center gap-2">
                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {task.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                  <CheckCircle className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  {filter === "all"
                    ? "You don't have any tasks yet."
                    : filter === "today"
                      ? "You don't have any tasks due today."
                      : "You don't have any completed tasks."}
                </p>
                <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

