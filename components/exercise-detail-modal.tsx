"use client"

import type { Exercise } from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExerciseDetailModalProps {
  exercise: Exercise | null
  onClose: () => void
  onEdit: (exercise: Exercise) => void
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

export function ExerciseDetailModal({
  exercise,
  onClose,
  onEdit,
}: ExerciseDetailModalProps) {
  if (!exercise) return null

  const isReformer = exercise.apparatus === "Reformer"

  return (
    <Dialog open={!!exercise} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogDescription className="sr-only">
          Exercise details for {exercise.name}
        </DialogDescription>
        <DialogHeader className="flex flex-row items-start justify-between gap-4 pr-8">
          <DialogTitle className="text-2xl font-serif font-normal text-foreground">
            {exercise.name}
          </DialogTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(exercise)}
            className="shrink-0"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Apparatus
              </p>
              <p className="text-foreground font-medium">{exercise.apparatus}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Level
              </p>
              <p className="text-foreground font-medium">{exercise.level}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Position
              </p>
              <p className="text-foreground font-medium">{exercise.position || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Props
              </p>
              <p className="text-foreground font-medium">{exercise.props || "None"}</p>
            </div>
          </div>

          <hr className="border-border" />

          {/* Reps & Springs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Reps
              </p>
              <p className="text-lg font-semibold text-foreground">
                {exercise.defaultReps}
              </p>
            </div>
            {exercise.springs && exercise.springs.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                  Springs
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {exercise.springs.map((spring, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      {isReformer && spring.color !== "Classical" && springColorMap[spring.color] && (
                        <span
                          className={cn(
                            "w-3 h-3 rounded-full",
                            springColorMap[spring.color]
                          )}
                        />
                      )}
                      <span className="text-foreground font-medium">
                        {(isReformer || exercise.apparatus === "Wunda Chair") && spring.count}{" "}
                        {spring.color}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Setup */}
          {exercise.setup && (
            <>
              <hr className="border-border" />
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Setup
                </p>
                <p className="text-foreground leading-relaxed">
                  {exercise.setup}
                </p>
              </div>
            </>
          )}

          {/* Cues */}
          {exercise.cues && (
            <>
              <hr className="border-border" />
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Cues
                </p>
                <p className="text-foreground leading-relaxed">{exercise.cues}</p>
              </div>
            </>
          )}

          {/* Modifications */}
          {exercise.modifications && (
            <>
              <hr className="border-border" />
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Modifications
                </p>
                <p className="text-foreground leading-relaxed">
                  {exercise.modifications}
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
