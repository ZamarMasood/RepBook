"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit2, Star, Clock, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClassPlanDetailProps {
  planId: string
}

const springColorMap: Record<string, string> = {
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Yellow: "bg-yellow-500",
  L: "bg-gray-400",
}

export function ClassPlanDetail({ planId }: ClassPlanDetailProps) {
  const router = useRouter()
  const { classPlans, exercises, toggleFavorite, deleteClassPlan } = useAppStore()

  const plan = classPlans.find((p) => p.id === planId)

  if (!plan) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Class plan not found.</p>
        <Link href="/class-plans" className="text-primary hover:underline mt-2 block">
          Back to Class Plans
        </Link>
      </div>
    )
  }

  const getExerciseById = (id: string) => exercises.find((ex) => ex.id === id)

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this class plan?")) {
      deleteClassPlan(plan.id)
      router.push("/class-plans")
    }
  }

  const getApparatusBadgeClass = (apparatus: string) => {
    switch (apparatus) {
      case "Reformer":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Mat":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Wunda Chair":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Cadillac/Tower":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Mixed":
        return "bg-slate-100 text-slate-700 border-slate-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/class-plans"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Class Plans
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-semibold text-foreground">{plan.name}</h1>
            <button
              onClick={() => toggleFavorite(plan.id)}
              className="p-1 rounded hover:bg-muted transition-colors"
            >
              <Star
                className={cn(
                  "h-5 w-5",
                  plan.isFavorite
                    ? "text-amber-500 fill-amber-500"
                    : "text-muted-foreground"
                )}
              />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={cn("text-sm", getApparatusBadgeClass(plan.apparatus))}
            >
              {plan.apparatus}
            </Badge>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              {plan.duration}
            </span>
            <Badge variant="outline" className="text-sm">
              {plan.level}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/class-plans/${plan.id}/edit`}>
            <Button variant="outline" className="gap-2">
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Exercises */}
      <div>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Exercises ({plan.exercises.length})
        </h2>

        <div className="space-y-3">
          {plan.exercises.map((classEx, index) => {
            const exercise = getExerciseById(classEx.exerciseId)
            if (!exercise) return null

            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg"
              >
                <span className="text-sm text-muted-foreground w-6">
                  {index + 1}.
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{exercise.name}</p>
                  <Badge
                    variant="outline"
                    className="mt-1 text-xs bg-primary/10 text-primary border-primary/20"
                  >
                    {exercise.apparatus}
                  </Badge>
                </div>

                <div className="text-center min-w-16">
                  <p className="text-xs text-muted-foreground uppercase mb-1">
                    Reps
                  </p>
                  <p className="font-semibold text-foreground">{classEx.reps}</p>
                </div>

                {classEx.springs && classEx.springs.length > 0 && (
                  <div className="text-center min-w-24">
                    <p className="text-xs text-muted-foreground uppercase mb-1">
                      Springs
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      {classEx.springs.map((spring, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span
                            className={cn(
                              "w-2.5 h-2.5 rounded-full",
                              springColorMap[spring.color] || "bg-gray-400"
                            )}
                          />
                          <span className="text-sm">
                            {spring.count} {spring.color}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {plan.exercises.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No exercises in this class plan.
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Last edited {plan.lastEdited}
        </p>
      </div>
    </div>
  )
}
