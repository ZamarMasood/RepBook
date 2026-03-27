"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, FileText, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/class-plans", label: "My Class Plans", icon: LayoutGrid },
  { href: "/exercises", label: "Exercise Library", icon: FileText },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { currentUser } = useAppStore()
  const [collapsed, setCollapsed] = useState(false)

  if (!currentUser) return null

  const initials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link href="/" className="text-xl tracking-tight">
            <span className="font-medium text-foreground">rep</span>
            <span className="font-serif italic text-muted-foreground">book</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-muted-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
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
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <Link
        href="/profile"
        className={cn(
          "flex items-center gap-3 p-4 border-t border-sidebar-border hover:bg-sidebar-accent transition-colors",
          collapsed && "justify-center"
        )}
      >
        <Avatar className="h-9 w-9 bg-accent text-accent-foreground shrink-0">
          <AvatarFallback className="text-xs font-medium bg-accent text-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-foreground truncate">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentUser.studioName}
            </p>
          </div>
        )}
      </Link>
    </aside>
  )
}
