"use client"

import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import {
  LayoutGrid,
  FileText,
  Star,
  TrendingUp,
  Plus,
  ChevronRight,
  Clock,
} from "lucide-react"

export function HomePage() {
  const { currentUser, classPlans, exercises } = useAppStore()

  if (!currentUser) return null

  // Calculate stats
  const totalPlans = classPlans.length
  const totalExercises = exercises.length
  const favorites = classPlans.filter((p) => p.isFavorite).length

  // Get most taught apparatus
  const apparatusCounts = classPlans.reduce(
    (acc, plan) => {
      acc[plan.apparatus] = (acc[plan.apparatus] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
  const mostTaught =
    Object.entries(apparatusCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "None"

  // Get time of day greeting
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl mb-1">
          <span className="font-normal text-foreground">{greeting}, </span>
          <span className="font-serif italic text-muted-foreground">
            {currentUser.firstName}.
          </span>
        </h1>
        <p className="text-muted-foreground">{currentUser.studioName}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="p-2.5 rounded-lg bg-muted">
              <LayoutGrid className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-semibold text-foreground">
                {totalPlans}
              </p>
              <p className="text-sm text-muted-foreground">Class plans</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="p-2.5 rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-semibold text-foreground">
                {totalExercises}
              </p>
              <p className="text-sm text-muted-foreground">New exercises</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="p-2.5 rounded-lg bg-muted">
              <Star className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-semibold text-foreground">
                {favorites}
              </p>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="p-2.5 rounded-lg bg-muted">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-3xl font-semibold text-foreground">
                {mostTaught}
              </p>
              <p className="text-sm text-muted-foreground">Most taught</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Plans */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Recent plans
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your latest class plans
                </p>
              </div>
              <Link
                href="/class-plans"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                View all <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-border">
              {classPlans.slice(0, 4).map((plan) => (
                <Link
                  key={plan.id}
                  href={`/class-plans/${plan.id}`}
                  className="flex items-center gap-4 py-3 hover:bg-muted/50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-muted">
                    <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {plan.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {plan.apparatus} · {plan.duration}
                    </p>
                  </div>
                  {plan.isFavorite && (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}

              {classPlans.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No class plans yet. Create your first one!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Quick actions
              </h2>
              <p className="text-sm text-muted-foreground">Get started quickly</p>
            </div>

            <div className="divide-y divide-border">
              <Link
                href="/class-plans/new"
                className="flex items-center gap-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Create plan</p>
                  <p className="text-sm text-muted-foreground">Build a new class</p>
                </div>
              </Link>

              <Link
                href="/exercises"
                className="flex items-center gap-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-muted">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Browse exercises</p>
                  <p className="text-sm text-muted-foreground">Explore the library</p>
                </div>
              </Link>

              <Link
                href="/exercises?add=true"
                className="flex items-center gap-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-muted">
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Add exercise</p>
                  <p className="text-sm text-muted-foreground">
                    Create custom exercise
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
