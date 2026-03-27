# repbook

A Pilates studio management application for instructors to organize exercises and plan classes.

## Features

- **Home Dashboard** - Overview with stats, recent plans, and quick actions
- **Exercise Library** - Browse, search, and manage Pilates exercises with filtering by apparatus and level
- **Class Plans** - Create and edit class plans by combining exercises with custom reps and spring settings
- **Profile & Settings** - Manage account details and preferences

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **State Management**: Zustand
- **Fonts**: Geist (sans), Cormorant Garamond (serif headings)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Accounts

Two demo accounts are available for testing:

| Name | Studio | Location |
|------|--------|----------|
| Sarah Anderson | Body Balance Studio | San Francisco, CA |
| Michael Chen | Pilates Flow | Los Angeles, CA |

## Project Structure

```
app/
├── page.tsx                    # Login / Home
├── exercises/                  # Exercise Library
├── class-plans/               # Class Plans list and editor
│   ├── [id]/                  # View/edit specific plan
│   └── new/                   # Create new plan
└── profile/                   # Profile & Settings

components/
├── app-shell.tsx              # Main layout wrapper
├── app-sidebar.tsx            # Navigation sidebar
├── home-page.tsx              # Dashboard component
├── exercise-library-page.tsx  # Exercise list with filters
├── class-plans-page.tsx       # Plans grid view
├── class-plan-editor.tsx      # Plan creation/editing
└── profile-page.tsx           # Settings forms

lib/
├── data.ts                    # Type definitions and test data
└── store.ts                   # Zustand store for app state
```

## Data Model

- **User** - Instructor profile with studio info
- **Exercise** - Pilates exercise with apparatus, level, position, springs, and cues
- **ClassPlan** - Collection of exercises with customized reps and springs

## Notes

- Data is stored in memory using Zustand (no backend persistence)
- Spring colors: Red, Blue, Green, Yellow, White, Light (L)
- Apparatus types: Reformer, Mat, Wunda Chair, Cadillac Tower, Ladder Barrel
