"use client"

import { useState } from "react"
import { CalendarIcon, Plus, X, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function EventForm({
  initialDate = new Date(),
  initialStartTime = null,
  initialEndTime = null,
  onClose,
}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(initialDate)

  // Set default times or use provided times
  const getDefaultStartTime = () => {
    if (initialStartTime) {
      return `${initialStartTime.getHours().toString().padStart(2, "0")}:${initialStartTime.getMinutes().toString().padStart(2, "0")}`
    }
    return "09:00"
  }

  const getDefaultEndTime = () => {
    if (initialEndTime) {
      return `${initialEndTime.getHours().toString().padStart(2, "0")}:${initialEndTime.getMinutes().toString().padStart(2, "0")}`
    } else if (initialStartTime) {
      const endTime = new Date(initialStartTime)
      endTime.setMinutes(endTime.getMinutes() + 30)
      return `${endTime.getHours().toString().padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`
    }
    return "10:00"
  }

  const [startTime, setStartTime] = useState(getDefaultStartTime())
  const [endTime, setEndTime] = useState(getDefaultEndTime())
  const [isAllDay, setIsAllDay] = useState(false)
  const [calendar, setCalendar] = useState("work")
  const [eventType, setEventType] = useState("event") // event, timeblock, meeting, outofoffice
  const [attendees, setAttendees] = useState([])
  const [showAttendeeSearch, setShowAttendeeSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [color, setColor] = useState("violet")
  const [recurrence, setRecurrence] = useState("none") // none, daily, weekly, monthly

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Add attendee
  const addAttendee = (attendee) => {
    if (!attendees.some((a) => a.id === attendee.id)) {
      setAttendees([...attendees, attendee])
    }
    setSearchQuery("")
  }

  // Remove attendee
  const removeAttendee = (attendeeId) => {
    setAttendees(attendees.filter((a) => a.id !== attendeeId))
  }

  // Filter team members based on search query
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) && !attendees.some((a) => a.id === member.id),
  )

  // Handle event type change
  const handleEventTypeChange = (type) => {
    setEventType(type)

    // Set default color based on type
    switch (type) {
      case "event":
        setColor("violet")
        break
      case "timeblock":
        setColor("green")
        break
      case "meeting":
        setColor("blue")
        break
      case "outofoffice":
        setColor("amber")
        break
      default:
        setColor("violet")
    }
  }

  return (
    <div className="space-y-4 py-2">
      <Tabs value={eventType} onValueChange={handleEventTypeChange} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="event">Event</TabsTrigger>
          <TabsTrigger value="timeblock">Time Block</TabsTrigger>
          <TabsTrigger value="meeting">Meeting</TabsTrigger>
          <TabsTrigger value="outofoffice">Out of Office</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder={eventType === "timeblock" ? "Focus Time: Project Name" : "Add title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
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
          <div className="flex items-center justify-between">
            <Label>All Day</Label>
            <Switch checked={isAllDay} onCheckedChange={setIsAllDay} />
          </div>

          {!isAllDay && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="start-time" className="sr-only">
                  Start Time
                </Label>
                <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="end-time" className="sr-only">
                  End Time
                </Label>
                <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder={eventType === "timeblock" ? "What will you focus on during this time?" : "Add description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="calendar">Calendar</Label>
          <Select value={calendar} onValueChange={setCalendar}>
            <SelectTrigger id="calendar">
              <SelectValue placeholder="Select calendar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                  Work
                </div>
              </SelectItem>
              <SelectItem value="personal">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  Personal
                </div>
              </SelectItem>
              <SelectItem value="family">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  Family
                </div>
              </SelectItem>
              <SelectItem value="focus">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  Focus Time
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recurrence">Repeats</Label>
          <Select value={recurrence} onValueChange={setRecurrence}>
            <SelectTrigger id="recurrence">
              <SelectValue placeholder="Does not repeat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Does not repeat</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="custom">Custom...</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {eventType !== "timeblock" && (
        <div className="space-y-2">
          <Label>Attendees</Label>

          {attendees.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {attendees.map((attendee) => (
                <Badge key={attendee.id} variant="secondary" className="flex items-center gap-1">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={attendee.avatar} alt={attendee.name} />
                    <AvatarFallback className="text-[8px]">
                      {attendee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{attendee.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeAttendee(attendee.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {showAttendeeSearch ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={() => setShowAttendeeSearch(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {searchQuery && (
                <div className="border rounded-md max-h-40 overflow-y-auto">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        onClick={() => addAttendee(member)}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{member.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{member.role}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-center text-sm text-slate-500 dark:text-slate-400">No results found</div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => setShowAttendeeSearch(true)}
            >
              <Plus className="h-4 w-4" />
              Add Attendees
            </Button>
          )}
        </div>
      )}

      {eventType === "timeblock" && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-300">Time Blocking</h4>
              <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                Protect your focus time by blocking out distractions. Time blocks appear differently on your calendar
                and can be used to schedule deep work.
              </p>
            </div>
          </div>
        </div>
      )}

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-violet-600 hover:bg-violet-700">
          {eventType === "timeblock" ? "Create Time Block" : "Create Event"}
        </Button>
      </DialogFooter>
    </div>
  )
}

