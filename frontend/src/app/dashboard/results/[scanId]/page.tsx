"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getScan } from "@/services/scan-service"
import { IScan } from "@/types"
import { ArrowLeft, Download, FileText, AlertTriangle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function ResultsPage({ params }: { params: Promise<{ scanId: string }> }) {
  const { scanId } = use(params)
  const [scan, setScan] = useState<IScan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getScan(scanId)
        setScan(data)
      } catch {
        toast.error("Failed to load results")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [scanId])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-[400px] rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!scan) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-muted-foreground/50" />
        <h2 className="text-2xl font-bold">Scan not found</h2>
        <p className="mt-2 text-muted-foreground">This scan could not be found or you don&apos;t have access.</p>
        <Link href="/dashboard/history">
          <Button variant="outline" className="mt-6">View History</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/history">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Scan Results</h1>
            <p className="text-sm text-muted-foreground">
              {new Date(scan.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <Badge variant={scan.fractureDetected ? "destructive" : "secondary"} className="px-4 py-2 text-sm">
          {scan.fractureDetected ? (
            <><AlertTriangle className="mr-1 h-4 w-4" /> Fracture Detected</>
          ) : (
            <><CheckCircle className="mr-1 h-4 w-4" /> No Fracture</>
          )}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>X-Ray Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square max-h-[500px] w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={scan.imageUrl}
                alt="X-ray scan"
                className="h-full w-full object-contain p-2"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detection Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <span className="text-sm font-medium">Fracture Status</span>
                <Badge variant={scan.fractureDetected ? "destructive" : "secondary"}>
                  {scan.fractureDetected ? "Detected" : "Not Detected"}
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <span className="text-sm font-medium">Confidence Score</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        scan.confidenceScore > 0.9
                          ? "bg-green-500"
                          : scan.confidenceScore > 0.7
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${scan.confidenceScore * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold">
                    {(scan.confidenceScore * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {scan.aiResult?.regions && scan.aiResult.regions.length > 0 && (
                <div className="rounded-lg bg-muted/50 p-4">
                  <span className="text-sm font-medium">Affected Regions</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {scan.aiResult.regions.map((region, i) => (
                      <Badge key={i} variant="outline">{region}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {scan.aiResult?.summary || "No summary available."}
              </p>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download PDF Report
          </Button>
        </div>
      </div>
    </div>
  )
}
