"use client"

import { useAppStore } from "@/lib/store"
import { AppSidebar } from "./app-sidebar"
import { LoginScreen } from "./login-screen"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAppStore()

  if (!currentUser) {
    return <LoginScreen />
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
