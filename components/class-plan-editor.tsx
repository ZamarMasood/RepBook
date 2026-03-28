"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { apparatusOptions, levelOptions, springColors, type Spring, type ClassExercise, type ClassPlan } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, Plus, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClassPlanEditorProps {
  existingPlan?: ClassPlan
}

const springColorMap: Record<string, string> = {
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Yellow: "bg-yellow-500",
  L: "bg-gray-400",
}

export function ClassPlanEditor({ existingPlan }: ClassPlanEditorProps) {
  const router = useRouter()
  const { exercises, addClassPlan, updateClassPlan } = useAppStore()
  const isEditing = !!existingPlan

  // Form state
  const [name, setName] = useState(existingPlan?.name || "")
  const [apparatus, setApparatus] = useState(existingPlan?.apparatus || "Reformer")
  const [duration, setDuration] = useState(existingPlan?.duration || "55 min")
  const [level, setLevel] = useState(existingPlan?.level || "Intermediate")
  const [classExercises, setClassExercises] = useState<ClassExercise[]>(
    existingPlan?.exercises || []
  )

  // Exercise library filters
  const [exerciseSearch, setExerciseSearch] = useState("")
  const [exerciseApparatusFilter, setExerciseApparatusFilter] = useState("All")
  const [exerciseLevelFilter, setExerciseLevelFilter] = useState("All Levels")

  // Editing state for individual exercises
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null)

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(exerciseSearch.toLowerCase())
      const matchesApparatus =
        exerciseApparatusFilter === "All" || ex.apparatus === exerciseApparatusFilter
      const matchesLevel =
        exerciseLevelFilter === "All Levels" || ex.level === exerciseLevelFilter
      return matchesSearch && matchesApparatus && matchesLevel
    })
  }, [exercises, exerciseSearch, exerciseApparatusFilter, exerciseLevelFilter])

  const addExerciseToClass = (exerciseId: string) => {
    const exercise = exercises.find((ex) => ex.id === exerciseId)
    if (!exercise) return

    const newClassExercise: ClassExercise = {
      exerciseId,
      reps: exercise.defaultReps,
      springs: exercise.springs ? [...exercise.springs] : undefined,
    }
    setClassExercises([...classExercises, newClassExercise])
  }

  const removeExercise = (index: number) => {
    setClassExercises(classExercises.filter((_, i) => i !== index))
    if (editingExerciseIndex === index) {
      setEditingExerciseIndex(null)
    }
  }

  const updateExerciseReps = (index: number, reps: number) => {
    setClassExercises(
      classExercises.map((ex, i) => (i === index ? { ...ex, reps } : ex))
    )
  }

  const updateExerciseSprings = (index: number, springs: Spring[]) => {
    setClassExercises(
      classExercises.map((ex, i) =>
        i === index ? { ...ex, springs: springs.length > 0 ? springs : undefined } : ex
      )
    )
  }

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter a class name")
      return
    }

    const planData = {
      name,
      apparatus,
      duration,
      level,
      exercises: classExercises,
      isFavorite: existingPlan?.isFavorite || false,
    }

    if (isEditing && existingPlan) {
      updateClassPlan(existingPlan.id, planData)
    } else {
      addClassPlan(planData)
    }

    router.push("/class-plans")
  }

  const getExerciseById = (id: string) => exercises.find((ex) => ex.id === id)

  return (
    <div className="flex h-full">
      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-background">
          <span className="text-sm text-muted-foreground">
            {classExercises.length} exercises
          </span>
          <div className="flex items-center gap-3">
            <Link href="/class-plans">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleSave}>Save Class Plan</Button>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-auto p-6">
          <Link
            href="/class-plans"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Class Plans
          </Link>

          {/* Class Details */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Class Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Full Body Flow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Apparatus
              </label>
              <Select value={apparatus} onValueChange={setApparatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {apparatusOptions.filter((a) => a !== "All").map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Duration
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["30 min", "45 min", "50 min", "55 min", "60 min", "75 min", "90 min"].map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Level
              </label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levelOptions.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Class Exercises */}
          <div>
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Class Exercises
            </h2>

            {classExercises.length === 0 ? (
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
                <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Search and add exercises from the library
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {classExercises.map((classEx, index) => {
                  const exercise = getExerciseById(classEx.exerciseId)
                  if (!exercise) return null

                  const isEditing = editingExerciseIndex === index

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">
                          {exercise.name}
                        </p>
                        <Badge
                          variant="outline"
                          className="mt-1 text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {exercise.apparatus}
                        </Badge>
                      </div>

                      {/* Reps */}
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase mb-1">
                          Reps
                        </p>
                        <Input
                          type="number"
                          value={classEx.reps}
                          onChange={(e) =>
                            updateExerciseReps(index, parseInt(e.target.value) || 0)
                          }
                          className="w-16 text-center"
                          min={1}
                        />
                      </div>

                      {/* Springs */}
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <div className="space-y-2">
                            {(classEx.springs || []).map((spring, springIndex) => (
                              <div key={springIndex} className="flex items-center gap-1">
                                <Select
                                  value={spring.color}
                                  onValueChange={(v) => {
                                    const newSprings = [...(classEx.springs || [])]
                                    newSprings[springIndex] = {
                                      ...spring,
                                      color: v as Spring["color"],
                                    }
                                    updateExerciseSprings(index, newSprings)
                                  }}
                                >
                                  <SelectTrigger className="w-20 h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {springColors.map((c) => (
                                      <SelectItem key={c} value={c}>
                                        {c}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input
                                  type="number"
                                  value={spring.count}
                                  onChange={(e) => {
                                    const newSprings = [...(classEx.springs || [])]
                                    newSprings[springIndex] = {
                                      ...spring,
                                      count: parseInt(e.target.value) || 1,
                                    }
                                    updateExerciseSprings(index, newSprings)
                                  }}
                                  className="w-12 h-8"
                                  min={1}
                                />
                                <button
                                  onClick={() => {
                                    const newSprings = (classEx.springs || []).filter(
                                      (_, i) => i !== springIndex
                                    )
                                    updateExerciseSprings(index, newSprings)
                                  }}
                                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newSprings = [
                                  ...(classEx.springs || []),
                                  { color: "Red" as const, count: 1 },
                                ]
                                updateExerciseSprings(index, newSprings)
                              }}
                              className="w-full text-xs"
                            >
                              + Add spring
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => setEditingExerciseIndex(null)}
                          >
                            Done
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center min-w-24">
                          <p className="text-xs text-muted-foreground uppercase mb-1">
                            Springs
                          </p>
                          {classEx.springs && classEx.springs.length > 0 ? (
                            <div className="flex items-center justify-center gap-1">
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
                          ) : (
                            <span className="text-sm text-muted-foreground">—</span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {!isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingExerciseIndex(index)}
                          >
                            Edit
                          </Button>
                        )}
                        <button
                          onClick={() => removeExercise(index)}
                          className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Library Sidebar */}
      <div className="w-96 border-l border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Exercise Library
          </h2>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={exerciseSearch}
              onChange={(e) => setExerciseSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {["All", "Reformer", "Mat", "Wunda Chair", "Cadillac/Tower"].map(
                (a) => (
                  <button
                    key={a}
                    onClick={() => setExerciseApparatusFilter(a)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                      exerciseApparatusFilter === a
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {a}
                  </button>
                )
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {levelOptions.map((l) => (
                <button
                  key={l}
                  onClick={() => setExerciseLevelFilter(l)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
                    exerciseLevelFilter === l
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex-1 overflow-auto">
          {filteredExercises.map((exercise) => {
            const isAdded = classExercises.some(
              (ce) => ce.exerciseId === exercise.id
            )
            return (
              <div
                key={exercise.id}
                className="flex items-center justify-between p-3 border-b border-border hover:bg-muted/30 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {exercise.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {exercise.apparatus} · {exercise.level}
                  </p>
                </div>
                <button
                  onClick={() => addExerciseToClass(exercise.id)}
                  disabled={isAdded}
                  className={cn(
                    "p-1.5 rounded-full transition-colors",
                    isAdded
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )
          })}

          {filteredExercises.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No exercises found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
