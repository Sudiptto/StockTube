"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, ArrowRight, Flame } from "lucide-react"
import Link from "next/link"
import { Line, LineChart, ResponsiveContainer } from "recharts"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  trend: "up" | "down"
  sparklineData: { value: number }[]
}

// Mock data for hot stocks
const hotStocks: Stock[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 45.32,
    changePercent: 5.46,
    volume: "52.3M",
    marketCap: "2.16T",
    trend: "up",
    sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 800 + Math.random() * 100 })),
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.42,
    change: 12.18,
    changePercent: 5.15,
    volume: "98.7M",
    marketCap: "789B",
    trend: "up",
    sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 230 + Math.random() * 30 })),
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 178.65,
    change: -2.34,
    changePercent: -1.29,
    volume: "45.2M",
    marketCap: "2.78T",
    trend: "down",
    sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 175 + Math.random() * 10 })),
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 412.78,
    change: 8.92,
    changePercent: 2.21,
    volume: "23.4M",
    marketCap: "3.07T",
    trend: "up",
    sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 400 + Math.random() * 20 })),
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.35,
    change: 3.67,
    changePercent: 2.65,
    volume: "28.9M",
    marketCap: "1.79T",
    trend: "up",
    sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 135 + Math.random() * 15 })),
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 178.25,
    change: -4.12,
    changePercent: -2.26,
    volume: "41.2M",
    marketCap: "1.85T",
    trend: "down",
    sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 175 + Math.random() * 12 })),
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 485.92,
    change: 18.45,
    changePercent: 3.95,
    volume: "15.7M",
    marketCap: "1.24T",
    trend: "up",
    sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 460 + Math.random() * 40 })),
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 165.43,
    change: 7.89,
    changePercent: 5.01,
    volume: "67.8M",
    marketCap: "267B",
    trend: "up",
    sparklineData: Array.from({ length: 20 }, (_, i) => ({ value: 155 + Math.random() * 20 })),
  },
]

export function HotStocksDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Flame className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold gradient-text">Trending Now</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {hotStocks.map((stock) => (
          <Card key={stock.symbol} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                  <CardDescription className="text-xs">{stock.name}</CardDescription>
                </div>
                <Badge variant={stock.trend === "up" ? "default" : "destructive"} className="gap-1">
                  {stock.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stock.changePercent.toFixed(2)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-2xl font-bold">${stock.price.toFixed(2)}</div>
                <div className={`text-sm ${stock.trend === "up" ? "stock-up" : "stock-down"}`}>
                  {stock.change > 0 ? "+" : ""}
                  {stock.change.toFixed(2)} today
                </div>
              </div>

              <div className="h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stock.sparklineData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={stock.trend === "up" ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <div>
                  <div>Volume</div>
                  <div className="font-medium text-foreground">{stock.volume}</div>
                </div>
                <div className="text-right">
                  <div>Market Cap</div>
                  <div className="font-medium text-foreground">{stock.marketCap}</div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                <Link href={`/?stock1=${stock.symbol}`}>
                  Create Video
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
