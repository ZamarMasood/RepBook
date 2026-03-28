"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { 
  apparatusOptions, 
  levelOptions, 
  getApparatusSettings, 
  getApparatusSettingsLabel,
  type Spring, 
  type ClassExercise, 
  type ClassPlan 
} from "@/lib/data"
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
  Green: "bg-green-600",
  Yellow: "bg-yellow-400",
  Black: "bg-gray-900",
  White: "bg-white border border-gray-300",
  Orange: "bg-orange-500",
  Classical: "bg-amber-700",
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

  // Drag state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

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

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const newExercises = [...classExercises]
    const [draggedItem] = newExercises.splice(draggedIndex, 1)
    newExercises.splice(dropIndex, 0, draggedItem)
    setClassExercises(newExercises)
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
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

  const getApparatusSettingsForExercise = (exerciseId: string) => {
    const exercise = getExerciseById(exerciseId)
    if (!exercise) return []
    return getApparatusSettings(exercise.apparatus)
  }

  const getSettingsLabelForExercise = (exerciseId: string) => {
    const exercise = getExerciseById(exerciseId)
    if (!exercise) return "Settings"
    return getApparatusSettingsLabel(exercise.apparatus)
  }

  const isReformerExercise = (exerciseId: string) => {
    const exercise = getExerciseById(exerciseId)
    return exercise?.apparatus === "Reformer"
  }

  const getApparatusBadgeColor = (apparatus: string) => {
    switch (apparatus) {
      case "Reformer":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Mat":
        return "bg-green-50 text-green-700 border-green-200"
      case "Wunda Chair":
      case "Chair":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Cadillac/Tower":
      case "Cadillac":
        return "bg-slate-100 text-slate-700 border-slate-200"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

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
        <div className="flex-1 overflow-auto p-6 bg-muted/30">
          <Link
            href="/class-plans"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Class Plans
          </Link>

          {/* Class Details - evenly spaced with more room for class name */}
          <div className="flex gap-4 mb-8">
            <div className="flex-[2] space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Class Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Full Body Flow"
                className="bg-card"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Apparatus
              </label>
              <Select value={apparatus} onValueChange={setApparatus}>
                <SelectTrigger className="bg-card">
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
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Duration
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-card">
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
            <div className="flex-1 space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Level
              </label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="bg-card">
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
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center bg-card">
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

                  const isCurrentlyEditing = editingExerciseIndex === index
                  const isReformer = isReformerExercise(classEx.exerciseId)
                  const isMat = exercise.apparatus === "Mat"
                  const settingsLabel = getSettingsLabelForExercise(classEx.exerciseId)
                  const settingsOptions = getApparatusSettingsForExercise(classEx.exerciseId)
                  const isDragging = draggedIndex === index
                  const isDragOver = dragOverIndex === index
                  const hasSprings = classEx.springs && classEx.springs.length > 0

                  return (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        "flex items-center bg-card border border-border rounded-lg transition-all cursor-grab active:cursor-grabbing",
                        isDragging && "opacity-50",
                        isDragOver && "border-primary border-2"
                      )}
                    >
                      {/* Exercise Name & Apparatus */}
                      <div className="flex-1 min-w-0 px-5 py-4 border-r border-border">
                        <p className="font-medium text-foreground truncate">
                          {exercise.name}
                        </p>
                        <Badge
                          variant="outline"
                          className={cn("mt-1.5 text-xs", getApparatusBadgeColor(exercise.apparatus))}
                        >
                          {exercise.apparatus}
                        </Badge>
                      </div>

                      {/* Reps Column */}
                      <div className="w-24 px-4 py-4 border-r border-border">
                        <p className="text-xs text-muted-foreground uppercase mb-1">
                          Reps
                        </p>
                        {isCurrentlyEditing ? (
                          <Input
                            type="number"
                            value={classEx.reps}
                            onChange={(e) => updateExerciseReps(index, parseInt(e.target.value) || 0)}
                            className="w-16 h-8 text-center"
                            min={1}
                          />
                        ) : (
                          <p className="font-semibold text-foreground text-lg">{classEx.reps}</p>
                        )}
                      </div>

                      {/* Springs/Props Column */}
                      <div className="w-44 px-4 py-4 border-r border-border min-h-[76px]">
                        {isCurrentlyEditing ? (
                          <div className="space-y-2">
                            {settingsOptions.length > 0 && (
                              <>
                                {(classEx.springs || []).map((spring, springIndex) => (
                                  <div key={springIndex} className="flex items-center gap-1">
                                    {isReformer && springColorMap[spring.color] && (
                                      <span className={cn("w-3 h-3 rounded-full shrink-0", springColorMap[spring.color])} />
                                    )}
                                    <Select
                                      value={spring.color}
                                      onValueChange={(v) => {
                                        const newSprings = [...(classEx.springs || [])]
                                        newSprings[springIndex] = { ...spring, color: v }
                                        updateExerciseSprings(index, newSprings)
                                      }}
                                    >
                                      <SelectTrigger className="h-7 text-xs flex-1">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {settingsOptions.map((c) => (
                                          <SelectItem key={c} value={c}>
                                            <span className="flex items-center gap-2">
                                              {isReformer && springColorMap[c] && (
                                                <span className={cn("w-2.5 h-2.5 rounded-full", springColorMap[c])} />
                                              )}
                                              {c}
                                            </span>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <Input
                                      type="number"
                                      value={spring.count}
                                      onChange={(e) => {
                                        const newSprings = [...(classEx.springs || [])]
                                        newSprings[springIndex] = { ...spring, count: parseInt(e.target.value) || 1 }
                                        updateExerciseSprings(index, newSprings)
                                      }}
                                      className="w-10 h-7 text-xs text-center"
                                      min={1}
                                    />
                                    <button
                                      onClick={() => {
                                        const newSprings = (classEx.springs || []).filter((_, i) => i !== springIndex)
                                        updateExerciseSprings(index, newSprings)
                                      }}
                                      className="p-0.5 rounded hover:bg-muted text-muted-foreground"
                                    >
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => {
                                    const defaultSetting = settingsOptions[0] || "Red"
                                    const newSprings = [...(classEx.springs || []), { color: defaultSetting, count: 1 }]
                                    updateExerciseSprings(index, newSprings)
                                  }}
                                  className="w-full py-1.5 border border-dashed border-border rounded text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                                >
                                  + Add {isMat ? "prop" : "spring"}
                                </button>
                              </>
                            )}
                          </div>
                        ) : (
                          <>
                            {hasSprings ? (
                              <>
                                <p className="text-xs text-muted-foreground uppercase mb-1">
                                  {settingsLabel}
                                </p>
                                <div className="space-y-0.5">
                                  {classEx.springs!.map((spring, i) => (
                                    <span key={i} className="flex items-center gap-1.5 text-sm font-medium">
                                      {isReformer && springColorMap[spring.color] && (
                                        <span className={cn("w-2.5 h-2.5 rounded-full", springColorMap[spring.color])} />
                                      )}
                                      <span>{spring.count}</span>
                                      <span className="text-foreground">{spring.color}</span>
                                    </span>
                                  ))}
                                </div>
                              </>
                            ) : (
                              // Empty state - no label shown for Mat when no props
                              <div />
                            )}
                          </>
                        )}
                      </div>

                      {/* Actions Column */}
                      <div className="flex items-center gap-2 px-4 py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingExerciseIndex(isCurrentlyEditing ? null : index)}
                          className={cn(
                            "text-xs",
                            isCurrentlyEditing ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted/50"
                          )}
                        >
                          {isCurrentlyEditing ? "Done" : "Edit"}
                        </Button>
                        <button
                          onClick={() => removeExercise(index)}
                          className="p-2 rounded-md text-muted-foreground hover:text-destructive transition-colors"
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
        <div className="p-5">
          <h2 className="text-xl font-serif text-foreground mb-5">
            Exercise Library
          </h2>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              value={exerciseSearch}
              onChange={(e) => setExerciseSearch(e.target.value)}
              className="pl-10 bg-muted/50 border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap gap-1.5">
              {["All", "Reformer", "Mat", "Wunda Chair", "Cadillac/Tower"].map(
                (a) => (
                  <button
                    key={a}
                    onClick={() => setExerciseApparatusFilter(a)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      exerciseApparatusFilter === a
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {a === "Cadillac/Tower" ? "Cadillac Tower" : a}
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
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
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

        {/* Exercise List - no separators, circular + button */}
        <div className="flex-1 overflow-auto px-2">
          {filteredExercises.map((exercise) => {
            const isAdded = classExercises.some(
              (ce) => ce.exerciseId === exercise.id
            )
            return (
              <div
                key={exercise.id}
                className="group flex items-center justify-between px-3 py-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {exercise.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {exercise.apparatus === "Cadillac/Tower" ? "Cadillac Tower" : exercise.apparatus} · {exercise.level}
                  </p>
                </div>
                <button
                  onClick={() => addExerciseToClass(exercise.id)}
                  disabled={isAdded}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    isAdded
                      ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                      : "bg-transparent text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
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
