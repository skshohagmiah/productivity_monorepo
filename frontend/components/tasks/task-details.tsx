"use client"

import { useState } from "react"
import { Calendar, CheckCircle, Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TaskDetails({ task, onClose, projects = [], tags = [] }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || "")
  const [newSubtask, setNewSubtask] = useState("")
  const [subtasks, setSubtasks] = useState(task.subtasks || [])

  // Toggle subtask completion
  const toggleSubtaskCompletion = (subtaskId) => {
    setSubtasks(
      subtasks.map((subtask) => (subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask)),
    )
  }

  // Add new subtask
  const addSubtask = () => {
    if (newSubtask.trim() === "") return

    setSubtasks([
      ...subtasks,
      {
        id: Date.now(),
        title: newSubtask,
        completed: false,
      },
    ])
    setNewSubtask("")
  }

  // Delete subtask
  const deleteSubtask = (subtaskId) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId))
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
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    }
  }

  // Check if a task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    const today = new Date().toISOString().split("T")[0]
    return dueDate < today
  }

  // Calculate subtask completion percentage
  const completionPercentage =
    subtasks.length > 0 ? Math.round((subtasks.filter((st) => st.completed).length / subtasks.length) * 100) : 0

  return (
    <>
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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

            <Badge
              variant="outline"
              className={`
                ${
                  task.priority === "high"
                    ? "text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                    : task.priority === "medium"
                      ? "text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                      : "text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                }
              `}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? "Cancel Editing" : "Edit Task"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as {task.completed ? "Incomplete" : "Complete"}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                <Trash className="h-4 w-4 mr-2" />
                Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isEditing ? (
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="text-xl font-bold mt-2" />
        ) : (
          <DialogTitle
            className={`text-xl mt-2 ${task.completed ? "line-through text-slate-500 dark:text-slate-400" : ""}`}
          >
            {task.title}
          </DialogTitle>
        )}
      </DialogHeader>

      <Tabs defaultValue="details" className="mt-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="subtasks">
            Subtasks
            {subtasks.length > 0 && (
              <Badge className="ml-2" variant="secondary">
                {subtasks.filter((st) => st.completed).length}/{subtasks.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            {isEditing ? (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Add a description..."
              />
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {task.description || "No description provided."}
              </p>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Due Date</h3>
              <div
                className={`
                flex items-center text-sm
                ${
                  isOverdue(task.dueDate) && !task.completed
                    ? "text-red-600 dark:text-red-400"
                    : "text-slate-600 dark:text-slate-300"
                }
              `}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(task.dueDate)}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Status</h3>
              <Badge
                variant="outline"
                className={`
                  ${
                    task.status === "backlog"
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      : task.status === "to-do"
                        ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : task.status === "in-progress"
                          ? "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                          : "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                  }
                `}
              >
                {task.status === "backlog"
                  ? "Backlog"
                  : task.status === "to-do"
                    ? "To Do"
                    : task.status === "in-progress"
                      ? "In Progress"
                      : "Done"}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2">Assignee</h3>
            {task.assignee ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback>
                    {task.assignee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-600 dark:text-slate-300">{task.assignee.name}</span>
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No assignee</p>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            {task.tags && task.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
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
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">No tags</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="subtasks" className="space-y-4 mt-4">
          {subtasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Progress</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2">
                <div className="h-full bg-violet-600 rounded-full" />
              </Progress>
            </div>
          )}

          <div className="space-y-2">
            {subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-start gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Checkbox
                  id={`subtask-${subtask.id}`}
                  checked={subtask.completed}
                  onCheckedChange={() => toggleSubtaskCompletion(subtask.id)}
                  className="mt-0.5"
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor={`subtask-${subtask.id}`}
                    className={`text-sm ${subtask.completed ? "line-through text-slate-500 dark:text-slate-400" : ""}`}
                  >
                    {subtask.title}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  onClick={() => deleteSubtask(subtask.id)}
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Input
              placeholder="Add a subtask..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addSubtask()
                }
              }}
              className="flex-1"
            />
            <Button variant="outline" size="icon" onClick={addSubtask}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 mt-6">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700">Save Changes</Button>
          </>
        ) : (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </>
  )
}

