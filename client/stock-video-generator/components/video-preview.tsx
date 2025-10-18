"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VideoPreviewProps {
  stock1: string
  stock2: string
  template: string
}

// Mock data for demonstration
const generateMockData = (stock1: string, stock2: string) => {
  const data = []
  const basePrice1 = 100
  const basePrice2 = 150

  for (let i = 0; i < 30; i++) {
    data.push({
      day: i + 1,
      [stock1]: basePrice1 + Math.random() * 50 - 25,
      [stock2]: basePrice2 + Math.random() * 60 - 30,
    })
  }
  return data
}

export function VideoPreview({ stock1, stock2, template }: VideoPreviewProps) {
  const data = React.useMemo(() => generateMockData(stock1, stock2), [stock1, stock2])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[9/16] bg-gradient-to-br from-primary/10 to-accent/10">
          {/* Background template indicator */}
          <div className="absolute inset-0 flex items-end justify-center p-4">
            <div className="w-full rounded-lg bg-card/95 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{stock1}</span>
                <span className="text-sm font-medium">{stock2}</span>
              </div>
              <ChartContainer
                config={{
                  [stock1]: {
                    label: stock1,
                    color: "hsl(var(--chart-1))",
                  },
                  [stock2]: {
                    label: stock2,
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey={stock1} stroke="var(--color-chart-1)" strokeWidth={2} />
                    <Line type="monotone" dataKey={stock2} stroke="var(--color-chart-2)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-2 text-center text-xs text-muted-foreground">
                Template: {template === "subway" ? "Subway Surfer" : "Minecraft"}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
