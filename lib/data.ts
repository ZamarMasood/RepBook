// Types
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  studioName: string
  city: string
  state: string
}

export interface Spring {
  color: "Red" | "Blue" | "Green" | "Yellow" | "L"
  count: number
}

export interface Exercise {
  id: string
  userId: string
  name: string
  apparatus: string
  level: "All Levels" | "Beginner" | "Intermediate" | "Advanced"
  position?: string
  defaultReps: number
  springs?: Spring[]
  props?: string
  setup?: string
  cues?: string
  modifications?: string
}

export interface ClassExercise {
  exerciseId: string
  reps: number
  springs?: Spring[]
}

export interface ClassPlan {
  id: string
  userId: string
  name: string
  apparatus: string
  duration: string
  level: string
  exercises: ClassExercise[]
  isFavorite: boolean
  lastEdited: string
  createdAt: string
}

// Test Users
export const testUsers: User[] = [
  {
    id: "user1",
    firstName: "Sarah",
    lastName: "Anderson",
    email: "sarah@bodybalancestudio.com",
    studioName: "Body Balance Studio",
    city: "San Francisco",
    state: "California",
  },
  {
    id: "user2",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael@pilatesflow.com",
    studioName: "Pilates Flow",
    city: "Los Angeles",
    state: "California",
  },
]

// Exercise Library for User 1 (Sarah)
export const exercisesUser1: Exercise[] = [
  {
    id: "ex1",
    userId: "user1",
    name: "Footwork — Parallel",
    apparatus: "Reformer",
    level: "All Levels",
    position: "Supine",
    defaultReps: 10,
    springs: [{ color: "Red", count: 3 }],
    props: "None",
    setup: "Headrest down. Footbar at medium height. Feet hip width apart.",
    cues: "Press evenly through all four corners of the foot. Keep pelvis neutral throughout.",
    modifications: "Reduce range of motion for tight hamstrings.",
  },
  {
    id: "ex2",
    userId: "user1",
    name: "Footwork — V Position",
    apparatus: "Reformer",
    level: "All Levels",
    position: "Supine",
    defaultReps: 10,
    springs: [{ color: "Red", count: 3 }],
    props: "None",
    setup: "Headrest down. Footbar at medium height. Heels together, toes apart.",
    cues: "Maintain turnout from hips. Keep knees tracking over toes.",
  },
  {
    id: "ex3",
    userId: "user1",
    name: "Footwork — Wide",
    apparatus: "Reformer",
    level: "All Levels",
    position: "Supine",
    defaultReps: 10,
    springs: [{ color: "Red", count: 3 }],
    props: "None",
    setup: "Headrest down. Footbar at medium height. Feet wide on bar.",
  },
  {
    id: "ex4",
    userId: "user1",
    name: "Running",
    apparatus: "Reformer",
    level: "All Levels",
    position: "Supine",
    defaultReps: 20,
    springs: [{ color: "Red", count: 2 }],
    props: "None",
    setup: "Headrest down. Footbar at medium height.",
    cues: "Alternate heels with control. Keep carriage still.",
  },
  {
    id: "ex5",
    userId: "user1",
    name: "Hundred",
    apparatus: "Reformer",
    level: "Intermediate",
    position: "Supine",
    defaultReps: 100,
    springs: [{ color: "Green", count: 1 }],
    props: "None",
    setup: "Headrest up. Straps in hands.",
    cues: "Pump arms vigorously. Breathe in for 5, out for 5.",
  },
  {
    id: "ex6",
    userId: "user1",
    name: "Coordination",
    apparatus: "Reformer",
    level: "Intermediate",
    position: "Supine",
    defaultReps: 8,
    springs: [{ color: "Red", count: 1 }],
    props: "None",
    setup: "Headrest up. Straps in hands and feet.",
  },
  {
    id: "ex7",
    userId: "user1",
    name: "Short Spine",
    apparatus: "Reformer",
    level: "Intermediate",
    position: "Supine",
    defaultReps: 5,
    springs: [{ color: "Red", count: 2 }],
    props: "None",
    setup: "Straps on feet. Headrest down.",
  },
  {
    id: "ex8",
    userId: "user1",
    name: "Long Spine",
    apparatus: "Reformer",
    level: "Advanced",
    position: "Supine",
    defaultReps: 5,
    springs: [{ color: "Red", count: 2 }],
    props: "None",
  },
  {
    id: "ex9",
    userId: "user1",
    name: "Elephant",
    apparatus: "Reformer",
    level: "All Levels",
    position: "Standing",
    defaultReps: 10,
    springs: [{ color: "Red", count: 2 }],
    props: "None",
  },
  {
    id: "ex10",
    userId: "user1",
    name: "Roll Up",
    apparatus: "Mat",
    level: "Beginner",
    position: "Supine",
    defaultReps: 5,
    props: "None",
    cues: "Articulate through spine one vertebra at a time.",
  },
  {
    id: "ex11",
    userId: "user1",
    name: "Single Leg Stretch",
    apparatus: "Mat",
    level: "Beginner",
    position: "Supine",
    defaultReps: 10,
    props: "None",
  },
  {
    id: "ex12",
    userId: "user1",
    name: "Double Leg Stretch",
    apparatus: "Mat",
    level: "Beginner",
    position: "Supine",
    defaultReps: 10,
    props: "None",
  },
  {
    id: "ex13",
    userId: "user1",
    name: "Side Sit Up",
    apparatus: "Wunda Chair",
    level: "Intermediate",
    position: "Side Lying",
    defaultReps: 5,
    springs: [{ color: "L", count: 1 }],
  },
  {
    id: "ex14",
    userId: "user1",
    name: "Going Up Front",
    apparatus: "Wunda Chair",
    level: "Intermediate",
    position: "Standing",
    defaultReps: 5,
    springs: [{ color: "L", count: 1 }],
  },
  {
    id: "ex15",
    userId: "user1",
    name: "Leg Springs — Frog",
    apparatus: "Cadillac Tower",
    level: "All Levels",
    position: "Supine",
    defaultReps: 10,
  },
  {
    id: "ex16",
    userId: "user1",
    name: "Leg Springs — Circles",
    apparatus: "Cadillac Tower",
    level: "Intermediate",
    position: "Supine",
    defaultReps: 8,
  },
  {
    id: "ex17",
    userId: "user1",
    name: "Arm Springs — Hug a Tree",
    apparatus: "Cadillac Tower",
    level: "All Levels",
    position: "Supine",
    defaultReps: 8,
  },
  {
    id: "ex18",
    userId: "user1",
    name: "Arm Springs — Chest Expansion",
    apparatus: "Cadillac Tower",
    level: "All Levels",
    position: "Kneeling",
    defaultReps: 8,
  },
  {
    id: "ex19",
    userId: "user1",
    name: "Roll Down Bar",
    apparatus: "Cadillac Tower",
    level: "Intermediate",
    position: "Seated",
    defaultReps: 5,
  },
  {
    id: "ex20",
    userId: "user1",
    name: "Push Through — Supine",
    apparatus: "Cadillac Tower",
    level: "Intermediate",
    position: "Supine",
    defaultReps: 5,
  },
  {
    id: "ex21",
    userId: "user1",
    name: "Trapeze — Back Hang",
    apparatus: "Cadillac Tower",
    level: "Advanced",
    position: "Hanging",
    defaultReps: 3,
  },
  {
    id: "ex22",
    userId: "user1",
    name: "Swan on Barrel",
    apparatus: "Ladder Barrel",
    level: "Intermediate",
    position: "Prone",
    defaultReps: 5,
  },
  {
    id: "ex23",
    userId: "user1",
    name: "Side Stretch",
    apparatus: "Ladder Barrel",
    level: "All Levels",
    position: "Side Sitting",
    defaultReps: 5,
  },
  {
    id: "ex24",
    userId: "user1",
    name: "Horseback",
    apparatus: "Ladder Barrel",
    level: "Intermediate",
    position: "Seated",
    defaultReps: 5,
  },
  {
    id: "ex25",
    userId: "user1",
    name: "Teaser",
    apparatus: "Mat",
    level: "Advanced",
    position: "Supine",
    defaultReps: 5,
    cues: "Roll up and reach toward toes. Balance on sits bones.",
  },
  {
    id: "ex26",
    userId: "user1",
    name: "Swimming",
    apparatus: "Mat",
    level: "Beginner",
    position: "Prone",
    defaultReps: 20,
  },
  {
    id: "ex27",
    userId: "user1",
    name: "Spine Stretch Forward",
    apparatus: "Mat",
    level: "Beginner",
    position: "Seated",
    defaultReps: 5,
  },
  {
    id: "ex28",
    userId: "user1",
    name: "Saw",
    apparatus: "Mat",
    level: "Beginner",
    position: "Seated",
    defaultReps: 5,
  },
]

// Class Plans for User 1 (Sarah)
export const classPlansUser1: ClassPlan[] = [
  {
    id: "cp1",
    userId: "user1",
    name: "Full Body Flow — Intermediate",
    apparatus: "Mixed",
    duration: "55 min",
    level: "Intermediate",
    exercises: [
      { exerciseId: "ex1", reps: 10, springs: [{ color: "Red", count: 3 }] },
      { exerciseId: "ex5", reps: 100, springs: [{ color: "Green", count: 1 }] },
      { exerciseId: "ex10", reps: 5 },
      { exerciseId: "ex13", reps: 5, springs: [{ color: "L", count: 1 }] },
      { exerciseId: "ex17", reps: 8 },
    ],
    isFavorite: true,
    lastEdited: "yesterday",
    createdAt: "2026-03-20",
  },
  {
    id: "cp2",
    userId: "user1",
    name: "Core & Stability Foundations",
    apparatus: "Mat",
    duration: "45 min",
    level: "Beginner",
    exercises: [
      { exerciseId: "ex10", reps: 5 },
      { exerciseId: "ex11", reps: 10 },
      { exerciseId: "ex12", reps: 10 },
      { exerciseId: "ex26", reps: 20 },
    ],
    isFavorite: true,
    lastEdited: "3 days ago",
    createdAt: "2026-03-15",
  },
  {
    id: "cp3",
    userId: "user1",
    name: "Hip Mobility & Lower Body",
    apparatus: "Reformer",
    duration: "55 min",
    level: "Intermediate",
    exercises: [
      { exerciseId: "ex1", reps: 10, springs: [{ color: "Red", count: 3 }] },
      { exerciseId: "ex2", reps: 10, springs: [{ color: "Red", count: 3 }] },
      { exerciseId: "ex3", reps: 10, springs: [{ color: "Red", count: 3 }] },
      { exerciseId: "ex4", reps: 20, springs: [{ color: "Red", count: 2 }] },
    ],
    isFavorite: true,
    lastEdited: "last week",
    createdAt: "2026-03-10",
  },
  {
    id: "cp4",
    userId: "user1",
    name: "Beginner Series — Week 3",
    apparatus: "Mat",
    duration: "50 min",
    level: "Beginner",
    exercises: [
      { exerciseId: "ex10", reps: 5 },
      { exerciseId: "ex27", reps: 5 },
      { exerciseId: "ex28", reps: 5 },
    ],
    isFavorite: false,
    lastEdited: "last week",
    createdAt: "2026-03-05",
  },
]

// Exercise Library for User 2 (Michael)
export const exercisesUser2: Exercise[] = [
  {
    id: "ex_m1",
    userId: "user2",
    name: "Footwork — Parallel",
    apparatus: "Reformer",
    level: "All Levels",
    position: "Supine",
    defaultReps: 10,
    springs: [{ color: "Red", count: 3 }],
    props: "None",
  },
  {
    id: "ex_m2",
    userId: "user2",
    name: "Hundred",
    apparatus: "Reformer",
    level: "Intermediate",
    position: "Supine",
    defaultReps: 100,
    springs: [{ color: "Blue", count: 1 }],
  },
  {
    id: "ex_m3",
    userId: "user2",
    name: "Roll Up",
    apparatus: "Mat",
    level: "Beginner",
    position: "Supine",
    defaultReps: 8,
  },
  {
    id: "ex_m4",
    userId: "user2",
    name: "Teaser",
    apparatus: "Mat",
    level: "Advanced",
    position: "Supine",
    defaultReps: 5,
  },
  {
    id: "ex_m5",
    userId: "user2",
    name: "Swan",
    apparatus: "Mat",
    level: "Beginner",
    position: "Prone",
    defaultReps: 5,
  },
]

// Class Plans for User 2 (Michael)
export const classPlansUser2: ClassPlan[] = [
  {
    id: "cp_m1",
    userId: "user2",
    name: "Morning Flow",
    apparatus: "Mat",
    duration: "30 min",
    level: "Beginner",
    exercises: [
      { exerciseId: "ex_m3", reps: 8 },
      { exerciseId: "ex_m5", reps: 5 },
    ],
    isFavorite: true,
    lastEdited: "today",
    createdAt: "2026-03-27",
  },
  {
    id: "cp_m2",
    userId: "user2",
    name: "Advanced Reformer",
    apparatus: "Reformer",
    duration: "60 min",
    level: "Advanced",
    exercises: [
      { exerciseId: "ex_m1", reps: 10, springs: [{ color: "Red", count: 3 }] },
      { exerciseId: "ex_m2", reps: 100, springs: [{ color: "Blue", count: 1 }] },
    ],
    isFavorite: false,
    lastEdited: "2 days ago",
    createdAt: "2026-03-25",
  },
]

// Helper to get all exercises for a user
export function getUserExercises(userId: string): Exercise[] {
  if (userId === "user1") return exercisesUser1
  if (userId === "user2") return exercisesUser2
  return []
}

// Helper to get all class plans for a user
export function getUserClassPlans(userId: string): ClassPlan[] {
  if (userId === "user1") return classPlansUser1
  if (userId === "user2") return classPlansUser2
  return []
}

// Helper to get user by id
export function getUserById(userId: string): User | undefined {
  return testUsers.find((u) => u.id === userId)
}

// Apparatus options
export const apparatusOptions = [
  "All",
  "Reformer",
  "Mat",
  "Wunda Chair",
  "Cadillac Tower",
  "Ladder Barrel",
  "Mixed",
]

// Level options
export const levelOptions = ["All Levels", "Beginner", "Intermediate", "Advanced"]

// Spring colors
export const springColors = ["Red", "Blue", "Green", "Yellow", "L"] as const
