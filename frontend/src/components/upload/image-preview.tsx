"use client"

import { X } from "lucide-react"

interface ImagePreviewProps {
  file: File
  onClear: () => void
}

export function ImagePreview({ file, onClear }: ImagePreviewProps) {
  const url = URL.createObjectURL(file)

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-muted/30">
      <div className="flex aspect-square max-h-[400px] w-full items-center justify-center">
        <img
          src={url}
          alt="X-ray preview"
          className="max-h-full max-w-full object-contain p-4"
        />
      </div>
      <button
        onClick={onClear}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-all hover:bg-background group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="border-t border-border bg-muted/50 px-4 py-2">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </p>
      </div>
    </div>
  )
}
