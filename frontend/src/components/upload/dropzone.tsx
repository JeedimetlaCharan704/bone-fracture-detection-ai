"use client"

import { useCallback, useState } from "react"
import { Upload, CircleAlert, Image } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropzoneProps {
  onFileSelect: (file: File) => void
  acceptedTypes?: string[]
  maxSizeMB?: number
}

export function Dropzone({ onFileSelect, acceptedTypes = ["image/jpeg", "image/jpg", "image/png"], maxSizeMB = 10 }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): boolean => {
    setError(null)

    if (!acceptedTypes.includes(file.type)) {
      setError("Invalid file type. Please upload a JPG, JPEG, or PNG image.")
      return false
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`)
      return false
    }

    return true
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }, [onFileSelect])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
    e.target.value = ""
  }

  return (
    <div>
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-all",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input
          type="file"
          accept={acceptedTypes.join(",")}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className={cn(
          "mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all",
          isDragging ? "bg-primary/20 scale-110" : "bg-muted"
        )}>
          {isDragging ? (
            <Image className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <p className="mb-2 text-lg font-medium">
          {isDragging ? "Drop your X-ray here" : "Drag & drop your X-ray here"}
        </p>
        <p className="mb-1 text-sm text-muted-foreground">
          or click to browse files
        </p>
        <p className="text-xs text-muted-foreground">
          JPG, JPEG, PNG up to {maxSizeMB}MB
        </p>
      </label>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <CircleAlert className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}
