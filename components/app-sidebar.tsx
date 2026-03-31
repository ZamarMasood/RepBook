"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Library, BookOpen, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/exercises", label: "Exercise Library", icon: Library },
  { href: "/class-plans", label: "Class Plans", icon: BookOpen },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { currentUser, logout } = useAppStore()

  if (!currentUser) return null

  const initials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`

  return (
    <aside
      className="flex flex-col bg-white h-screen shrink-0"
      style={{ width: 224, borderRight: "0.8px solid #E0E0E0" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 14,
            backgroundColor: "#4A6580",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          R
        </div>
        <span
          style={{
            color: "#4A6580",
            fontWeight: 700,
            fontSize: 18,
            lineHeight: "20px",
          }}
        >
          Repbook
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-2 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
              )}
              style={isActive ? { backgroundColor: "#EDF1F5", color: "#4A6580" } : undefined}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </div>
              {isActive && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#4A6580",
                    flexShrink: 0,
                  }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile + Logout */}
      <div
        style={{
          borderTop: "0.8px solid #E0E0E0",
          paddingTop: 12.8,
          paddingRight: 12,
          paddingLeft: 12,
          paddingBottom: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            paddingRight: 8,
            paddingLeft: 8,
            borderRadius: 14,
            height: 48,
          }}
        >
          <Link
            href="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flex: 1,
              minWidth: 0,
              textDecoration: "none",
            }}
          >
            <Avatar className="shrink-0" style={{ width: 36, height: 36, backgroundColor: "#4A6580" }}>
              <AvatarFallback
                style={{ backgroundColor: "#4A6580", color: "#FFFFFF", fontSize: 12, fontWeight: 500 }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div style={{ width: 105.2, flexShrink: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#2B2B2B", margin: 0, whiteSpace: "nowrap" }}>
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p style={{ fontSize: 11, color: "#828282", margin: 0, marginTop: 1, whiteSpace: "nowrap", height: 15, lineHeight: "15px" }}>
                {currentUser.studioName}
              </p>
            </div>
          </Link>
          <button
            onClick={logout}
            style={{
              width: 22,
              height: 22,
              borderRadius: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            title="Logout"
          >
            <LogOut size={14} color="#828282" />
          </button>
        </div>
      </div>
    </aside>
  )
}
