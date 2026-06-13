import { NextRequest, NextResponse } from "next/server"
import { localStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const result = localStore.reports.findAll({ page, limit })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Get reports error:", error)
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { scanId, notes } = body

    if (!scanId) {
      return NextResponse.json({ error: "Scan ID is required" }, { status: 400 })
    }

    const report = localStore.reports.create({
      scanId,
      notes: notes || "",
      pdfUrl: "",
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error("Create report error:", error)
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 })
  }
}
