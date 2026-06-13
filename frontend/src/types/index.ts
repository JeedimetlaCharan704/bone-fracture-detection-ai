export interface IScan {
  _id: string
  userId?: string
  imageUrl: string
  fractureDetected: boolean
  confidenceScore: number
  aiResult?: {
    summary: string
    regions?: string[]
    heatmapUrl?: string
  }
  reportUrl?: string
  createdAt: Date
}

export interface IReport {
  _id: string
  userId?: string
  scanId: string
  pdfUrl: string
  notes?: string
  createdAt: Date
}

export interface ScanFormData {
  image: File
}

export interface PredictionResult {
  fractureDetected: boolean
  confidence: number
  summary: string
  regions?: string[]
  heatmapUrl?: string
}

export type SortOrder = "asc" | "desc"
export type SortField = "createdAt" | "confidenceScore"

export interface ScanFilters {
  search?: string
  fractureStatus?: "all" | "fracture" | "no-fracture"
  sortField?: SortField
  sortOrder?: SortOrder
  page?: number
  limit?: number
}
