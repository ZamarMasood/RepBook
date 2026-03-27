"use client"

import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { ClassPlanEditor } from "./class-plan-editor"

interface ClassPlanEditorWrapperProps {
  planId: string
}

export function ClassPlanEditorWrapper({ planId }: ClassPlanEditorWrapperProps) {
  const { classPlans } = useAppStore()
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

  return <ClassPlanEditor existingPlan={plan} />
}
