# Productive - All-in-One Productivity Suite

Productive is a comprehensive productivity application that combines calendar management, task tracking, note-taking, and team collaboration in a single platform. This document provides detailed information about the application's pages, components, and functionality.

![Productive App](https://placeholder.com/productive-app-screenshot.png)

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Pages](#pages)
  - [Home Page](#home-page)
  - [Dashboard](#dashboard)
  - [Calendar](#calendar)
  - [Tasks](#tasks)
  - [Notes](#notes)
  - [Teams](#teams)
  - [Workspaces](#workspaces)
- [Components](#components)
- [Setup and Installation](#setup-and-installation)
- [Contributing](#contributing)

## Overview

Productive is designed to streamline workflow and boost productivity by integrating essential tools in one platform. The application features a clean, intuitive interface with a consistent design language across all pages.

Key features include:
- Time blocking and calendar management
- Task organization with multiple views
- Rich text note-taking with organization options
- Team collaboration and workspace management
- AI-powered suggestions and automations

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks

## Pages

### Home Page

**File**: `app/page.tsx`

The home page serves as the landing page for the application, showcasing its features and benefits to potential users.

**Components and Sections**:
- Navigation bar with links to features, pricing, and login
- Hero section with main value proposition
- Features grid highlighting key functionality
- Statistics section showing productivity improvements
- Pricing section with different plan options
- Call-to-action for sign-up

**Functionality**:
- Responsive design with mobile menu
- Interactive feature showcase
- Pricing toggle between monthly and yearly plans

### Dashboard

**File**: `app/dashboard/page.tsx`

The dashboard provides an overview of the user's productivity status and quick access to all main features.

**Components and Sections**:
- Sidebar navigation with collapsible menu
- Header with search and user profile
- Overview cards showing task status, upcoming meetings, etc.
- AI suggestions panel
- Tabs for Calendar, Tasks, Notes, and Team views

**Functionality**:
- Collapsible sidebar for space efficiency
- Quick access to all main application features
- Real-time productivity statistics
- AI-powered recommendations based on schedule and tasks

**Dashboard Components**:
- `CalendarView`: Shows upcoming events in a day view
- `TaskList`: Displays pending and completed tasks
- `NotesPanel`: Shows recent notes with quick access
- `TeamSection`: Provides team collaboration overview

### Calendar

**File**: `app/calendar/page.tsx`

The calendar page offers comprehensive time management with multiple view options.

**Components and Sections**:
- Calendar navigation with date selection
- View options (Month, Week, Day, Agenda)
- Event creation and management
- Mini calendar for quick navigation
- Calendar categories and filtering

**Functionality**:
- Drag-and-drop event scheduling
- Multiple calendar views (Month, Week, Day, Agenda)
- Event details with attendees and description
- Calendar sharing and visibility options

**Calendar Components**:
- `MonthView`: Traditional month calendar grid
- `WeekView`: Detailed week view with hourly slots
- `DayView`: Focused day view with detailed time blocks
- `AgendaView`: List-based view of upcoming events
- `EventForm`: Form for creating and editing events

### Tasks

**File**: `app/tasks/page.tsx`

The tasks page helps users organize and track their to-dos with flexible viewing options.

**Components and Sections**:
- Task filters and search
- Multiple view options (List, Board, Calendar)
- Task creation and management
- Project and tag organization
- Task statistics and progress tracking

**Functionality**:
- Task organization by project, tag, and status
- Multiple view options for different workflows
- Task prioritization and due dates
- Detailed task information with subtasks and comments

**Task Components**:
- `TaskListView`: Traditional list view of tasks
- `TaskBoardView`: Kanban-style board for visual task management
- `TaskCalendarView`: Calendar view showing tasks by due date
- `TaskForm`: Form for creating and editing tasks
- `TaskDetails`: Detailed view of a specific task

### Notes

**File**: `app/notes/page.tsx`

The notes page provides a flexible environment for capturing and organizing information.

**Components and Sections**:
- Notes organization with workspaces and folders
- Multiple view options (Grid, List, Table)
- Rich text editor with formatting options
- Note tagging and categorization
- Search and filtering capabilities

**Functionality**:
- Rich text editing with markdown support
- Multiple view options for different use cases
- Note organization with tags and favorites
- Full-text search across all notes

**Notes Components**:
- `NoteCard`: Card representation of a note in grid view
- `NoteList`: List representation of notes
- `NoteTable`: Table view with sortable columns
- `NoteEditor`: Rich text editor for note content
- `NoteProperties`: Metadata editor for note properties

### Teams

**File**: `app/teams/page.tsx`

The teams page facilitates collaboration and team management within the application.

**Components and Sections**:
- Team overview with members and roles
- Team workspaces and projects
- Activity feed showing recent team actions
- Team settings and permissions
- Member management interface

**Functionality**:
- Team creation and management
- Member roles and permissions
- Team activity tracking
- Workspace organization within teams
- Team settings and customization

**Teams Components**:
- `TeamHeader`: Team information and actions
- `TeamMembers`: Member list with roles and status
- `TeamWorkspaces`: Workspaces associated with the team
- `TeamActivity`: Recent activity within the team
- `TeamSettings`: Configuration options for the team

### Workspaces

**File**: `app/workspaces/[id]/page.tsx`

The workspace page provides a dedicated environment for organizing related content.

**Components and Sections**:
- Workspace navigation sidebar
- Content organization with pages and subpages
- Multiple view options for content
- Collaboration indicators showing active users
- Workspace settings and customization

**Functionality**:
- Content organization within workspaces
- Different content types (notes, databases, etc.)
- Collaboration with real-time indicators
- Customizable workspace settings
- Access control and permissions

**Workspace Components**:
- `WorkspaceSidebar`: Navigation for workspace content
- `WorkspaceHeader`: Workspace information and actions
- `WorkspaceContent`: Main content area with various views
- `WorkspaceMembers`: Members with access to the workspace
- `WorkspaceSettings`: Configuration options for the workspace

## Components

### Navigation Components

- `Sidebar`: Main application navigation
  - Collapsible design for space efficiency
  - Links to main application features
  - Workspace selector
  - User profile and settings

- `Header`: Top navigation bar
  - Search functionality
  - View controls
  - User profile and notifications
  - Action buttons

### Dashboard Components

- `OverviewCard`: Statistics and quick information
- `AIRecommendations`: AI-powered suggestions
- `ActivityFeed`: Recent user activity

### Calendar Components

- `CalendarNavigation`: Date selection and view controls
- `EventCard`: Visual representation of calendar events
- `MiniCalendar`: Compact calendar for quick navigation
- `CalendarCategories`: Calendar filtering and organization

### Task Components

- `TaskItem`: Individual task representation
- `TaskGroup`: Collection of related tasks
- `TaskFilters`: Filtering and sorting options
- `TaskStatistics`: Progress and completion metrics

### Notes Components

- `NoteEditor`: Rich text editing environment
- `NoteSidebar`: Navigation for notes organization
- `NotePreview`: Compact view of note content
- `TagManager`: Organization with tags and categories

### Team Components

- `MemberCard`: Team member information
- `RoleManager`: Permission and role assignment
- `TeamInvite`: Member invitation interface
- `ActivityLog`: Team activity tracking

### Workspace Components

- `WorkspaceNavigation`: Content organization
- `ContentView`: Different views for workspace content
- `CollaborationIndicator`: Real-time user presence
- `AccessControl`: Permission management

### Shared Components

- `Button`: Various button styles and variants
- `Input`: Text input fields
- `Dropdown`: Selection menus
- `Modal`: Dialog windows for forms and information
- `Tabs`: Content organization with tabs
- `Card`: Content containers with consistent styling
- `Avatar`: User profile images
- `Badge`: Status indicators and counts
- `Toast`: Notification messages

## Setup and Installation

1. Clone the repository:

