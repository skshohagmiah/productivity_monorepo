"use client"

import { useState } from "react"
import { Calendar, Clock, MoreHorizontal, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
    description: "Daily team standup to discuss progress and blockers.",
  },
  {
    id: 2,
    title: "Client Call: Acme Corp",
    start: "2023-10-16T15:30:00",
    end: "2023-10-16T16:00:00",
    calendar: "work",
    color: "blue",
    attendees: [{ id: 4, name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" }],
    description: "Discuss the new project requirements and timeline.",
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
    description: "Quarterly product planning session to define roadmap.",
  },
  {
    id: 4,
    title: "Dentist Appointment",
    start: "2023-10-18T14:00:00",
    end: "2023-10-18T15:00:00",
    calendar: "personal",
    color: "amber",
    description: "Regular checkup with Dr. Smith.",
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
    description: "Review the latest mockups for the website redesign.",
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
    description: "Team bonding lunch at the new Italian restaurant.",
  },
  {
    id: 7,
    title: "Mom's Birthday",
    start: "2023-10-22T00:00:00",
    end: "2023-10-22T23:59:59",
    calendar: "family",
    color: "red",
    allDay: true,
    description: "Don't forget to call and send flowers!",
  },
  {
    id: 8,
    title: "Quarterly Review",
    start: "2023-10-25T09:00:00",
    end: "2023-10-25T11:00:00",
    calendar: "work",
    color: "blue",
    attendees: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 5, name: "Alex Wong", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    description: "Quarterly performance review with the team.",
  },
  {
    id: 9,
    title: "Marketing Campaign Launch",
    start: "2023-10-27T10:00:00",
    end: "2023-10-27T11:00:00",
    calendar: "work",
    color: "violet",
    attendees: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 3, name: "Emma Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    description: "Launch the Q4 marketing campaign.",
  },
]

export default function AgendaView({ currentDate }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [newEventOpen, setNewEventOpen] = useState(false)

  // Get events for the next 14 days
  const getUpcomingEvents = (startDate) => {
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 14)

    return events
      .filter((event) => {
        const eventDate = new Date(event.start)
        return eventDate >= startDate && eventDate <= endDate
      })
      .sort((a, b) => new Date(a.start) - new Date(b.start))
  }

  const upcomingEvents = getUpcomingEvents(currentDate)

  // Group events by date
  const groupEventsByDate = (events) => {
    const grouped = {}

    events.forEach((event) => {
      const date = new Date(event.start).toISOString().split("T")[0]
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(event)
    })

    return grouped
  }

  const groupedEvents = groupEventsByDate(upcomingEvents)

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Check if a date is today
  const isToday = (dateStr) => {
    const today = new Date()
    const date = new Date(dateStr)
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="h-full p-4 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {Object.keys(groupedEvents).length > 0 ? (
          Object.keys(groupedEvents).map((date) => (
            <div key={date} className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{isToday(date) ? "Today" : formatDate(date)}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{groupedEvents[date].length} events</p>
                </div>
              </div>

              <div className="space-y-4 ml-16">
                {groupedEvents[date].map((event) => (
                  <div
                    key={event.id}
                    className={`
                      p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow
                      bg-${event.color}-50 dark:bg-${event.color}-900/20
                      border-${event.color}-200 dark:border-${event.color}-800
                    `}
                    onClick={() => {
                      setSelectedEvent(event)
                      setEventDialogOpen(true)
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className={`font-medium text-${event.color}-700 dark:text-${event.color}-300`}>
                          {event.title}
                        </h4>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.allDay ? (
                            <Badge variant="outline">All Day</Badge>
                          ) : (
                            <>
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
                            </>
                          )}
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {event.description && (
                      <p className="text-sm mt-2 text-slate-600 dark:text-slate-300">{event.description}</p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <Badge
                        variant="outline"
                        className={`
                        text-${event.color}-700 dark:text-${event.color}-300
                        border-${event.color}-200 dark:border-${event.color}-800
                      `}
                      >
                        {event.calendar}
                      </Badge>

                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-slate-400" />
                          <div className="flex -space-x-2">
                            {event.attendees.slice(0, 3).map((attendee) => (
                              <Avatar key={attendee.id} className="h-5 w-5 border border-white dark:border-slate-800">
                                <AvatarImage src={attendee.avatar} alt={attendee.name} />
                                <AvatarFallback className="text-[8px]">
                                  {attendee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {event.attendees.length > 3 && (
                              <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px]">
                                +{event.attendees.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              You don't have any events scheduled for the next 14 days.
            </p>
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700" onClick={() => setNewEventOpen(true)}>
              Schedule an Event
            </Button>
          </div>
        )}
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
                    {selectedEvent.allDay ? (
                      <Badge variant="outline">All Day</Badge>
                    ) : (
                      <>
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
                      </>
                    )}
                  </span>
                </div>

                {selectedEvent.description && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{selectedEvent.description}</p>
                  </div>
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
          <EventForm onClose={() => setNewEventOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

