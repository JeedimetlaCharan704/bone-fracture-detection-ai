import { IReport } from "@/types"

export async function getReports(page: number = 1, limit: number = 10): Promise<{ reports: IReport[]; total: number }> {
  const response = await fetch(`/api/reports?page=${page}&limit=${limit}`)
  if (!response.ok) throw new Error("Failed to fetch reports")
  return response.json()
}

export async function createReport(scanId: string, notes?: string): Promise<IReport> {
  const response = await fetch("/api/reports", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scanId, notes }),
  })
  if (!response.ok) throw new Error("Failed to create report")
  return response.json()
}
