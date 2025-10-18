"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Eye,
  Heart,
  Share2,
  Youtube,
  Instagram,
  Video,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for analytics
const viewsData = [
  { date: "Jan 1", youtube: 1200, tiktok: 3400, instagram: 2100 },
  { date: "Jan 2", youtube: 1800, tiktok: 4200, instagram: 2800 },
  { date: "Jan 3", youtube: 2400, tiktok: 5100, instagram: 3200 },
  { date: "Jan 4", youtube: 3100, tiktok: 6800, instagram: 4100 },
  { date: "Jan 5", youtube: 2800, tiktok: 5900, instagram: 3600 },
  { date: "Jan 6", youtube: 3600, tiktok: 7200, instagram: 4800 },
  { date: "Jan 7", youtube: 4200, tiktok: 8500, instagram: 5400 },
]

const engagementData = [
  { platform: "YouTube", likes: 2400, shares: 890, comments: 450 },
  { platform: "TikTok", likes: 5600, shares: 2100, comments: 1200 },
  { platform: "Instagram", likes: 3200, shares: 1400, comments: 680 },
]

const topVideos = [
  {
    id: 1,
    title: "NVDA vs AMD - 6 Month Comparison",
    stocks: ["NVDA", "AMD"],
    views: 45200,
    likes: 3400,
    platform: "TikTok",
    change: 12.5,
    thumbnail: "subway-surfer",
  },
  {
    id: 2,
    title: "TSLA vs RIVN - Electric Vehicle Battle",
    stocks: ["TSLA", "RIVN"],
    views: 38900,
    likes: 2800,
    platform: "YouTube",
    change: 8.3,
    thumbnail: "minecraft",
  },
  {
    id: 3,
    title: "AAPL vs MSFT - Tech Giants Showdown",
    stocks: ["AAPL", "MSFT"],
    views: 32100,
    likes: 2200,
    platform: "Instagram",
    change: -3.2,
    thumbnail: "subway-surfer",
  },
  {
    id: 4,
    title: "COIN vs SQ - Crypto Payment Wars",
    stocks: ["COIN", "SQ"],
    views: 28400,
    likes: 1900,
    platform: "TikTok",
    change: 15.7,
    thumbnail: "minecraft",
  },
]

export default function AnalyticsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="border-b border-border bg-card">
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold gradient-text">Analytics</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Track your video performance across platforms</p>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124.5K</div>
                <div className="flex items-center text-xs stock-up mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>12.5% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11.2K</div>
                <div className="flex items-center text-xs stock-up mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>8.3% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.4K</div>
                <div className="flex items-center text-xs stock-down mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  <span>3.2% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">9.2%</div>
                <div className="flex items-center text-xs stock-up mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>2.1% from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Views Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
              <CardDescription>Daily video views across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All Platforms</TabsTrigger>
                  <TabsTrigger value="youtube">YouTube</TabsTrigger>
                  <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                  <TabsTrigger value="instagram">Instagram</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <ChartContainer
                    config={{
                      youtube: {
                        label: "YouTube",
                        color: "hsl(0, 84%, 60%)",
                      },
                      tiktok: {
                        label: "TikTok",
                        color: "hsl(0, 0%, 20%)",
                      },
                      instagram: {
                        label: "Instagram",
                        color: "hsl(300, 60%, 60%)",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={viewsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="youtube" stroke="var(--color-youtube)" strokeWidth={2} />
                        <Line type="monotone" dataKey="tiktok" stroke="var(--color-tiktok)" strokeWidth={2} />
                        <Line type="monotone" dataKey="instagram" stroke="var(--color-instagram)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Engagement by Platform */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement by Platform</CardTitle>
              <CardDescription>Likes, shares, and comments breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  likes: {
                    label: "Likes",
                    color: "hsl(280, 100%, 70%)",
                  },
                  shares: {
                    label: "Shares",
                    color: "hsl(200, 100%, 65%)",
                  },
                  comments: {
                    label: "Comments",
                    color: "hsl(330, 100%, 70%)",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="likes" fill="var(--color-likes)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="shares" fill="var(--color-shares)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="comments" fill="var(--color-comments)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Performing Videos */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Videos</CardTitle>
              <CardDescription>Your best videos from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-16 w-28 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-medium">
                      {video.thumbnail === "subway-surfer" ? "🏃 Subway" : "⛏️ Minecraft"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{video.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-1">
                          {video.stocks.map((stock) => (
                            <Badge key={stock} variant="secondary" className="text-xs">
                              {stock}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {video.platform === "YouTube" && <Youtube className="h-3 w-3 text-red-500" />}
                          {video.platform === "TikTok" && <Video className="h-3 w-3" />}
                          {video.platform === "Instagram" && <Instagram className="h-3 w-3 text-pink-500" />}
                          {video.platform}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <div className="font-semibold">{video.views.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">views</div>
                        </div>
                        <div>
                          <div className="font-semibold">{video.likes.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">likes</div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center justify-end gap-1 text-xs mt-1 ${video.change > 0 ? "stock-up" : "stock-down"}`}
                      >
                        {video.change > 0 ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        <span>{Math.abs(video.change)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  )
}
