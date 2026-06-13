import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Report } from "@/lib/models/Report"
import { localStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const db = await connectDB()

    if (db) {
      const total = await Report.countDocuments({})
      const reports = await Report.find({})
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("scanId", "fractureDetected confidenceScore imageUrl")
        .lean()

      return NextResponse.json({
        reports: reports.map((r: any) => ({
          ...r, _id: r._id.toString(), userId: r.userId?.toString() ?? null,
          scanId: r.scanId?._id?.toString() ?? r.scanId?.toString(),
        })),
        total,
      })
    }

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

    if (!scanId) return NextResponse.json({ error: "Scan ID is required" }, { status: 400 })

    const db = await connectDB()

    if (db) {
      const report = await Report.create({ scanId, notes: notes || "", pdfUrl: "" })
      return NextResponse.json({ ...report.toObject(), _id: report._id.toString(), userId: report.userId?.toString() ?? null, scanId: report.scanId.toString() })
    }

    const report = localStore.reports.create({ scanId, notes: notes || "", pdfUrl: "" })
    return NextResponse.json(report)
  } catch (error) {
    console.error("Create report error:", error)
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 })
  }
}
