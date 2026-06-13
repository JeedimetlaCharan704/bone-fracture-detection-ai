"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">This app is free and anonymous. No account needed.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Free & Open</CardTitle>
          <CardDescription>BoneFracture AI is completely free to use.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">No registration required</p>
              <p className="text-xs text-muted-foreground">Upload X-rays and get AI analysis instantly.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
