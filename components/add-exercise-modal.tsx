"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { apparatusOptions, levelOptions, springColors, type Spring, type Exercise } from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { X, Plus } from "lucide-react"

interface AddExerciseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  exercise?: Exercise | null
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

  const addSpring = () => {
    setSprings([...springs, { color: "Red", count: 1 }])
  }

  const updateSpring = (index: number, updates: Partial<Spring>) => {
    setSprings(
      springs.map((s, i) => (i === index ? { ...s, ...updates } : s))
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
              <Select value={apparatus} onValueChange={setApparatus}>
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

          {/* Springs */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Springs
            </Label>
            <div className="space-y-2">
              {springs.map((spring, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Select
                    value={spring.color}
                    onValueChange={(v) =>
                      updateSpring(index, { color: v as Spring["color"] })
                    }
                  >
                    <SelectTrigger className="w-28">
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
                    onChange={(e) =>
                      updateSpring(index, {
                        count: parseInt(e.target.value) || 1,
                      })
                    }
                    min={1}
                    className="w-20"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpring(index)}
                    className="p-2 rounded-md hover:bg-muted text-muted-foreground"
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
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Spring
              </Button>
            </div>
          </div>

          {/* Props */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Props
            </Label>
            <Input
              value={props}
              onChange={(e) => setProps(e.target.value)}
              placeholder="None"
            />
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
