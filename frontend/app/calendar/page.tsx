"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import MonthView from "@/components/calendar/month-view"
import WeekView from "@/components/calendar/week-view"
import DayView from "@/components/calendar/day-view"
import AgendaView from "@/components/calendar/agenda-view"
import EventForm from "@/components/calendar/event-form"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("week") // month, week, day, agenda
  const [showSidebar, setShowSidebar] = useState(true)
  const [newEventOpen, setNewEventOpen] = useState(false)

  // Format the current date for display
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  // Navigate to previous period
  const prevPeriod = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() - 1)
    } else if (view === "agenda") {
      newDate.setDate(newDate.getDate() - 14)
    }
    setCurrentDate(newDate)
  }

  // Navigate to next period
  const nextPeriod = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() + 1)
    } else if (view === "agenda") {
      newDate.setDate(newDate.getDate() + 14)
    }
    setCurrentDate(newDate)
  }

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get the date range for the header based on the current view
  const getDateRangeDisplay = () => {
    if (view === "month") {
      return formattedDate
    } else if (view === "week") {
      const startOfWeek = new Date(currentDate)
      const day = currentDate.getDay()
      startOfWeek.setDate(currentDate.getDate() - day)

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      const startMonth = startOfWeek.toLocaleDateString("en-US", { month: "short" })
      const startDay = startOfWeek.getDate()
      const endMonth = endOfWeek.toLocaleDateString("en-US", { month: "short" })
      const endDay = endOfWeek.getDate()
      const year = endOfWeek.getFullYear()

      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`
      } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
      }
    } else if (view === "day") {
      return currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    } else if (view === "agenda") {
      return "Next 2 Weeks"
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>

            <h1 className="text-xl font-bold">Calendar</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-8 bg-slate-100 dark:bg-slate-800 border-none"
              />
            </div>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
              {showSidebar ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        {/* Calendar Controls */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevPeriod}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={nextPeriod}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-medium ml-2">{getDateRangeDisplay()}</h2>
            </div>

            <div className="flex items-center gap-2">
              <Tabs value={view} onValueChange={setView} className="w-auto">
                {/* <TabsList>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="agenda">Agenda</TabsTrigger>
                </TabsList> */}
              </Tabs>

              <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                    <Plus className="h-4 w-4" />
                    Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogDescription>Add details for your new calendar event.</DialogDescription>
                  </DialogHeader>
                  <EventForm onClose={() => setNewEventOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs defaultValue="month" className="flex flex-col h-full">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            <TabsContent value="month" className="h-full m-0">
              <MonthView currentDate={currentDate} />
            </TabsContent>

            <TabsContent value="week" className="h-full m-0">
              <WeekView currentDate={currentDate} />
            </TabsContent>

            <TabsContent value="day" className="h-full m-0">
              <DayView currentDate={currentDate} />
            </TabsContent>

            <TabsContent value="agenda" className="h-full m-0">
              <AgendaView currentDate={currentDate} />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto hidden md:block">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Mini Calendar</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center mb-2">
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium">
                        {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </span>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

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
                              h-8 w-8 flex items-center justify-center rounded-full text-xs cursor-pointer
                              ${!isCurrentMonth ? "text-slate-300 dark:text-slate-600" : ""}
                              ${isToday ? "bg-violet-600 text-white" : ""}
                              ${hasEvents && !isToday ? "font-medium text-violet-600 dark:text-violet-400" : ""}
                              ${isCurrentMonth && !isToday ? "hover:bg-slate-100 dark:hover:bg-slate-800" : ""}
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
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">My Calendars</h3>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="cal-personal" defaultChecked />
                  <Label htmlFor="cal-personal" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                    Personal
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="cal-work" defaultChecked />
                  <Label htmlFor="cal-work" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Work
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="cal-family" defaultChecked />
                  <Label htmlFor="cal-family" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Family
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="cal-birthdays" defaultChecked />
                  <Label htmlFor="cal-birthdays" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    Birthdays
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="cal-holidays" defaultChecked />
                  <Label htmlFor="cal-holidays" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    Holidays
                  </Label>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Shared Calendars</h3>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Users className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="cal-team" defaultChecked />
                  <Label htmlFor="cal-team" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    Marketing Team
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="cal-project" defaultChecked />
                  <Label htmlFor="cal-project" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    Website Redesign
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="cal-client" />
                  <Label htmlFor="cal-client" className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    Client Meetings
                  </Label>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>

              <div className="space-y-4">
                <div className="p-3 border rounded-lg bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-violet-500">Today</Badge>
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

                  <h4 className="font-medium">Team Standup</h4>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    10:00 AM - 10:30 AM
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    <Users className="h-3 w-3 text-slate-400" />
                    <div className="flex -space-x-2">
                      <Avatar className="h-5 w-5 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=20&width=20" alt="User" />
                        <AvatarFallback className="text-[8px]">SJ</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-5 w-5 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=20&width=20" alt="User" />
                        <AvatarFallback className="text-[8px]">MC</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-5 w-5 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=20&width=20" alt="User" />
                        <AvatarFallback className="text-[8px]">ER</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-blue-500">Today</Badge>
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

                  <h4 className="font-medium">Client Call: Acme Corp</h4>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    3:30 PM - 4:00 PM
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    <Users className="h-3 w-3 text-slate-400" />
                    <div className="flex -space-x-2">
                      <Avatar className="h-5 w-5 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=20&width=20" alt="User" />
                        <AvatarFallback className="text-[8px]">DK</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>

                <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-500">Tomorrow</Badge>
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

                  <h4 className="font-medium">Product Planning</h4>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    11:00 AM - 12:00 PM
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    <Users className="h-3 w-3 text-slate-400" />
                    <div className="flex -space-x-2">
                      <Avatar className="h-5 w-5 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=20&width=20" alt="User" />
                        <AvatarFallback className="text-[8px]">SJ</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-5 w-5 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=20&width=20" alt="User" />
                        <AvatarFallback className="text-[8px]">MC</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-5 w-5 border border-white dark:border-slate-800">
                        <AvatarImage src="/placeholder.svg?height=20&width=20" alt="User" />
                        <AvatarFallback className="text-[8px]">AW</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}

