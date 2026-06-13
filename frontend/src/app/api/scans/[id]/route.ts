import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Scan } from "@/lib/models/Scan"
import { localStore } from "@/lib/store"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const db = await connectDB()

    if (db) {
      const scan = await Scan.findById(id).lean()
      if (!scan) return NextResponse.json({ error: "Scan not found" }, { status: 404 })
      return NextResponse.json({ ...scan, _id: scan._id.toString(), userId: scan.userId?.toString() ?? null })
    }

    const scan = localStore.scans.findById(id)
    if (!scan) return NextResponse.json({ error: "Scan not found" }, { status: 404 })
    return NextResponse.json(scan)
  } catch (error) {
    console.error("Get scan error:", error)
    return NextResponse.json({ error: "Failed to fetch scan" }, { status: 500 })
  }
}
