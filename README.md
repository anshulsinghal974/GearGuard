# GearGuard - The Ultimate Maintenance Tracker

A comprehensive maintenance tracking system built with React, TypeScript, and modern web technologies.

## Features

### Equipment Management
- Complete equipment records with serial numbers, purchase dates, warranty information
- Track equipment by department and assigned employee
- Link equipment to maintenance teams and technicians
- Smart button showing maintenance request count
- Equipment status tracking (Active/Inactive)
- Auto-scrap functionality when equipment is moved to scrap status

### Maintenance Teams
- Create and manage multiple maintenance teams (Mechanics, Electricians, IT Support, etc.)
- Assign team members (technicians) to teams
- Team-based workflow: only team members can pick up requests for their team

### Maintenance Requests
- **Request Types:**
  - Corrective (Breakdown) - urgent maintenance issues
  - Preventive (Planned) - scheduled maintenance with dates and duration
- **Request States:** New → In Progress → Repaired → Scrap
- **Auto-fill Logic:** When equipment is selected, automatically fills maintenance team
- **Smart Features:**
  - Equipment-specific request filtering
  - Overdue request indicators
  - Technician assignment with avatar display

### Kanban Board View
- Visual drag-and-drop interface
- Grouped by request stages (New, In Progress, Repaired, Scrap)
- Shows technician avatars
- Overdue request indicators
- Request type badges (Preventive/Corrective)
- Equipment and scheduling information

### Calendar View
- Shows preventive maintenance requests
- Color-coded by status
- Month, Week, Day, and Agenda views
- Visual indicators for overdue requests

### Reports & Analytics
- Requests per Team (bar charts)
- Requests per Equipment Category (bar charts)
- Status distribution
- Request type distribution (Preventive vs Corrective)
- Summary statistics dashboard

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **@dnd-kit** - Drag and drop for Kanban board
- **react-big-calendar** - Calendar view
- **date-fns** - Date manipulation
- **lucide-react** - Icons

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx      # Main layout with navigation
│   ├── EquipmentForm.tsx
│   ├── MaintenanceRequestForm.tsx
│   ├── MaintenanceTeamForm.tsx
│   └── KanbanBoard.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── EquipmentList.tsx
│   ├── EquipmentDetail.tsx
│   ├── MaintenanceRequests.tsx
│   ├── MaintenanceTeams.tsx
│   ├── CalendarView.tsx
│   └── Reports.tsx
├── store/              # State management
│   └── store.ts        # Zustand store
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Usage Guide

### Adding Equipment
1. Navigate to Equipment → Click "Add Equipment"
2. Fill in all required fields (marked with *)
3. Select department, assigned employee, and maintenance team
4. Optionally assign a technician
5. Click "Create"

### Creating Maintenance Requests
1. Navigate to Requests → Click "New Request"
2. Select equipment (team auto-fills)
3. Choose request type (Corrective or Preventive)
4. For preventive requests, add scheduled date and duration
5. Assign to a technician (optional, must be a team member)
6. Click "Create"

### Using the Kanban Board
- Drag requests between columns to change status
- View request details, technician assignments, and overdue indicators
- Click on requests to edit (feature can be extended)

### Calendar View
- Navigate to Calendar to see all preventive maintenance requests
- Switch between Month, Week, Day, and Agenda views
- Color coding:
  - Blue: Scheduled/In Progress
  - Green: Repaired
  - Red: Scrap/Overdue

### Managing Teams
1. Navigate to Teams → Click "Add Team"
2. Enter team name and description
3. Select team members from available technicians
4. Click "Create"

## Data Storage

Currently, the application uses in-memory state management (Zustand). For production use, you'll want to:
- Connect to a backend API
- Use a database for persistent storage
- Implement authentication and authorization
- Add data synchronization

## Future Enhancements

- Backend API integration
- User authentication and roles
- Email notifications for overdue requests
- Equipment photos and documents
- Maintenance history tracking
- Advanced reporting and analytics
- Mobile responsive improvements
- Export functionality (PDF, Excel)

## License

MIT

## Support

For issues or questions, please open an issue in the repository.

