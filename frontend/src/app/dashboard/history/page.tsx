"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getScans } from "@/services/scan-service"
import { IScan } from "@/types"
import { Search, History, AlertTriangle, CheckCircle, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"

export default function HistoryPage() {
  const [scans, setScans] = useState<IScan[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [fractureStatus, setFractureStatus] = useState<string>("all")
  const [sortField, setSortField] = useState<string>("createdAt")
  const [sortOrder, setSortOrder] = useState<string>("desc")
  const [page, setPage] = useState(1)
  const limit = 10

  const loadScans = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getScans({ search, fractureStatus: fractureStatus as any, sortField: sortField as any, sortOrder: sortOrder as any, page, limit })
      setScans(data.scans)
      setTotal(data.total)
    } catch {
      toast.error("Failed to load scans")
    } finally {
      setLoading(false)
    }
  }, [search, fractureStatus, sortField, sortOrder, page])

  useEffect(() => {
    loadScans()
  }, [loadScans])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Scan History</h1>
        <p className="text-muted-foreground">View and manage all your previous scans.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Scans ({total})</CardTitle>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search scans..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                  className="pl-9 w-full sm:w-48"
                />
              </div>
              <Select value={fractureStatus} onValueChange={(v) => { if (v) { setFractureStatus(v); setPage(1) } }}>
                <SelectTrigger className="w-full sm:w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="fracture">Fracture</SelectItem>
                  <SelectItem value="no-fracture">No Fracture</SelectItem>
                </SelectContent>
              </Select>
              <Select value={`${sortField}-${sortOrder}`} onValueChange={(v) => {
                if (!v) return
                const [field, order] = v.split("-")
                setSortField(field)
                setSortOrder(order)
              }}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest First</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                  <SelectItem value="confidenceScore-desc">Highest Confidence</SelectItem>
                  <SelectItem value="confidenceScore-asc">Lowest Confidence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-lg" />
              ))}
            </div>
          ) : scans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <History className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-medium">No scans found</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {search || fractureStatus !== "all"
                  ? "Try adjusting your search or filters."
                  : "Upload your first X-ray to get started."}
              </p>
              <Link href="/dashboard/upload">
                <Button>Upload Scan</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {scans.map((scan) => (
                <Link key={scan._id} href={`/dashboard/results/${scan._id}`}>
                  <div className="flex items-center gap-4 rounded-lg border border-border/50 p-4 transition-all hover:border-primary/30 hover:bg-muted/50">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <img src={scan.imageUrl} alt="Scan" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {scan.aiResult?.summary?.slice(0, 100) || "No summary"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(scan.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-bold">{(scan.confidenceScore * 100).toFixed(1)}%</p>
                        <p className="text-xs text-muted-foreground">confidence</p>
                      </div>
                      <Badge variant={scan.fractureDetected ? "destructive" : "secondary"}>
                        {scan.fractureDetected ? (
                          <><AlertTriangle className="mr-1 h-3 w-3" /> Fracture</>
                        ) : (
                          <><CheckCircle className="mr-1 h-3 w-3" /> Clear</>
                        )}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
