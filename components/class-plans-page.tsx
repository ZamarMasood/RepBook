"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { apparatusOptions } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Star, Clock, Copy, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function ClassPlansPage() {
  const { classPlans, toggleFavorite, deleteClassPlan } = useAppStore()

  const [search, setSearch] = useState("")
  const [apparatusFilter, setApparatusFilter] = useState("All")

  const filteredPlans = useMemo(() => {
    return classPlans.filter((plan) => {
      const matchesSearch = plan.name.toLowerCase().includes(search.toLowerCase())
      const matchesApparatus =
        apparatusFilter === "All" || plan.apparatus === apparatusFilter
      return matchesSearch && matchesApparatus
    })
  }, [classPlans, search, apparatusFilter])

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this class plan?")) {
      deleteClassPlan(id)
    }
  }

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(id)
  }

  const getApparatusBadgeClass = (apparatus: string) => {
    switch (apparatus) {
      case "Reformer":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Mat":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Wunda Chair":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Cadillac Tower":
      case "Cadillac":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Mixed":
        return "bg-slate-100 text-slate-700 border-slate-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl mb-1">
            <span className="font-medium text-foreground">Class </span>
            <span className="font-serif italic text-muted-foreground">Plans</span>
          </h1>
          <p className="text-muted-foreground">
            {classPlans.length} plans saved
          </p>
        </div>
        <Link href="/class-plans/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Class Plan
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search class plans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Apparatus Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Reformer", "Mat", "Wunda Chair", "Cadillac", "Mixed"].map(
          (apparatus) => (
            <button
              key={apparatus}
              onClick={() => setApparatusFilter(apparatus)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                apparatusFilter === apparatus
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {apparatus}
            </button>
          )
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlans.map((plan) => (
          <Link key={plan.id} href={`/class-plans/${plan.id}`}>
            <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", getApparatusBadgeClass(plan.apparatus))}
                  >
                    {plan.apparatus}
                  </Badge>
                  <button
                    onClick={(e) => handleToggleFavorite(plan.id, e)}
                    className="p-1 rounded hover:bg-muted transition-colors"
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        plan.isFavorite
                          ? "text-amber-500 fill-amber-500"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                </div>

                <h3 className="font-semibold text-foreground mb-2 leading-tight">
                  {plan.name}
                </h3>

                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {plan.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Edited {plan.lastEdited}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        // Could implement duplicate functionality
                      }}
                      className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                      title="Duplicate"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(plan.id, e)}
                      className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-destructive"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filteredPlans.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No class plans found. Create your first one!
          </div>
        )}
      </div>
    </div>
  )
}
