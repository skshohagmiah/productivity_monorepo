"use client"

import { useState } from "react"
import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  },
  {
    id: 2,
    title: "Client Call: Acme Corp",
    start: "2023-10-16T15:30:00",
    end: "2023-10-16T16:00:00",
    calendar: "work",
    color: "blue",
  },
  {
    id: 3,
    title: "Product Planning",
    start: "2023-10-17T11:00:00",
    end: "2023-10-17T12:00:00",
    calendar: "work",
    color: "green",
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
  },
  {
    id: 6,
    title: "Team Lunch",
    start: "2023-10-20T12:00:00",
    end: "2023-10-20T13:30:00",
    calendar: "work",
    color: "indigo",
  },
  {
    id: 7,
    title: "Mom's Birthday",
    start: "2023-10-22T00:00:00",
    end: "2023-10-22T23:59:59",
    calendar: "family",
    color: "red",
    allDay: true,
  },
  {
    id: 8,
    title: "Quarterly Review",
    start: "2023-10-25T09:00:00",
    end: "2023-10-25T11:00:00",
    calendar: "work",
    color: "blue",
  },
  {
    id: 9,
    title: "Marketing Campaign Launch",
    start: "2023-10-27T10:00:00",
    end: "2023-10-27T11:00:00",
    calendar: "work",
    color: "violet",
  },
]

export default function MonthView({ currentDate }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvents, setSelectedEvents] = useState([])
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [newEventOpen, setNewEventOpen] = useState(false)

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

  // Get events for a specific day
  const getEventsForDay = (date) => {
    const dateStr = formatDateForComparison(date)
    return events.filter((event) => {
      const eventDate = formatDateForComparison(new Date(event.start))
      return eventDate === dateStr
    })
  }

  // Handle day click
  const handleDayClick = (day) => {
    setSelectedDate(day.date)
    setSelectedEvents(getEventsForDay(day.date))
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

  return (
    <div className="h-full p-4">
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 h-full">
        {/* Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div key={index} className="text-center p-2 font-medium text-sm text-slate-500 dark:text-slate-400">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day.date)
          const isCurrentDay = isToday(day.date)

          return (
            <div
              key={index}
              className={`
                border rounded-lg p-1 min-h-[100px] relative
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

                {day.month === "current" && dayEvents.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedDate(day.date)
                      setSelectedEvents(dayEvents)
                      setEventDialogOpen(true)
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Events */}
              <div className="mt-1 space-y-1 max-h-[80px] overflow-hidden">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`
                      text-xs p-1 rounded truncate
                      bg-${event.color}-100 dark:bg-${event.color}-900/20
                      text-${event.color}-700 dark:text-${event.color}-300
                      border border-${event.color}-200 dark:border-${event.color}-800/50
                    `}
                  >
                    {event.title}
                  </div>
                ))}

                {dayEvents.length > 3 && (
                  <div className="text-xs text-center text-slate-500 dark:text-slate-400">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>

              {/* Add event button (only visible on hover for current month) */}
              {day.month === "current" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedDate(day.date)
                    setNewEventOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          )
        })}
      </div>

      {/* Event Dialog */}
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
            <DialogDescription>{selectedEvents.length} events scheduled for this day</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {selectedEvents.map((event) => (
              <div
                key={event.id}
                className={`
                  p-3 rounded-lg
                  bg-${event.color}-50 dark:bg-${event.color}-900/20
                  border border-${event.color}-200 dark:border-${event.color}-800
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium text-${event.color}-700 dark:text-${event.color}-300`}>{event.title}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
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

                <div className="text-sm text-slate-600 dark:text-slate-300">
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

                <Badge className="mt-2" variant="outline">
                  {event.calendar}
                </Badge>
              </div>
            ))}

            {selectedEvents.length === 0 && (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No events scheduled for this day
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              className="gap-2 bg-violet-600 hover:bg-violet-700"
              onClick={() => {
                setEventDialogOpen(false)
                setNewEventOpen(true)
              }}
            >
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Event Dialog */}
      <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>Add details for your new calendar event.</DialogDescription>
          </DialogHeader>
          <EventForm initialDate={selectedDate} onClose={() => setNewEventOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

