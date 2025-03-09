"use client"

import { useState } from "react"
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Inbox,
  Layers,
  Layout,
  Lightbulb,
  Menu,
  Plus,
  Search,
  Settings,
  Users,
  X,
  Bell,
  User,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import CalendarView from "@/components/dashboard/calendar-view"
import TaskList from "@/components/dashboard/task-list"
import NotesPanel from "@/components/dashboard/notes-panel"
import TeamSection from "@/components/dashboard/team-section"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-50 flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${sidebarOpen ? "md:w-64" : "md:w-20"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className={`h-6 w-6 text-violet-600 flex-shrink-0 ${!sidebarOpen && "md:mx-auto"}`} />
            {(sidebarOpen || mobileSidebarOpen) && (
              <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                Productive
              </span>
            )}
          </div>
          <button className="md:hidden p-2 rounded-md text-slate-500" onClick={() => setMobileSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <Button
            variant="ghost"
            className={`w-full justify-start ${!sidebarOpen && "md:justify-center"} text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20`}
          >
            <Layout className="h-5 w-5 mr-3" />
            {(sidebarOpen || mobileSidebarOpen) && <span>Dashboard</span>}
          </Button>

          <Button variant="ghost" className={`w-full justify-start ${!sidebarOpen && "md:justify-center"}`}>
            <Calendar className="h-5 w-5 mr-3" />
            {(sidebarOpen || mobileSidebarOpen) && <span>Calendar</span>}
          </Button>

          <Button variant="ghost" className={`w-full justify-start ${!sidebarOpen && "md:justify-center"}`}>
            <CheckCircle className="h-5 w-5 mr-3" />
            {(sidebarOpen || mobileSidebarOpen) && <span>Tasks</span>}
          </Button>

          <Button variant="ghost" className={`w-full justify-start ${!sidebarOpen && "md:justify-center"}`}>
            <FileText className="h-5 w-5 mr-3" />
            {(sidebarOpen || mobileSidebarOpen) && <span>Notes</span>}
          </Button>

          <Button variant="ghost" className={`w-full justify-start ${!sidebarOpen && "md:justify-center"}`}>
            <Users className="h-5 w-5 mr-3" />
            {(sidebarOpen || mobileSidebarOpen) && <span>Team</span>}
          </Button>

          <Button variant="ghost" className={`w-full justify-start ${!sidebarOpen && "md:justify-center"}`}>
            <Lightbulb className="h-5 w-5 mr-3" />
            {(sidebarOpen || mobileSidebarOpen) && <span>AI Assistant</span>}
          </Button>

          <Button variant="ghost" className={`w-full justify-start ${!sidebarOpen && "md:justify-center"}`}>
            <Inbox className="h-5 w-5 mr-3" />
            {(sidebarOpen || mobileSidebarOpen) && (
              <div className="flex items-center justify-between w-full">
                <span>Inbox</span>
                <Badge className="ml-auto bg-violet-600 hover:bg-violet-700">3</Badge>
              </div>
            )}
            {!sidebarOpen && !mobileSidebarOpen && (
              <Badge className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-violet-600 hover:bg-violet-700">
                3
              </Badge>
            )}
          </Button>

          {(sidebarOpen || mobileSidebarOpen) && (
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="px-3 text-sm font-medium text-slate-500 dark:text-slate-400 uppercase">Workspaces</h3>
              <div className="mt-2 space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                  Personal
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                  Marketing Team
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mr-3"></span>
                  Product Launch
                </Button>
                <Button variant="ghost" className="w-full justify-start text-violet-600 dark:text-violet-400">
                  <Plus className="h-4 w-4 mr-3" />
                  Add Workspace
                </Button>
              </div>
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="ghost"
            className={`w-full justify-start ${!sidebarOpen && "md:justify-center"}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <>
                <ChevronDown className="h-5 w-5 mr-3 rotate-90" />
                <span>Collapse</span>
              </>
            ) : (
              <ChevronDown className="h-5 w-5 -rotate-90" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded-md text-slate-500" onClick={() => setMobileSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 bg-slate-100 dark:bg-slate-800 border-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-violet-600"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <DropdownMenuItem key={i} className="flex items-start gap-4 p-3 cursor-pointer">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="User" />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">New comment on your task</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Sarah mentioned you in a comment on "Q4 Marketing Plan"
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">10 minutes ago</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-violet-600 dark:text-violet-400">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">John Doe</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className=" mx-auto">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Good morning, John!</h1>
                <p className="text-slate-500 dark:text-slate-400">Here's what's happening today.</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Note
                </Button>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tasks Due Today</p>
                      <h3 className="text-2xl font-bold mt-1">5</h3>
                    </div>
                    <div className="h-12 w-12 bg-violet-100 dark:bg-violet-900/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={60} className="h-2 bg-violet-100 dark:bg-slate-700">
                      <div className="h-full bg-violet-600 rounded-full" />
                    </Progress>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">3 of 5 completed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming Meetings</p>
                      <h3 className="text-2xl font-bold mt-1">2</h3>
                    </div>
                    <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Next: Team Standup at 10:00 AM</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Recent Notes</p>
                      <h3 className="text-2xl font-bold mt-1">12</h3>
                    </div>
                    <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Last edited: 35 minutes ago</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Focus Time</p>
                      <h3 className="text-2xl font-bold mt-1">3.5 hrs</h3>
                    </div>
                    <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={70} className="h-2 bg-green-100 dark:bg-slate-700">
                      <div className="h-full bg-green-600 rounded-full" />
                    </Progress>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">70% of daily goal</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Suggestions */}
            <Card className="hidden mb-6 border-violet-200 dark:border-violet-900 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-violet-100 dark:bg-violet-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">AI Suggestions</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Based on your schedule, here are some recommendations:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5" />
                        <span>Block 1-3 PM for deep work on the Q4 Marketing Plan</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5" />
                        <span>Reschedule your 4 PM meeting to tomorrow morning for better focus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5" />
                        <span>3 tasks from your "Website Redesign" project are due this week</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Dashboard Tabs */}
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar" className="mt-0">
                <CalendarView />
              </TabsContent>

              <TabsContent value="tasks" className="mt-0">
                <TaskList />
              </TabsContent>

              <TabsContent value="notes" className="mt-0">
                <NotesPanel />
              </TabsContent>

              <TabsContent value="team" className="mt-0">
                <TeamSection />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

