import { IScan, ScanFilters, PredictionResult } from "@/types"

export async function uploadScanImage(file: File): Promise<{ url: string; publicId: string }> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Upload failed")
  }

  return response.json()
}

export async function getScans(filters: ScanFilters = {}): Promise<{ scans: IScan[]; total: number }> {
  const params = new URLSearchParams()
  if (filters.search) params.set("search", filters.search)
  if (filters.fractureStatus && filters.fractureStatus !== "all") params.set("fractureStatus", filters.fractureStatus)
  if (filters.sortField) params.set("sortField", filters.sortField)
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder)
  if (filters.page) params.set("page", String(filters.page))
  if (filters.limit) params.set("limit", String(filters.limit))

  const response = await fetch(`/api/scans?${params.toString()}`)
  if (!response.ok) throw new Error("Failed to fetch scans")
  return response.json()
}

export async function getScan(id: string): Promise<IScan> {
  const response = await fetch(`/api/scans/${id}`)
  if (!response.ok) throw new Error("Failed to fetch scan")
  return response.json()
}

export async function predictScan(imageUrl: string): Promise<PredictionResult> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image_url: imageUrl }),
  })

  if (!response.ok) throw new Error("Prediction failed")
  return response.json()
}

export async function createScan(data: {
  imageUrl: string
  fractureDetected: boolean
  confidenceScore: number
  aiResult: { summary: string; regions?: string[]; heatmapUrl?: string }
}): Promise<IScan> {
  const response = await fetch("/api/scans", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!response.ok) throw new Error("Failed to save scan")
  return response.json()
}
