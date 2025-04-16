"use client"

import { useEffect, useState } from "react"

// Create a React Native compatible implementation
export function useNavigationHistory() {
  const [history, setHistory] = useState<string[]>([])
  
  // Track navigation with a function instead of next/navigation
  const addToHistory = (pathname: string) => {
    setHistory((prev) => {
      // Don't add the same path twice in a row
      if (prev[prev.length - 1] !== pathname) {
        return [...prev, pathname]
      }
      return prev
    })
  }

  const canGoBack = history.length > 1

  const getPreviousPath = () => {
    if (canGoBack) {
      return history[history.length - 2]
    }
    return "/"
  }

  return { canGoBack, getPreviousPath, addToHistory }
}

