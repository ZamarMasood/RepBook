"use client"

import Link from "next/link"
import { useAppStore } from "@/lib/store"
import {
  BookOpen,
  Star,
  TrendingUp,
  Plus,
  ChevronRight,
  ClipboardList,
} from "lucide-react"

export function HomePage() {
  const { currentUser, classPlans, exercises } = useAppStore()

  if (!currentUser) return null

  // Stats
  const totalPlans = classPlans.length
  const totalExercises = exercises.length
  const favorites = classPlans.filter((p) => p.isFavorite).length
  const apparatusCounts = classPlans.reduce(
    (acc, plan) => {
      acc[plan.apparatus] = (acc[plan.apparatus] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
  const mostTaught =
    Object.entries(apparatusCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "None"

  // Greeting
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  // Date
  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const statCards = [
    { value: totalPlans, label: "Class plan", icon: BookOpen, color: "#2B2B2B" },
    { value: totalExercises, label: "New Exercises", icon: ClipboardList, color: "#2B2B2B" },
    { value: favorites, label: "Favourite", icon: Star, color: "#2B2B2B" },
    { value: mostTaught, label: "Most taught", icon: TrendingUp, color: "#7FAF9B" },
  ]

  return (
    <div>
      {/* Greeting */}
      <div style={{ paddingBottom: 17, borderBottom: "0.8px solid #E0E0E0", marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
        <h1 style={{ width: 321, fontSize: 34, fontWeight: 600, margin: 0, lineHeight: "40.8px", letterSpacing: 0, color: "#2B2B2B", fontFamily: "var(--font-roboto), Roboto, sans-serif" }}>
          {greeting},{" "}
          <span style={{ color: "#4A6580" }}>
            {currentUser.firstName}
          </span>
        </h1>
        <p style={{ width: 300, fontSize: 24, color: "#BDBDBD", margin: 0, fontWeight: 400, lineHeight: "28.8px", letterSpacing: 0, fontFamily: "var(--font-roboto), Roboto, sans-serif" }}>
          {formattedDate}
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {statCards.map((stat) => (
          <div
            key={stat.label}
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 24,
              display: "flex",
              alignItems: "center",
              gap: 14,
              border: "0.8px solid #E0E0E0",
              height: 86,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#EDF1F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <stat.icon size={16} color="#4A6580" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: stat.color, lineHeight: "20px" }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 12, color: "#828282", fontWeight: 400, lineHeight: "14px" }}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid: Recent Plans + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
        {/* Recent Plans */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            border: "0.8px solid #E0E0E0",
            padding: "20px 0",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0 20px",
              marginBottom: 16,
            }}
          >
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#2B2B2B", margin: 0 }}>
                Recent plan
              </h2>
              <p style={{ fontSize: 12, color: "#828282", margin: "2px 0 0 0" }}>
                Your latest class plans
              </p>
            </div>
            <Link
              href="/class-plans"
              style={{
                fontSize: 12,
                color: "#828282",
                display: "flex",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
              }}
            >
              View all <ChevronRight size={14} color="#828282" />
            </Link>
          </div>

          {/* Plan Rows */}
          <div>
            {classPlans.slice(0, 4).map((plan, index) => (
              <Link
                key={plan.id}
                href={`/class-plans/${plan.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  textDecoration: "none",
                  borderTop: index === 0 ? "0.8px solid #F0F0F0" : "none",
                  borderBottom: "0.8px solid #F0F0F0",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: "#EDF1F5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ClipboardList size={14} color="#4A6580" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#2B2B2B", margin: 0 }}>
                      {plan.name}
                    </p>
                    <p style={{ fontSize: 12, color: "#828282", margin: "2px 0 0 0" }}>
                      {plan.apparatus} · {plan.duration}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Star
                    size={16}
                    color={plan.isFavorite ? "#D4A843" : "#BDBDBD"}
                    fill={plan.isFavorite ? "#D4A843" : "none"}
                  />
                  <ChevronRight size={16} color="#BDBDBD" />
                </div>
              </Link>
            ))}

            {classPlans.length === 0 && (
              <p style={{ textAlign: "center", color: "#828282", padding: "32px 0" }}>
                No class plans yet. Create your first one!
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            border: "0.8px solid #E0E0E0",
            padding: "20px 0",
          }}
        >
          <div style={{ padding: "0 20px", marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#2B2B2B", margin: 0 }}>
              Quick actions
            </h2>
            <p style={{ fontSize: 12, color: "#828282", margin: "2px 0 0 0" }}>
              Get started quickly
            </p>
          </div>

          <div>
            {/* Create plan */}
            <Link
              href="/class-plans/new"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px",
                textDecoration: "none",
                borderTop: "0.8px solid #F0F0F0",
                borderBottom: "0.8px solid #F0F0F0",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: "#4A6580",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Plus size={14} color="#FFFFFF" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#2B2B2B", margin: 0 }}>
                  Create plan
                </p>
                <p style={{ fontSize: 12, color: "#828282", margin: "2px 0 0 0" }}>
                  Build a new class
                </p>
              </div>
            </Link>

            {/* Browse exercises */}
            <Link
              href="/exercises"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px",
                textDecoration: "none",
                borderBottom: "0.8px solid #F0F0F0",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: "#EDF1F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <BookOpen size={14} color="#4A6580" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#2B2B2B", margin: 0 }}>
                  Browse exercises
                </p>
                <p style={{ fontSize: 12, color: "#828282", margin: "2px 0 0 0" }}>
                  Explore the library
                </p>
              </div>
            </Link>

            {/* Add exercise */}
            <Link
              href="/exercises?add=true"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px",
                textDecoration: "none",
                borderBottom: "0.8px solid #F0F0F0",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAFAFA")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: "#EDF1F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Plus size={14} color="#4A6580" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#2B2B2B", margin: 0 }}>
                  Add exercise
                </p>
                <p style={{ fontSize: 12, color: "#828282", margin: "2px 0 0 0" }}>
                  Create custom exercise
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
