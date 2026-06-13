"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Scan, TrendingUp, AlertTriangle } from "lucide-react"

const stats = [
  { title: "Total Scans", value: "0", icon: Scan, change: "+0 this month" },
  { title: "Fractures Detected", value: "0", icon: AlertTriangle, change: "0% detection rate" },
  { title: "Avg. Confidence", value: "--", icon: TrendingUp, change: "N/A" },
  { title: "Recent Activity", value: "0", icon: Activity, change: "Last scan: N/A" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to BoneFracture AI. Here&apos;s your scan overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Scan className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-medium">No scans yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Upload your first X-ray to get started with AI-powered fracture detection.
              </p>
              <a
                href="/dashboard/upload"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Upload Your First Scan
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Detection Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Activity className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-medium">No data available</h3>
              <p className="text-sm text-muted-foreground">
                Start uploading scans to see your detection summary and trends.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
