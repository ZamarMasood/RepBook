# repbook

RepBook is a digital workspace for Pilates instructors to organize their teaching knowledge, catalog exercises, and build class plans, all in one place. It replaces scattered planning across notebooks, spreadsheets, and notes apps with a purpose-built tool designed specifically for how Pilates instructors work.

The platform includes a searchable exercise library, an intuitive class plan builder, and a clean teaching view optimized for in-studio use

## Features

- **Home Dashboard** - Overview with stats, recent plans, and quick actions
- **Exercise Library** - Browse, search, and manage Pilates exercises with filtering by apparatus and level
- **Class Plans** - Create and edit class plans with drag-and-drop exercise ordering
- **Class Plan Builder** - Side-by-side editor with exercise library picker
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

Click on either account card on the login screen to enter the app.

## Project Structure

```
app/
├── page.tsx                    # Login / Home
├── exercises/                  # Exercise Library
├── class-plans/               # Class Plans list and editor
│   ├── [id]/                  # View/edit specific plan
│   │   └── edit/              # Edit existing plan
│   └── new/                   # Create new plan
└── profile/                   # Profile & Settings

components/
├── app-shell.tsx              # Main layout wrapper
├── app-sidebar.tsx            # Navigation sidebar
├── home-page.tsx              # Dashboard component
├── exercise-library-page.tsx  # Exercise list with filters
├── add-exercise-modal.tsx     # Create/edit exercise form
├── exercise-detail-modal.tsx  # View exercise details
├── class-plans-page.tsx       # Plans grid view
├── class-plan-editor.tsx      # Plan builder with exercise picker
├── class-plan-detail.tsx      # View plan with expandable notes
└── profile-page.tsx           # Settings forms

lib/
├── data.ts                    # Type definitions and test data
└── store.ts                   # Zustand store for app state
```

## Data Model

- **User** - Instructor profile with studio info
- **Exercise** - Pilates exercise with apparatus, level, position, springs, and cues
- **ClassPlan** - Collection of exercises with customized reps and springs
- **ClassExercise** - Exercise instance in a plan with custom settings

## Apparatus-Specific Settings

Each apparatus type has different spring/equipment options:

| Apparatus | Settings |
|-----------|----------|
| Reformer | Color springs (Green, Red, Blue, Yellow, Black, White, Orange, Classical) with count |
| Wunda Chair | Spring positions (High, Middle, Low) with count |
| Mat | Props only (Magic Circle, Spine Corrector, Small Barrel, etc.) |
| Cadillac/Tower | Equipment (Arm Springs, Leg Springs, Rollback Bar, Push Through Bar, Trapeze) |

## Notes

- Data is stored in memory using Zustand (no backend persistence)
- Exercises in the class builder support drag-and-drop reordering
- Click on exercises in class plan view to expand and see notes (setup, cues, modifications)
