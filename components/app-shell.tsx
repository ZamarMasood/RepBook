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
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#F5F3F0" }}>
      <AppSidebar />
      <main className="flex-1 overflow-auto" style={{ padding: 60 }}>
        <div style={{ maxWidth: 987 }}>
          {children}
        </div>
      </main>
    </div>
  )
}
