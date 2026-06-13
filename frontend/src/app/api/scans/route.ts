import { NextRequest, NextResponse } from "next/server"
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

    const fractureDetected = fractureStatus === "fracture" ? true : fractureStatus === "no-fracture" ? false : undefined

    const result = localStore.scans.findAll({
      fractureDetected,
      search,
      sortField,
      sortOrder,
      page,
      limit,
    })

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

    const scan = localStore.scans.create({
      imageUrl,
      fractureDetected,
      confidenceScore,
      aiResult,
    })

    return NextResponse.json(scan)
  } catch (error) {
    console.error("Create scan error:", error)
    return NextResponse.json({ error: "Failed to create scan" }, { status: 500 })
  }
}
