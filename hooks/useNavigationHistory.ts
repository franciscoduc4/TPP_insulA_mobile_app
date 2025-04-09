"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function useNavigationHistory() {
  const [history, setHistory] = useState<string[]>([])
  const pathname = usePathname()

  useEffect(() => {
    setHistory((prev) => {
      // Don't add the same path twice in a row
      if (prev[prev.length - 1] !== pathname) {
        return [...prev, pathname]
      }
      return prev
    })
  }, [pathname])

  const canGoBack = history.length > 1

  const getPreviousPath = () => {
    if (canGoBack) {
      return history[history.length - 2]
    }
    return "/"
  }

  return { canGoBack, getPreviousPath }
}

