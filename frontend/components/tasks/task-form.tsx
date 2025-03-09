"use client"

import { useState } from "react"
import { CalendarIcon, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Lead",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Designer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Content Writer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Alex Wong",
    role: "Project Manager",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function TaskForm({
  initialDate = new Date(),
  initialStatus = "to-do",
  onClose,
  projects = [],
  tags = [],
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(initialDate)
  const [priority, setPriority] = useState("medium")
  const [status, setStatus] = useState(initialStatus)
  const [project, setProject] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [assignee, setAssignee] = useState(null)
  const [subtasks, setSubtasks] = useState([{ id: 1, title: "", completed: false }])

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Add subtask
  const addSubtask = () => {
    setSubtasks([...subtasks, { id: subtasks.length + 1, title: "", completed: false }])
  }

  // Update subtask
  const updateSubtask = (id, title) => {
    setSubtasks(subtasks.map((subtask) => (subtask.id === id ? { ...subtask, title } : subtask)))
  }

  // Remove subtask
  const removeSubtask = (id) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id))
  }

  // Toggle tag selection
  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input id="title" placeholder="Add title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Add description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(date)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  Low
                </div>
              </SelectItem>
              <SelectItem value="medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  Medium
                </div>
              </SelectItem>
              <SelectItem value="high">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  High
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="project">Project</Label>
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger id="project">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <SelectItem key={project.id} value={project.id.toString()}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${project.color}-500`}></div>
                      {project.name}
                    </div>
                  </SelectItem>
                ))
              ) : (
                <>
                  <SelectItem value="personal">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                      Personal
                    </div>
                  </SelectItem>
                  <SelectItem value="work">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      Work
                    </div>
                  </SelectItem>
                  <SelectItem value="website-redesign">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      Website Redesign
                    </div>
                  </SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="backlog">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                  Backlog
                </div>
              </SelectItem>
              <SelectItem value="to-do">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  To Do
                </div>
              </SelectItem>
              <SelectItem value="in-progress">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  In Progress
                </div>
              </SelectItem>
              <SelectItem value="done">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  Done
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Badge
                key={tag.id}
                variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                className={`
                  cursor-pointer
                  ${
                    selectedTags.includes(tag.id)
                      ? `bg-${tag.color}-500 hover:bg-${tag.color}-600`
                      : `text-${tag.color}-600 dark:text-${tag.color}-400 border-${tag.color}-200 dark:border-${tag.color}-800`
                  }
                `}
                onClick={() => toggleTag(tag.id)}
              >
                {tag.name}
              </Badge>
            ))
          ) : (
            <>
              <Badge
                variant={selectedTags.includes(1) ? "default" : "outline"}
                className={`cursor-pointer ${selectedTags.includes(1) ? "bg-red-500 hover:bg-red-600" : "text-red-600 dark:text-red-400"}`}
                onClick={() => toggleTag(1)}
              >
                Urgent
              </Badge>
              <Badge
                variant={selectedTags.includes(2) ? "default" : "outline"}
                className={`cursor-pointer ${selectedTags.includes(2) ? "bg-amber-500 hover:bg-amber-600" : "text-amber-600 dark:text-amber-400"}`}
                onClick={() => toggleTag(2)}
              >
                Important
              </Badge>
              <Badge
                variant={selectedTags.includes(3) ? "default" : "outline"}
                className={`cursor-pointer ${selectedTags.includes(3) ? "bg-blue-500 hover:bg-blue-600" : "text-blue-600 dark:text-blue-400"}`}
                onClick={() => toggleTag(3)}
              >
                In Progress
              </Badge>
              <Badge
                variant={selectedTags.includes(4) ? "default" : "outline"}
                className={`cursor-pointer ${selectedTags.includes(4) ? "bg-slate-500 hover:bg-slate-600" : "text-slate-600 dark:text-slate-400"}`}
                onClick={() => toggleTag(4)}
              >
                Blocked
              </Badge>
              <Badge
                variant={selectedTags.includes(5) ? "default" : "outline"}
                className={`cursor-pointer ${selectedTags.includes(5) ? "bg-green-500 hover:bg-green-600" : "text-green-600 dark:text-green-400"}`}
                onClick={() => toggleTag(5)}
              >
                Low Priority
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Assignee</Label>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger>
                <SelectValue placeholder="Assign to..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs">
                      ?
                    </div>
                    Unassigned
                  </div>
                </SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {member.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Subtasks</Label>
          <Button variant="outline" size="sm" className="h-7 px-2 gap-1" onClick={addSubtask}>
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-2">
              <Checkbox
                id={`subtask-${subtask.id}`}
                checked={subtask.completed}
                onCheckedChange={(checked) => {
                  setSubtasks(subtasks.map((st) => (st.id === subtask.id ? { ...st, completed: checked } : st)))
                }}
              />
              <Input
                placeholder="Subtask title"
                value={subtask.title}
                onChange={(e) => updateSubtask(subtask.id, e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeSubtask(subtask.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-violet-600 hover:bg-violet-700">Create Task</Button>
      </DialogFooter>
    </div>
  )
}

