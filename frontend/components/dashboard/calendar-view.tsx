"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MoreHorizontal, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for calendar events
const events = [
  {
    id: 1,
    title: "Team Standup",
    start: "10:00 AM",
    end: "10:30 AM",
    type: "meeting",
    attendees: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 3, name: "Emma Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 2,
    title: "Q4 Marketing Plan",
    start: "1:00 PM",
    end: "3:00 PM",
    type: "focus",
    description: "Deep work session to finalize the Q4 marketing strategy",
  },
  {
    id: 3,
    title: "Client Call: Acme Corp",
    start: "3:30 PM",
    end: "4:00 PM",
    type: "meeting",
    attendees: [{ id: 4, name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" }],
  },
  {
    id: 4,
    title: "Website Redesign Review",
    start: "4:30 PM",
    end: "5:30 PM",
    type: "meeting",
    attendees: [
      { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: 5, name: "Alex Wong", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

// Time slots for the day view
const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Format the current date for display
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  // Navigate to previous day
  const prevDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }

  // Navigate to next day
  const nextDay = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Helper function to determine event position and height in the calendar
  const getEventStyle = (event) => {
    const startHour =
      Number.parseInt(event.start.split(":")[0]) +
      (event.start.includes("PM") && event.start.split(":")[0] !== "12" ? 12 : 0)
    const startMinute = Number.parseInt(event.start.split(":")[1].split(" ")[0])

    const endHour =
      Number.parseInt(event.end.split(":")[0]) + (event.end.includes("PM") && event.end.split(":")[0] !== "12" ? 12 : 0)
    const endMinute = Number.parseInt(event.end.split(":")[1].split(" ")[0])

    const startPosition = (startHour - 8) * 60 + startMinute
    const duration = (endHour - startHour) * 60 + (endMinute - startMinute)

    return {
      top: `${startPosition}px`,
      height: `${duration}px`,
      backgroundColor: event.type === "meeting" ? "rgba(124, 58, 237, 0.1)" : "rgba(16, 185, 129, 0.1)",
      borderLeft: `3px solid ${event.type === "meeting" ? "rgb(124, 58, 237)" : "rgb(16, 185, 129)"}`,
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium ml-2">{formattedDate}</h2>
        </div>

        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Month
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800"
          >
            <Clock className="h-4 w-4" />
            Day
          </Button>
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
            <Plus className="h-4 w-4" />
            Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Calendar Day View */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mt-4" style={{ height: "660px" }}>
                {/* Time slots */}
                <div className="absolute top-0 left-0 w-16 h-full border-r border-slate-200 dark:border-slate-800">
                  {timeSlots.map((time, index) => (
                    <div
                      key={index}
                      className="absolute flex items-center justify-center h-12 w-16 text-xs text-slate-500 dark:text-slate-400"
                      style={{ top: `${index * 60}px` }}
                    >
                      {time}
                    </div>
                  ))}
                </div>

                {/* Hour grid lines */}
                <div className="absolute top-0 left-16 right-0 h-full">
                  {timeSlots.map((_, index) => (
                    <div
                      key={index}
                      className="absolute left-0 right-0 border-t border-slate-200 dark:border-slate-800"
                      style={{ top: `${index * 60}px` }}
                    />
                  ))}
                </div>

                {/* Events */}
                <div className="absolute top-0 left-16 right-0 h-full">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="absolute left-4 right-4 rounded-md p-3 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                      style={getEventStyle(event)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {event.start} - {event.end}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
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
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">{event.description}</p>
                      )}

                      {event.attendees && event.attendees.length > 0 && (
                        <div className="mt-2 flex items-center gap-1">
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
                  ))}
                </div>

                {/* Current time indicator */}
                <div className="absolute left-0 right-0 border-t-2 border-red-500 z-10" style={{ top: "240px" }}>
                  <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          {/* Mini Calendar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                <div className="text-slate-500 dark:text-slate-400">Su</div>
                <div className="text-slate-500 dark:text-slate-400">Mo</div>
                <div className="text-slate-500 dark:text-slate-400">Tu</div>
                <div className="text-slate-500 dark:text-slate-400">We</div>
                <div className="text-slate-500 dark:text-slate-400">Th</div>
                <div className="text-slate-500 dark:text-slate-400">Fr</div>
                <div className="text-slate-500 dark:text-slate-400">Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 3 // Offset to start from previous month
                  const isCurrentMonth = day >= 0 && day < 30
                  const isToday = day === 15
                  const hasEvents = [3, 8, 15, 22, 27].includes(day)

                  return (
                    <div
                      key={i}
                      className={`
                        h-8 w-8 flex items-center justify-center rounded-full text-xs
                        ${!isCurrentMonth ? "text-slate-300 dark:text-slate-600" : ""}
                        ${isToday ? "bg-violet-600 text-white" : ""}
                        ${hasEvents && !isToday ? "font-medium text-violet-600 dark:text-violet-400" : ""}
                      `}
                    >
                      {day >= 0 ? day + 1 : 31 + day}
                      {hasEvents && !isToday && (
                        <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-violet-600 dark:bg-violet-400" />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Upcoming</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="w-1 h-full self-stretch rounded-full bg-violet-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {event.start} - {event.end}
                      </p>
                      {event.attendees && (
                        <div className="mt-2 flex -space-x-2">
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
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

