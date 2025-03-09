"use client"

import { useState, useRef, useEffect } from "react"
import { Clock, MoreHorizontal, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import EventForm from "@/components/calendar/event-form"

// Mock data for calendar events
const events = [
  {
    id: 1,
    title: "Team Standup",
    start: "2023-10-16T10:00:00",
    end: "2023-10-16T10:30:00",
    calendar: "work",
    color: "violet",
    attendees: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 3, name: "Emma Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 2,
    title: "Client Call: Acme Corp",
    start: "2023-10-16T15:30:00",
    end: "2023-10-16T16:00:00",
    calendar: "work",
    color: "blue",
    attendees: [{ id: 4, name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" }],
  },
  {
    id: 3,
    title: "Product Planning",
    start: "2023-10-17T11:00:00",
    end: "2023-10-17T12:00:00",
    calendar: "work",
    color: "green",
    attendees: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 5, name: "Alex Wong", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 4,
    title: "Dentist Appointment",
    start: "2023-10-18T14:00:00",
    end: "2023-10-18T15:00:00",
    calendar: "personal",
    color: "amber",
  },
  {
    id: 5,
    title: "Website Redesign Review",
    start: "2023-10-19T13:00:00",
    end: "2023-10-19T14:30:00",
    calendar: "work",
    color: "pink",
    attendees: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 5, name: "Alex Wong", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 6,
    title: "Team Lunch",
    start: "2023-10-20T12:00:00",
    end: "2023-10-20T13:30:00",
    calendar: "work",
    color: "indigo",
    attendees: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 3, name: "Emma Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 4, name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 5, name: "Alex Wong", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 7,
    title: "Focus Time: Project Proposal",
    start: "2023-10-17T14:00:00",
    end: "2023-10-17T16:00:00",
    calendar: "focus",
    color: "green",
    isTimeBlock: true,
  },
  {
    id: 8,
    title: "Deep Work: Documentation",
    start: "2023-10-18T09:00:00",
    end: "2023-10-18T11:30:00",
    calendar: "focus",
    color: "amber",
    isTimeBlock: true,
  },
  {
    id: 9,
    title: "Learning: New Framework",
    start: "2023-10-19T15:00:00",
    end: "2023-10-19T17:00:00",
    calendar: "focus",
    color: "blue",
    isTimeBlock: true,
  },
]

// Time slots for the week view
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12
  const ampm = i < 12 ? "AM" : "PM"
  return `${hour}:00 ${ampm}`
})

export default function WeekView({ currentDate }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [newEventOpen, setNewEventOpen] = useState(false)
  const [draggedEvent, setDraggedEvent] = useState(null)
  const [tempEvent, setTempEvent] = useState(null)
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  const [creationStart, setCreationStart] = useState(null)
  const [creationEnd, setCreationEnd] = useState(null)
  const [localEvents, setLocalEvents] = useState([...events])
  const gridRef = useRef(null)

  // Get the start of the week (Sunday)
  const getStartOfWeek = (date) => {
    const result = new Date(date)
    const day = date.getDay()
    result.setDate(date.getDate() - day)
    return result
  }

  // Get days of the week
  const getDaysOfWeek = (startDate) => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  const startOfWeek = getStartOfWeek(currentDate)
  const daysOfWeek = getDaysOfWeek(startOfWeek)

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    })
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

  // Get events for a specific day
  const getEventsForDay = (date) => {
    const dateStr = date.toISOString().split("T")[0]
    return localEvents.filter((event) => {
      const eventDate = new Date(event.start).toISOString().split("T")[0]
      return eventDate === dateStr
    })
  }

  // Helper function to determine event position and height in the calendar
  const getEventStyle = (event) => {
    const startTime = new Date(event.start)
    const endTime = new Date(event.end)

    const startHour = startTime.getHours() + startTime.getMinutes() / 60
    const endHour = endTime.getHours() + endTime.getMinutes() / 60

    const top = startHour * 60
    const height = (endHour - startHour) * 60

    const baseStyle = {
      top: `${top}px`,
      height: `${height}px`,
    }

    if (event.isTimeBlock) {
      return {
        ...baseStyle,
        backgroundColor: `var(--${event.color}-100)`,
        borderLeft: `3px solid var(--${event.color}-500)`,
        color: `var(--${event.color}-700)`,
        opacity: 0.8,
      }
    }

    return {
      ...baseStyle,
      backgroundColor: `var(--${event.color}-50)`,
      borderLeft: `3px solid var(--${event.color}-500)`,
      color: `var(--${event.color}-700)`,
    }
  }

  // Handle mouse down on grid to start creating an event
  const handleGridMouseDown = (e, day) => {
    if (e.button !== 0) return // Only left mouse button

    const gridRect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - gridRect.top

    // Calculate time from y position
    const hour = Math.floor(y / 60)
    const minute = Math.floor((y % 60) / 15) * 15

    const startTime = new Date(day)
    startTime.setHours(hour, minute, 0, 0)

    setCreationStart(startTime)
    setIsCreatingEvent(true)
  }

  // Handle mouse move on grid while creating an event
  const handleGridMouseMove = (e, day) => {
    if (!isCreatingEvent || !creationStart) return

    const gridRect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - gridRect.top

    // Calculate time from y position
    const hour = Math.floor(y / 60)
    const minute = Math.floor((y % 60) / 15) * 15

    const endTime = new Date(day)
    endTime.setHours(hour, minute, 0, 0)

    // Ensure end time is after start time
    if (endTime < creationStart) {
      endTime.setTime(creationStart.getTime() + 30 * 60000) // Add 30 minutes
    }

    setCreationEnd(endTime)

    // Create temporary event for visual feedback
    setTempEvent({
      id: "temp",
      title: "New Event",
      start: creationStart.toISOString(),
      end: endTime.toISOString(),
      color: "violet",
      isTemp: true,
    })
  }

  // Handle mouse up to finish creating an event
  const handleGridMouseUp = () => {
    if (isCreatingEvent && creationStart && creationEnd) {
      // Open event form with pre-filled dates
      setNewEventOpen(true)
    }

    setIsCreatingEvent(false)
    setTempEvent(null)
  }

  // Handle drag start for events
  const handleDragStart = (e, event) => {
    e.stopPropagation()
    setDraggedEvent(event)
    e.dataTransfer.setData("text/plain", event.id)

    // Create ghost image
    const ghost = document.createElement("div")
    ghost.classList.add("invisible")
    document.body.appendChild(ghost)
    e.dataTransfer.setDragImage(ghost, 0, 0)
  }

  // Handle drag over for time slots
  const handleDragOver = (e, day, hour) => {
    e.preventDefault()
    if (!draggedEvent) return

    const newDate = new Date(day)
    newDate.setHours(hour, 0, 0, 0)

    // Calculate duration of original event
    const originalStart = new Date(draggedEvent.start)
    const originalEnd = new Date(draggedEvent.end)
    const duration = originalEnd.getTime() - originalStart.getTime()

    // Create new end time
    const newEnd = new Date(newDate.getTime() + duration)

    // Update temp event for visual feedback
    setTempEvent({
      ...draggedEvent,
      start: newDate.toISOString(),
      end: newEnd.toISOString(),
      isTemp: true,
    })
  }

  // Handle drop to finalize event move
  const handleDrop = (e, day, hour) => {
    e.preventDefault()
    if (!draggedEvent || !tempEvent) return

    // Update the event in the local state
    const updatedEvents = localEvents.map((event) => {
      if (event.id === draggedEvent.id) {
        return {
          ...event,
          start: tempEvent.start,
          end: tempEvent.end,
        }
      }
      return event
    })

    setLocalEvents(updatedEvents)
    setDraggedEvent(null)
    setTempEvent(null)
  }

  // Handle drag end to clean up
  const handleDragEnd = () => {
    setDraggedEvent(null)
    setTempEvent(null)
  }

  // Clean up mouse events when component unmounts
  useEffect(() => {
    const handleMouseUp = () => {
      setIsCreatingEvent(false)
      setTempEvent(null)
    }

    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="h-full p-4">
      <div className="flex h-full">
        {/* Time Labels */}
        <div className="w-16 flex-shrink-0">
          <div className="h-12"></div> {/* Empty space for day headers */}
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className="h-12 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Week Grid */}
        <div className="flex-1 overflow-auto" ref={gridRef}>
          <div className="grid grid-cols-7 h-full">
            {/* Day Headers */}
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className={`
                  h-12 border-b border-slate-200 dark:border-slate-800 p-2 text-center
                  ${isToday(day) ? "bg-violet-50 dark:bg-violet-900/20" : ""}
                `}
              >
                <div className="text-sm font-medium">{formatDate(day).split(",")[0]}</div>
                <div
                  className={`
                  text-xs 
                  ${isToday(day) ? "text-violet-600 dark:text-violet-400" : "text-slate-500 dark:text-slate-400"}
                `}
                >
                  {day.getDate()}
                </div>
              </div>
            ))}

            {/* Time Grid */}
            {daysOfWeek.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="relative border-r border-slate-200 dark:border-slate-800"
                onMouseDown={(e) => handleGridMouseDown(e, day)}
                onMouseMove={(e) => handleGridMouseMove(e, day)}
                onMouseUp={handleGridMouseUp}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Hour grid lines */}
                {timeSlots.map((_, index) => (
                  <div
                    key={index}
                    className="absolute left-0 right-0 border-t border-slate-200 dark:border-slate-800"
                    style={{ top: `${index * 60}px`, height: "60px" }}
                    onDragOver={(e) => handleDragOver(e, day, index)}
                    onDrop={(e) => handleDrop(e, day, index)}
                  />
                ))}

                {/* 30-minute grid lines (lighter) */}
                {timeSlots.map((_, index) => (
                  <div
                    key={`half-${index}`}
                    className="absolute left-0 right-0 border-t border-slate-100 dark:border-slate-800/50"
                    style={{ top: `${index * 60 + 30}px`, height: "30px" }}
                  />
                ))}

                {/* 15-minute grid lines (dotted) */}
                {Array.from({ length: timeSlots.length * 4 }).map(
                  (_, index) =>
                    index % 2 !== 0 && (
                      <div
                        key={`quarter-${index}`}
                        className="absolute left-0 right-0 border-t border-dotted border-slate-100 dark:border-slate-800/30"
                        style={{ top: `${Math.floor(index / 2) * 60 + (index % 2) * 30}px`, height: "15px" }}
                      />
                    ),
                )}

                {/* Events */}
                {getEventsForDay(day).map((event) => (
                  <div
                    key={event.id}
                    className={`
                      absolute left-1 right-1 rounded-md p-2 border border-slate-200 dark:border-slate-700 
                      hover:shadow-md transition-shadow cursor-pointer overflow-hidden
                      ${event.isTimeBlock ? "border-dashed" : ""}
                    `}
                    style={getEventStyle(event)}
                    onClick={() => {
                      setSelectedEvent(event)
                      setEventDialogOpen(true)
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, event)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex items-start justify-between">
                      <div className="truncate">
                        <h4 className="font-medium text-xs truncate">{event.title}</h4>
                        <p className="text-xs opacity-80 truncate">
                          {new Date(event.start).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}{" "}
                          -{" "}
                          {new Date(event.end).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-50 hover:opacity-100">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          {event.isTimeBlock ? (
                            <DropdownMenuItem>Convert to Event</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>Convert to Time Block</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {event.attendees && event.attendees.length > 0 && (
                      <div className="mt-1 flex items-center gap-1">
                        <Users className="h-3 w-3 opacity-70" />
                        <div className="flex -space-x-1">
                          {event.attendees.slice(0, 3).map((attendee) => (
                            <Avatar key={attendee.id} className="h-4 w-4 border border-white dark:border-slate-800">
                              <AvatarImage src={attendee.avatar} alt={attendee.name} />
                              <AvatarFallback className="text-[6px]">
                                {attendee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {event.attendees.length > 3 && (
                            <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[6px]">
                              +{event.attendees.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Temporary event being created or dragged */}
                {tempEvent && new Date(tempEvent.start).toDateString() === day.toDateString() && (
                  <div
                    className="absolute left-1 right-1 rounded-md p-2 border-2 border-dashed border-violet-400 
                              bg-violet-50 dark:bg-violet-900/20 opacity-70 overflow-hidden"
                    style={getEventStyle(tempEvent)}
                  >
                    <div className="truncate">
                      <h4 className="font-medium text-xs truncate">{tempEvent.title}</h4>
                      <p className="text-xs opacity-80 truncate">
                        {new Date(tempEvent.start).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}{" "}
                        -{" "}
                        {new Date(tempEvent.end).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {/* Current time indicator */}
                {isToday(day) && (
                  <div
                    className="absolute left-0 right-0 border-t-2 border-red-500 z-10"
                    style={{
                      top: `${(new Date().getHours() + new Date().getMinutes() / 60) * 60}px`,
                    }}
                  >
                    <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-red-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Add Menu */}
      <div className="fixed bottom-6 right-6 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-full shadow-lg bg-violet-600 hover:bg-violet-700">
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => setNewEventOpen(true)}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                <span>New Event</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Pre-fill form for time block
                setNewEventOpen(true)
                // We would set a state to indicate this is a time block
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Focus Time Block</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Meeting</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span>Out of Office</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Event Dialog */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className={`text-${selectedEvent.color}-700 dark:text-${selectedEvent.color}-400`}>
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription>
                  {new Date(selectedEvent.start).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(selectedEvent.start).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {new Date(selectedEvent.end).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>

                {selectedEvent.isTimeBlock && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Time Block
                  </Badge>
                )}

                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Attendees</h4>
                    <div className="space-y-2">
                      {selectedEvent.attendees.map((attendee) => (
                        <div key={attendee.id} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={attendee.avatar} alt={attendee.name} />
                            <AvatarFallback>
                              {attendee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{attendee.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive">Cancel Event</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* New Event Dialog */}
      <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>Add details for your new calendar event.</DialogDescription>
          </DialogHeader>
          <EventForm
            initialDate={currentDate}
            initialStartTime={creationStart}
            initialEndTime={creationEnd}
            onClose={() => {
              setNewEventOpen(false)
              setCreationStart(null)
              setCreationEnd(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Keyboard shortcuts tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="fixed bottom-6 left-6 z-10 opacity-70 hover:opacity-100">
              Keyboard Shortcuts
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Calendar Shortcuts</h4>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <div>Click + drag</div>
                <div>Create new event</div>
                <div>Drag event</div>
                <div>Reschedule</div>
                <div>Press 'c'</div>
                <div>Create new event</div>
                <div>Press 't'</div>
                <div>Jump to today</div>
                <div>Press '1-4'</div>
                <div>Switch views</div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

