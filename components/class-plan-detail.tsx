"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Edit2, Star, Trash2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClassPlanDetailProps {
  planId: string
}

const springColorMap: Record<string, string> = {
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Yellow: "bg-yellow-400",
  Black: "bg-gray-900",
  White: "bg-white border border-gray-300",
  Orange: "bg-orange-500",
}

export function ClassPlanDetail({ planId }: ClassPlanDetailProps) {
  const router = useRouter()
  const { classPlans, exercises, toggleFavorite, deleteClassPlan } = useAppStore()
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)

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
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Mat":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Wunda Chair":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Cadillac/Tower":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "Mixed":
        return "bg-stone-100 text-stone-700 border-stone-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getExerciseBadgeClass = (apparatus: string) => {
    switch (apparatus) {
      case "Reformer":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Mat":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Wunda Chair":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Cadillac/Tower":
        return "bg-slate-100 text-slate-700 border-slate-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getAccentBorderClass = (apparatus: string) => {
    switch (apparatus) {
      case "Reformer":
        return "border-l-blue-400"
      case "Mat":
        return "border-l-emerald-400"
      case "Wunda Chair":
        return "border-l-amber-400"
      case "Cadillac/Tower":
        return "border-l-slate-400"
      default:
        return "border-l-gray-400"
    }
  }

  const isReformer = (apparatus: string) => apparatus === "Reformer"
  const isChair = (apparatus: string) => apparatus === "Wunda Chair"

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Back Link */}
      <Link
        href="/class-plans"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Class Plans
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-serif text-foreground">{plan.name}</h1>
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

        <Link href={`/class-plans/${plan.id}/edit`}>
          <Button variant="outline" className="gap-2">
            <Edit2 className="h-4 w-4" />
            Edit Plan
          </Button>
        </Link>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mb-6">
        <Badge
          variant="outline"
          className={cn("text-sm rounded-full px-3", getApparatusBadgeClass(plan.apparatus))}
        >
          {plan.apparatus}
        </Badge>
        <Badge variant="outline" className="text-sm rounded-full px-3 bg-background">
          {plan.duration}
        </Badge>
        <Badge variant="outline" className="text-sm rounded-full px-3 bg-background">
          {plan.level}
        </Badge>
      </div>

      {/* Divider */}
      <div className="border-t border-border mb-8" />

      {/* Exercises */}
      <div>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Exercises
        </h2>

        <div className="space-y-3">
          {plan.exercises.map((classEx, index) => {
            const exercise = getExerciseById(classEx.exerciseId)
            if (!exercise) return null

            const isExpanded = expandedExercise === index
            const hasNotes = exercise.setup || exercise.cues || exercise.modifications

            return (
              <div
                key={index}
                className={cn(
                  "bg-card border border-border rounded-lg overflow-hidden border-l-4",
                  getAccentBorderClass(exercise.apparatus)
                )}
              >
                {/* Main Row */}
                <div
                  onClick={() => hasNotes && setExpandedExercise(isExpanded ? null : index)}
                  className={cn(
                    "flex items-center",
                    hasNotes && "cursor-pointer hover:bg-muted/30 transition-colors"
                  )}
                >
                  {/* Exercise Name & Badge */}
                  <div className="flex-1 min-w-0 p-4">
                    <p className="font-medium text-foreground text-lg">{exercise.name}</p>
                    <Badge
                      variant="outline"
                      className={cn("mt-1 text-xs", getExerciseBadgeClass(exercise.apparatus))}
                    >
                      {exercise.apparatus === "Wunda Chair" ? "Chair" : exercise.apparatus === "Cadillac/Tower" ? "Cadillac" : exercise.apparatus}
                    </Badge>
                  </div>

                  {/* Reps Column */}
                  <div className="w-20 p-4 border-l border-border">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Reps</p>
                    <p className="font-semibold text-foreground text-lg">{classEx.reps}</p>
                  </div>

                  {/* Springs Column */}
                  <div className="w-32 p-4 border-l border-border">
                    {classEx.springs && classEx.springs.length > 0 ? (
                      <>
                        <p className="text-xs text-muted-foreground uppercase mb-1">
                          {exercise.apparatus === "Mat" ? "Props" : "Springs"}
                        </p>
                        <div className="space-y-1">
                          {classEx.springs.map((spring, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                              {isReformer(exercise.apparatus) && spring.color !== "Classical" && springColorMap[spring.color] && (
                                <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", springColorMap[spring.color])} />
                              )}
                              {(isReformer(exercise.apparatus) || isChair(exercise.apparatus)) && (
                                <span className="font-semibold">{spring.count}</span>
                              )}
                              <span className="text-foreground">
                                {isChair(exercise.apparatus) ? spring.color.charAt(0) : spring.color}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="h-8" />
                    )}
                  </div>

                  {/* Expand Arrow */}
                  {hasNotes && (
                    <div className="px-3">
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          isExpanded && "rotate-180"
                        )} 
                      />
                    </div>
                  )}
                </div>

                {/* Expanded Notes */}
                {isExpanded && hasNotes && (
                  <div className="border-t border-border bg-muted/20 p-4 space-y-4">
                    {exercise.setup && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Setup</p>
                        <p className="text-sm text-foreground">{exercise.setup}</p>
                      </div>
                    )}
                    {exercise.cues && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Cues</p>
                        <p className="text-sm text-foreground">{exercise.cues}</p>
                      </div>
                    )}
                    {exercise.modifications && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Modifications</p>
                        <p className="text-sm text-foreground">{exercise.modifications}</p>
                      </div>
                    )}
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

      {/* Footer Actions */}
      <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Last edited {plan.lastEdited}
        </p>
        <Button
          variant="ghost"
          onClick={handleDelete}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Plan
        </Button>
      </div>
    </div>
  )
}
