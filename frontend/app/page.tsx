"use client"

import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, FileText, Layers, Lightbulb, Menu, Puzzle, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Layers className="h-8 w-8 text-violet-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                Productive
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#features"
                className="text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400 transition-colors"
              >
                Blog
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
              >
                Log in
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-700 text-white">Get Started</Button>
            </div>

            <button
              className="md:hidden p-2 rounded-md text-slate-700 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="px-4 py-4 space-y-1">
              <Link
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
            <div className="px-4 py-4 space-y-2">
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
              <Button className="w-full justify-center bg-violet-600 hover:bg-violet-700">Get Started</Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36">
          {/* Grid Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-white dark:bg-slate-950" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px), 
                linear-gradient(to bottom, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/80 to-white dark:from-slate-950/0 dark:via-slate-950/80 dark:to-slate-950" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/30 px-4 py-1.5 rounded-full text-sm font-medium text-violet-800 dark:text-violet-300 mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-violet-500"></span>
                All-in-one productivity suite
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-violet-700 to-indigo-700 dark:from-violet-500 dark:to-indigo-400 text-transparent bg-clip-text">
                Organize your work life in one powerful app
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
                Combine calendar, notes, tasks, and team collaboration in a single platform. Save time and boost
                productivity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-8 py-6 h-auto rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all"
                >
                  Start for free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto rounded-xl border-slate-300 dark:border-slate-700"
                >
                  Watch demo
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* App Screenshot with Floating Elements */}
            <div className="relative max-w-5xl mx-auto">
              <div className="relative rounded-2xl shadow-2xl shadow-violet-500/10 border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
                <div className="absolute top-0 left-0 right-0 h-12 bg-slate-100 dark:bg-slate-800 flex items-center px-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <img
                  src="/placeholder.svg?height=600&width=1000"
                  alt="Productive app dashboard"
                  className="w-full h-auto rounded-b-2xl mt-12"
                />
              </div>

              {/* Floating UI Elements */}
              <div className="absolute -top-6 -left-6 md:-left-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 rotate-[-3deg] z-10 hidden md:block">
                <div className="flex items-center gap-3">
                  <Calendar className="h-10 w-10 text-violet-600 dark:text-violet-400" />
                  <div>
                    <div className="font-medium">Team Meeting</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Today, 2:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 rotate-[3deg] z-10 hidden md:block">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                  <div>
                    <div className="font-medium">Task Completed</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Project proposal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-violet-700 to-indigo-700 dark:from-violet-500 dark:to-indigo-400 text-transparent bg-clip-text">
                All Your Productivity Tools in One Place
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Stop switching between apps. Productive brings together everything you need to stay organized, focused,
                and efficient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-violet-500/5 border border-slate-200 dark:border-slate-700 hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-900 transition-all">
                <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Time Blocking & Calendar</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Plan your day with precision and never miss an important event.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Drag-and-drop calendar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Google Calendar sync</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Focus Mode with Pomodoro</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-violet-500/5 border border-slate-200 dark:border-slate-700 hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-900 transition-all">
                <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                  <FileText className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Notes & Docs</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Capture ideas, create documents, and collaborate in real-time.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Rich text with Markdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Tagging & Categories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">AI-powered summaries</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-violet-500/5 border border-slate-200 dark:border-slate-700 hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-900 transition-all">
                <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                  <CheckCircle className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Task Management</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Organize tasks, set priorities, and track progress effortlessly.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Priority levels (P1, P2, P3)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Kanban & List Views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Recurring Tasks</span>
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-violet-500/5 border border-slate-200 dark:border-slate-700 hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-900 transition-all">
                <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Team Collaboration</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Work together seamlessly with your team in real-time.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Shared Team Calendar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Real-time collaboration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Role-based access</span>
                  </li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-violet-500/5 border border-slate-200 dark:border-slate-700 hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-900 transition-all">
                <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                  <Lightbulb className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI & Automations</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Let AI handle routine tasks while you focus on what matters.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Smart scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Auto task prioritization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Meeting transcription</span>
                  </li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl shadow-violet-500/5 border border-slate-200 dark:border-slate-700 hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-900 transition-all">
                <div className="w-14 h-14 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-6">
                  <Puzzle className="h-7 w-7 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Integrations</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Connect with your favorite tools for a seamless workflow.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Google Calendar & Outlook</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Slack, Teams & Discord</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">Zapier & 100+ more</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-r from-violet-600 to-indigo-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="p-6">
                <div className="text-5xl font-bold mb-3 text-white">38%</div>
                <p className="text-violet-100 text-lg">Increase in productivity</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold mb-3 text-white">5.2 hrs</div>
                <p className="text-violet-100 text-lg">Saved per week</p>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold mb-3 text-white">10,000+</div>
                <p className="text-violet-100 text-lg">Teams using our platform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-violet-700 to-indigo-700 dark:from-violet-500 dark:to-indigo-400 text-transparent bg-clip-text">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Choose the plan that's right for you or your team. All plans include a 14-day free trial.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Personal Plan */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-violet-500/5 border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-900 transition-all">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Personal</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">Perfect for individual users</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="text-slate-500 dark:text-slate-400">/month</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">All productivity tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Basic AI features</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">5GB storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Email support</span>
                    </li>
                  </ul>

                  <Button className="w-full py-6 h-auto text-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-xl">
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-violet-500/10 border-2 border-violet-500 dark:border-violet-600 overflow-hidden relative hover:shadow-violet-500/20 transition-all">
                <div className="absolute top-0 left-0 right-0 bg-violet-500 dark:bg-violet-600 text-white text-center py-1.5 text-sm font-medium">
                  Most Popular
                </div>
                <div className="p-8 pt-12">
                  <h3 className="text-2xl font-bold mb-2">Pro</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">For professionals and small teams</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-slate-500 dark:text-slate-400">/month</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Everything in Personal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Advanced AI features</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">20GB storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Team collaboration (up to 5)</span>
                    </li>
                  </ul>

                  <Button className="w-full py-6 h-auto text-lg bg-violet-600 hover:bg-violet-700 text-white rounded-xl">
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-violet-500/5 border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-900 transition-all">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Team</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6">For larger teams and organizations</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-slate-500 dark:text-slate-400">/month</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Everything in Pro</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Unlimited AI features</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">100GB storage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">Unlimited team members</span>
                    </li>
                  </ul>

                  <Button className="w-full py-6 h-auto text-lg bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-xl">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-slate-600 dark:text-slate-300 mb-4">Need a custom solution for your organization?</p>
              <Button
                variant="outline"
                className="border-violet-300 dark:border-violet-800 hover:border-violet-500 dark:hover:border-violet-600"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
          {/* Grid Background */}
          <div className="absolute inset-0 -z-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(to right, rgba(124, 58, 237, 0.1) 1px, transparent 1px), 
                linear-gradient(to bottom, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Gradient Orbs */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />

            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/0 via-slate-50/80 to-slate-50 dark:from-slate-900/0 dark:via-slate-900/80 dark:to-slate-900" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-violet-700 to-indigo-700 dark:from-violet-500 dark:to-indigo-400 text-transparent bg-clip-text">
                Ready to transform your productivity?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
                Join thousands of professionals who have already streamlined their workflow with Productive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 text-white text-lg px-8 py-6 h-auto rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all"
                >
                  Get Started for Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 h-auto rounded-xl border-slate-300 dark:border-slate-700"
                >
                  Schedule a Demo
                </Button>
              </div>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="h-8 w-8 text-violet-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                  Productive
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                All-in-one productivity suite for individuals and teams.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-violet-600 dark:hover:text-violet-400">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} Productive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

