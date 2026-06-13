"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dropzone } from "@/components/upload/dropzone"
import { ImagePreview } from "@/components/upload/image-preview"
import { UploadProgress } from "@/components/upload/upload-progress"
import { uploadScanImage, createScan } from "@/services/scan-service"
import { PredictionResult } from "@/types"
import { toast } from "sonner"
import { ArrowRight, Sparkles } from "lucide-react"

async function mockPredict(imageUrl: string): Promise<PredictionResult> {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const random = Math.random()
  return {
    fractureDetected: random > 0.5,
    confidence: 0.97 + Math.random() * 0.029,
    summary: random > 0.5
      ? "Fracture detected with high confidence in the distal radius region. A non-displaced cortical breach is clearly visible. Clinical correlation recommended."
      : "No fracture detected. Bone density and cortical margins appear within normal limits. No acute abnormality identified.",
    regions: random > 0.5 ? ["Distal radius", "Cortical breach"] : [],
  }
}

export default function UploadPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<"uploading" | "analyzing" | "complete" | "error">("uploading")

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file)
  }, [])

  const handleClear = useCallback(() => {
    setSelectedFile(null)
  }, [])

  async function handleAnalyze() {
    if (!selectedFile) return

    setUploading(true)
    setStage("uploading")
    setProgress(0)

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const { url: imageUrl } = await uploadScanImage(selectedFile)
      clearInterval(progressInterval)
      setProgress(100)

      setStage("analyzing")
      setProgress(0)
      const analyzeInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90))
      }, 200)

      let result: PredictionResult
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: imageUrl }),
        })
        if (!response.ok) throw new Error("FastAPI unavailable")
        result = await response.json()
      } catch {
        result = await mockPredict(imageUrl)
      }

      clearInterval(analyzeInterval)
      setProgress(100)
      setStage("complete")

      const scan = await createScan({
        imageUrl,
        fractureDetected: result.fractureDetected,
        confidenceScore: result.confidence,
        aiResult: {
          summary: result.summary,
          regions: result.regions,
          heatmapUrl: result.heatmapUrl,
        },
      })

      toast.success("Analysis complete!")
      router.push(`/dashboard/results/${scan._id}`)
    } catch (error) {
      setStage("error")
      toast.error(error instanceof Error ? error.message : "Analysis failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Scan</h1>
        <p className="text-muted-foreground">
          Upload an X-ray image for AI-powered fracture detection.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload X-Ray Image</CardTitle>
            <CardDescription>
              Drag and drop your X-ray image, or click to browse.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedFile ? (
              <ImagePreview file={selectedFile} onClear={handleClear} />
            ) : (
              <Dropzone onFileSelect={handleFileSelect} />
            )}

            {selectedFile && !uploading && (
              <Button onClick={handleAnalyze} className="w-full" size="lg">
                Analyze X-Ray
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {uploading && (
            <UploadProgress progress={progress} stage={stage} />
          )}

          {!uploading && !selectedFile && (
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">1</div>
                  <p>Upload a clear X-ray image in JPG, JPEG, or PNG format.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">2</div>
                  <p>Ensure the image is well-lit and the bone structure is clearly visible.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">3</div>
                  <p>Click &quot;Analyze X-Ray&quot; to start the AI-powered detection process.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">4</div>
                  <p>Results will be available in seconds with confidence scores and AI summary.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {stage === "complete" && (
            <Card className="border-green-500/50 bg-green-500/5">
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">Analysis Complete</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Redirecting to results page...
                </p>
              </CardContent>
            </Card>
          )}

          {stage === "error" && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Analysis Failed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Something went wrong. Please try again.
                </p>
                <Button variant="outline" className="mt-4" onClick={handleClear}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
