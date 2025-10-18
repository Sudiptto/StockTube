import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, TrendingUp, BarChart3, User, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="border-b border-border bg-card">
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold gradient-text">Dashboard</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="p-6 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 py-8">
            <h1 className="text-4xl font-bold gradient-text">Stock Video Generator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create viral stock comparison videos for TikTok, Instagram, and YouTube in seconds
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/create">
                  <Video className="mr-2 h-5 w-5" />
                  Create Video
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/hot-stocks">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Browse Hot Stocks
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Videos Created</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45.2K</div>
                <p className="text-xs text-green-500">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.4%</div>
                <p className="text-xs text-green-500">+2.1% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platforms</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Connected accounts</p>
              </CardContent>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <Video className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="gradient-text">Create Videos</CardTitle>
                <CardDescription>Generate stock comparison videos with custom templates and timelines</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/create">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="gradient-text">Hot Stocks</CardTitle>
                <CardDescription>Discover trending stocks and create videos with top performers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/hot-stocks">
                    Explore Stocks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <BarChart3 className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="gradient-text">Analytics</CardTitle>
                <CardDescription>Track video performance across all your connected platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/analytics">
                    View Analytics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="gradient-text">Recent Videos</CardTitle>
              <CardDescription>Your latest stock comparison videos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stocks: "AAPL vs MSFT", date: "2 hours ago", views: "1.2K", platform: "TikTok" },
                  { stocks: "TSLA vs NVDA", date: "1 day ago", views: "3.4K", platform: "Instagram" },
                  { stocks: "GOOG vs META", date: "3 days ago", views: "2.1K", platform: "YouTube" },
                ].map((video, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{video.stocks}</p>
                        <p className="text-sm text-muted-foreground">{video.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{video.views} views</p>
                      <p className="text-sm text-muted-foreground">{video.platform}</p>
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
