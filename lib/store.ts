"use client"

import { create } from "zustand"
import {
  type User,
  type Exercise,
  type ClassPlan,
  type ClassExercise,
  testUsers,
  getUserExercises,
  getUserClassPlans,
} from "./data"

interface AppState {
  // Current user
  currentUser: User | null
  setCurrentUser: (user: User | null) => void

  // Exercises
  exercises: Exercise[]
  addExercise: (exercise: Omit<Exercise, "id" | "userId">) => void
  updateExercise: (id: string, updates: Partial<Exercise>) => void
  deleteExercise: (id: string) => void

  // Class Plans
  classPlans: ClassPlan[]
  addClassPlan: (plan: Omit<ClassPlan, "id" | "userId" | "createdAt" | "lastEdited">) => void
  updateClassPlan: (id: string, updates: Partial<ClassPlan>) => void
  deleteClassPlan: (id: string) => void
  toggleFavorite: (id: string) => void

  // Initialize data for a user
  initializeUserData: (userId: string) => void

  // Login/Logout
  login: (userId: string) => void
  logout: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  exercises: [],
  classPlans: [],

  setCurrentUser: (user) => set({ currentUser: user }),

  initializeUserData: (userId) => {
    const exercises = getUserExercises(userId)
    const classPlans = getUserClassPlans(userId)
    set({ exercises, classPlans })
  },

  login: (userId) => {
    const user = testUsers.find((u) => u.id === userId)
    if (user) {
      set({ currentUser: user })
      get().initializeUserData(userId)
    }
  },

  logout: () => {
    set({ currentUser: null, exercises: [], classPlans: [] })
  },

  addExercise: (exercise) => {
    const { currentUser, exercises } = get()
    if (!currentUser) return

    const newExercise: Exercise = {
      ...exercise,
      id: `ex_${Date.now()}`,
      userId: currentUser.id,
    }
    set({ exercises: [...exercises, newExercise] })
  },

  updateExercise: (id, updates) => {
    set({
      exercises: get().exercises.map((ex) => (ex.id === id ? { ...ex, ...updates } : ex)),
    })
  },

  deleteExercise: (id) => {
    set({
      exercises: get().exercises.filter((ex) => ex.id !== id),
    })
  },

  addClassPlan: (plan) => {
    const { currentUser, classPlans } = get()
    if (!currentUser) return

    const newPlan: ClassPlan = {
      ...plan,
      id: `cp_${Date.now()}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString().split("T")[0],
      lastEdited: "just now",
    }
    set({ classPlans: [...classPlans, newPlan] })
  },

  updateClassPlan: (id, updates) => {
    set({
      classPlans: get().classPlans.map((cp) =>
        cp.id === id ? { ...cp, ...updates, lastEdited: "just now" } : cp
      ),
    })
  },

  deleteClassPlan: (id) => {
    set({
      classPlans: get().classPlans.filter((cp) => cp.id !== id),
    })
  },

  toggleFavorite: (id) => {
    set({
      classPlans: get().classPlans.map((cp) =>
        cp.id === id ? { ...cp, isFavorite: !cp.isFavorite } : cp
      ),
    })
  },
}))
