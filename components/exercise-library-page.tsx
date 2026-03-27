"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { apparatusOptions, levelOptions } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye, Edit2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { AddExerciseModal } from "./add-exercise-modal"
import { ExerciseDetailModal } from "./exercise-detail-modal"
import type { Exercise } from "@/lib/data"

export function ExerciseLibraryPage() {
  const { exercises, deleteExercise } = useAppStore()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState("")
  const [levelFilter, setLevelFilter] = useState("All Levels")
  const [apparatusFilter, setApparatusFilter] = useState("All")
  const [showAddModal, setShowAddModal] = useState(searchParams.get("add") === "true")
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase())
      const matchesLevel =
        levelFilter === "All Levels" || ex.level === levelFilter
      const matchesApparatus =
        apparatusFilter === "All" || ex.apparatus === apparatusFilter
      return matchesSearch && matchesLevel && matchesApparatus
    })
  }, [exercises, search, levelFilter, apparatusFilter])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this exercise?")) {
      deleteExercise(id)
    }
  }

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Intermediate":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Advanced":
        return "bg-rose-100 text-rose-700 border-rose-200"
      default:
        return "bg-primary/10 text-primary border-primary/20"
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl mb-1">
            <span className="font-medium text-foreground">Exercise </span>
            <span className="font-serif italic text-muted-foreground">
              Library
            </span>
          </h1>
          <p className="text-muted-foreground">
            {exercises.length} exercises saved
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Exercise
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-6">
        {/* Level Filter */}
        <div className="flex flex-wrap gap-2">
          {levelOptions.map((level) => (
            <button
              key={level}
              onClick={() => setLevelFilter(level)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                levelFilter === level
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Apparatus Filter */}
        <div className="flex flex-wrap gap-2">
          {apparatusOptions.filter((a) => a !== "Mixed").map((apparatus) => (
            <button
              key={apparatus}
              onClick={() => setApparatusFilter(apparatus)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                apparatusFilter === apparatus
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {apparatus}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-[1fr_180px_140px_100px] gap-4 px-6 py-3 border-b border-border bg-muted/50">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Exercise
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Apparatus
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Level
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">
            Actions
          </span>
        </div>

        <div className="divide-y divide-border">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="grid grid-cols-[1fr_180px_140px_100px] gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors"
            >
              <span className="font-medium text-foreground">{exercise.name}</span>
              <span className="text-muted-foreground">{exercise.apparatus}</span>
              <Badge
                variant="outline"
                className={cn("w-fit", getLevelBadgeClass(exercise.level))}
              >
                {exercise.level}
              </Badge>
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => setSelectedExercise(exercise)}
                  className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setEditingExercise(exercise)}
                  className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(exercise.id)}
                  className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredExercises.length === 0 && (
            <div className="px-6 py-12 text-center text-muted-foreground">
              No exercises found matching your filters.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddExerciseModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
      
      <AddExerciseModal
        open={!!editingExercise}
        onOpenChange={(open) => !open && setEditingExercise(null)}
        exercise={editingExercise}
      />

      <ExerciseDetailModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onEdit={(ex) => {
          setSelectedExercise(null)
          setEditingExercise(ex)
        }}
      />
    </div>
  )
}
