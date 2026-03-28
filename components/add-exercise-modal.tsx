"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { 
  apparatusOptions, 
  levelOptions, 
  reformerSprings,
  chairSprings,
  cadillacSprings,
  matProps,
  type Spring, 
  type Exercise 
} from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { X, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddExerciseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercise?: Exercise | null
}

const springColorMap: Record<string, string> = {
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Yellow: "bg-yellow-400",
  Black: "bg-black",
  White: "bg-white border border-gray-300",
  Orange: "bg-orange-500",
}

export function AddExerciseModal({
  open,
  onOpenChange,
  exercise,
}: AddExerciseModalProps) {
  const { addExercise, updateExercise } = useAppStore()
  const isEditing = !!exercise

  const [name, setName] = useState("")
  const [apparatus, setApparatus] = useState("Reformer")
  const [level, setLevel] = useState<Exercise["level"]>("All Levels")
  const [position, setPosition] = useState("")
  const [defaultReps, setDefaultReps] = useState(10)
  const [springs, setSprings] = useState<Spring[]>([])
  const [props, setProps] = useState("")
  const [setup, setSetup] = useState("")
  const [cues, setCues] = useState("")
  const [modifications, setModifications] = useState("")

  useEffect(() => {
    if (exercise) {
      setName(exercise.name)
      setApparatus(exercise.apparatus)
      setLevel(exercise.level)
      setPosition(exercise.position || "")
      setDefaultReps(exercise.defaultReps)
      setSprings(exercise.springs || [])
      setProps(exercise.props || "")
      setSetup(exercise.setup || "")
      setCues(exercise.cues || "")
      setModifications(exercise.modifications || "")
    } else {
      resetForm()
    }
  }, [exercise, open])

  const resetForm = () => {
    setName("")
    setApparatus("Reformer")
    setLevel("All Levels")
    setPosition("")
    setDefaultReps(10)
    setSprings([])
    setProps("")
    setSetup("")
    setCues("")
    setModifications("")
  }

  // Get spring options based on apparatus
  const getSpringOptions = () => {
    switch (apparatus) {
      case "Reformer":
        return reformerSprings
      case "Wunda Chair":
        return chairSprings
      case "Cadillac/Tower":
        return cadillacSprings
      default:
        return []
    }
  }

  const springOptions = getSpringOptions()
  const isReformer = apparatus === "Reformer"
  const isChair = apparatus === "Wunda Chair"
  const isCadillac = apparatus === "Cadillac/Tower"
  const isMat = apparatus === "Mat"
  const showSprings = isReformer || isChair || isCadillac

  const addSpring = () => {
    const defaultColor = springOptions[0] || "Red"
    setSprings([...springs, { color: defaultColor, count: 1 }])
  }

  const updateSpring = (index: number, updates: Partial<Spring>) => {
    setSprings(
      springs.map((s, i) => (i === index ? { ...s, ...updates } : s))
    )
  }

  const incrementSpring = (index: number) => {
    setSprings(
      springs.map((s, i) => (i === index ? { ...s, count: s.count + 1 } : s))
    )
  }

  const decrementSpring = (index: number) => {
    setSprings(
      springs.map((s, i) => (i === index ? { ...s, count: Math.max(1, s.count - 1) } : s))
    )
  }

  const removeSpring = (index: number) => {
    setSprings(springs.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const exerciseData = {
      name,
      apparatus,
      level,
      position: position || undefined,
      defaultReps,
      springs: springs.length > 0 ? springs : undefined,
      props: props || undefined,
      setup: setup || undefined,
      cues: cues || undefined,
      modifications: modifications || undefined,
    }

    if (isEditing && exercise) {
      updateExercise(exercise.id, exerciseData)
    } else {
      addExercise(exerciseData)
    }

    onOpenChange(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogDescription className="sr-only">
          {isEditing ? "Edit exercise details" : "Add a new exercise to your library"}
        </DialogDescription>
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditing ? "Edit Exercise" : "Add Exercise"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Exercise Name */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Exercise Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Footwork — Parallel"
              required
            />
          </div>

          {/* Apparatus & Level */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Apparatus
              </Label>
              <Select value={apparatus} onValueChange={(v) => {
                setApparatus(v)
                setSprings([]) // Reset springs when apparatus changes
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {apparatusOptions
                    .filter((a) => a !== "All" && a !== "Mixed")
                    .map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Level
              </Label>
              <Select value={level} onValueChange={(v) => setLevel(v as Exercise["level"])}>
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

          {/* Position & Default Reps */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Position
              </Label>
              <Input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Supine"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Default Reps
              </Label>
              <Input
                type="number"
                value={defaultReps}
                onChange={(e) => setDefaultReps(parseInt(e.target.value) || 0)}
                min={1}
              />
            </div>
          </div>

          {/* Springs - Only for Reformer, Chair, Cadillac */}
          {showSprings && (
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Springs
              </Label>
              <div className="space-y-2">
                {springs.map((spring, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Select
                      value={spring.color}
                      onValueChange={(v) => updateSpring(index, { color: v })}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue>
                          <span className="flex items-center gap-2">
                            {isReformer && spring.color !== "Classical" && springColorMap[spring.color] && (
                              <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", springColorMap[spring.color])} />
                            )}
                            {spring.color}
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {springOptions.map((c) => (
                          <SelectItem key={c} value={c}>
                            <span className="flex items-center gap-2">
                              {isReformer && c !== "Classical" && springColorMap[c] && (
                                <span className={cn("w-2.5 h-2.5 rounded-full", springColorMap[c])} />
                              )}
                              {c}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* +/- buttons for count - Reformer and Chair only */}
                    {(isReformer || isChair) && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => decrementSpring(index)}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center font-medium">{spring.count}</span>
                        <button
                          type="button"
                          onClick={() => incrementSpring(index)}
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => removeSpring(index)}
                      className="p-2 rounded-md hover:bg-muted text-muted-foreground ml-auto"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSpring}
                  className="w-full border-primary text-primary hover:bg-primary/5"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Spring
                </Button>
              </div>
            </div>
          )}

          {/* Props - dropdown for all apparatus */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Props
            </Label>
            <Select value={props || "none"} onValueChange={(v) => setProps(v === "none" ? "" : v)}>
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {matProps.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Setup */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Setup
            </Label>
            <Textarea
              value={setup}
              onChange={(e) => setSetup(e.target.value)}
              placeholder="Equipment setup, footbar height, headrest position..."
              rows={3}
            />
          </div>

          {/* Cues */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Cues
            </Label>
            <Textarea
              value={cues}
              onChange={(e) => setCues(e.target.value)}
              placeholder="Verbal cues for clients..."
              rows={3}
            />
          </div>

          {/* Modifications */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Modifications
            </Label>
            <Textarea
              value={modifications}
              onChange={(e) => setModifications(e.target.value)}
              placeholder="Modifications for different needs..."
              rows={2}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Exercise"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
