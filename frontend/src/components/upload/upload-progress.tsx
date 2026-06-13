"use client"

import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"

interface UploadProgressProps {
  progress: number
  stage: "uploading" | "analyzing" | "complete" | "error"
}

export function UploadProgress({ progress, stage }: UploadProgressProps) {
  const stageText = {
    uploading: "Uploading image...",
    analyzing: "AI is analyzing your X-ray...",
    complete: "Analysis complete!",
    error: "An error occurred",
  }

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-3">
        {stage !== "complete" && stage !== "error" && (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        )}
        <span className="text-sm font-medium">{stageText[stage]}</span>
      </div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
    </div>
  )
}
