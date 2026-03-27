"use client"

import { use } from "react"
import { AppShell } from "@/components/app-shell"
import { ClassPlanDetail } from "@/components/class-plan-detail"

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <AppShell>
      <ClassPlanDetail planId={id} />
    </AppShell>
  )
}
