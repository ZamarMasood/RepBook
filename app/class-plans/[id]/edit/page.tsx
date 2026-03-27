"use client"

import { use } from "react"
import { AppShell } from "@/components/app-shell"
import { ClassPlanEditorWrapper } from "@/components/class-plan-editor-wrapper"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <AppShell>
      <ClassPlanEditorWrapper planId={id} />
    </AppShell>
  )
}
