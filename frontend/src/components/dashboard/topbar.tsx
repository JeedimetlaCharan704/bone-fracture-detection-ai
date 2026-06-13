"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Brain } from "lucide-react"
import Link from "next/link"

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b border-border/50 bg-card px-6">
      <Link href="/" className="mr-auto flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <Brain className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-bold">BoneFracture AI</span>
      </Link>
      <ThemeToggle />
    </header>
  )
}
