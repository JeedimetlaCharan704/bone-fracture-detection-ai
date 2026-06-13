import { NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Scan } from "@/lib/models/Scan"
import { localStore } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const fractureStatus = searchParams.get("fractureStatus") || "all"
    const sortField = searchParams.get("sortField") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")

    const db = await connectDB()

    if (db) {
      const query: any = {}
      if (fractureStatus === "fracture") query.fractureDetected = true
      else if (fractureStatus === "no-fracture") query.fractureDetected = false
      if (search) query.$or = [{ "aiResult.summary": { $regex: search, $options: "i" } }]

      const sort: any = {}
      sort[sortField] = sortOrder === "asc" ? 1 : -1

      const total = await Scan.countDocuments(query)
      const scans = await Scan.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()

      return NextResponse.json({
        scans: scans.map((s: any) => ({ ...s, _id: s._id.toString(), userId: s.userId?.toString() ?? null })),
        total,
      })
    }

    const result = localStore.scans.findAll({ fractureDetected: fractureStatus === "fracture" ? true : fractureStatus === "no-fracture" ? false : undefined, search, sortField, sortOrder, page, limit })
    return NextResponse.json(result)
  } catch (error) {
    console.error("Get scans error:", error)
    return NextResponse.json({ error: "Failed to fetch scans" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, fractureDetected, confidenceScore, aiResult } = body

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    const db = await connectDB()

    if (db) {
      const scan = await Scan.create({ imageUrl, fractureDetected, confidenceScore, aiResult })
      return NextResponse.json({ ...scan.toObject(), _id: scan._id.toString(), userId: scan.userId?.toString() ?? null })
    }

    const scan = localStore.scans.create({ imageUrl, fractureDetected, confidenceScore, aiResult })
    return NextResponse.json(scan)
  } catch (error) {
    console.error("Create scan error:", error)
    return NextResponse.json({ error: "Failed to create scan" }, { status: 500 })
  }
}
