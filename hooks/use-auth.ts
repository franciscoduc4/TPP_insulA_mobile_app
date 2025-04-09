"use client"

import { create } from "zustand"

interface User {
  id: string
  name: string
  email: string
  targetGlucoseMin: number
  targetGlucoseMax: number
}

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
})) 