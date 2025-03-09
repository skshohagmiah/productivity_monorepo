"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { DialogFooter } from "@/components/ui/dialog"

export default function NoteProperties({ note, onUpdate }) {
  const [properties, setProperties] = useState(note.properties || {})

  // Handle property change
  const handlePropertyChange = (key, value) => {
    setProperties({
      ...properties,
      [key]: value,
    })
  }

  // Format date for display
  const formatDate = (date) => {
    if (!date) return ""
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={properties.status || "Draft"} onValueChange={(value) => handlePropertyChange("status", value)}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="In Review">In Review</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={properties.priority || "Medium"}
          onValueChange={(value) => handlePropertyChange("priority", value)}
        >
          <SelectTrigger id="priority">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <Calendar className="mr-2 h-4 w-4" />
              {properties.dueDate ? formatDate(properties.dueDate) : "No date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            {/* This would be a calendar component in a real app */}
            <div className="p-4">
              <Input
                type="date"
                value={properties.dueDate || ""}
                onChange={(e) => handlePropertyChange("dueDate", e.target.value)}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          placeholder="Add URL"
          value={properties.url || ""}
          onChange={(e) => handlePropertyChange("url", e.target.value)}
        />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onUpdate(properties)}>
          Update Properties
        </Button>
      </DialogFooter>
    </div>
  )
}

