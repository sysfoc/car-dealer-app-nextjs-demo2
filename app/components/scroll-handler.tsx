"use client"

import type React from "react"

import { useEffect } from "react"

export default function ScrollHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("no-scrollbar")
    return () => {
      document.documentElement.classList.remove("no-scrollbar")
    }
  }, [])

  return <>{children}</>
}
