"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, Share2, Sparkles } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { VideoPreview } from "@/components/video-preview"
import { Film } from "lucide-react" // Declared Film variable here

export function VideoCreationStudio() {
  const [stock1, setStock1] = React.useState("")
  const [stock2, setStock2] = React.useState("")
  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()
  const [timeline, setTimeline] = React.useState("daily")
  const [investment, setInvestment] = React.useState("1000")
  const [duration, setDuration] = React.useState("30")
  const [template, setTemplate] = React.useState("subway")
  const [showPreview, setShowPreview] = React.useState(false)
  const [isLoadingAI, setIsLoadingAI] = React.useState(false)

  const handleGenerate = () => {
    setShowPreview(true)
  }

  const handleAISuggestions = () => {
    setIsLoadingAI(true)
    
    // Simulate loading for better UX
    setTimeout(() => {
      // Curated list of trending stock comparisons with optimal settings
      const trendingComparisons = [
        {
          stock1: "NVDA",
          stock2: "AMD", 
          timeline: "daily",
          investment: "2500",
          duration: "45",
          template: "subway",
          reasoning: "AI chip rivalry - NVIDIA vs AMD battle for AI dominance"
        },
        {
          stock1: "AAPL",
          stock2: "MSFT",
          timeline: "weekly", 
          investment: "5000",
          duration: "60",
          template: "minecraft",
          reasoning: "Tech giants showdown - Apple vs Microsoft market cap race"
        },
        {
          stock1: "TSLA",
          stock2: "RIVN",
          timeline: "daily",
          investment: "1500",
          duration: "30", 
          template: "subway",
          reasoning: "EV revolution - Tesla vs Rivian electric future battle"
        },
        {
          stock1: "META",
          stock2: "GOOGL",
          timeline: "daily",
          investment: "3000", 
          duration: "45",
          template: "minecraft",
          reasoning: "Social media vs search - Meta's metaverse vs Google's AI"
        },
        {
          stock1: "AMZN",
          stock2: "NFLX",
          timeline: "weekly",
          investment: "2000",
          duration: "30",
          template: "subway", 
          reasoning: "Streaming wars - Amazon Prime vs Netflix content battle"
        },
        {
          stock1: "COIN",
          stock2: "HOOD",
          timeline: "daily",
          investment: "1000",
          duration: "15",
          template: "subway",
          reasoning: "Trading platforms - Coinbase vs Robinhood retail trading"
        },
        {
          stock1: "DIS",
          stock2: "NFLX", 
          timeline: "monthly",
          investment: "4000",
          duration: "60",
          template: "minecraft",
          reasoning: "Entertainment empire - Disney+ vs Netflix streaming dominance"
        },
        {
          stock1: "PLTR",
          stock2: "SNOW",
          timeline: "daily", 
          investment: "1200",
          duration: "30",
          template: "subway",
          reasoning: "Data analytics war - Palantir vs Snowflake big data race"
        }
      ]
      
      // Randomly select one of the trending comparisons
      const selectedComparison = trendingComparisons[Math.floor(Math.random() * trendingComparisons.length)]
      
      // Auto-fill ALL form fields
      setStock1(selectedComparison.stock1)
      setStock2(selectedComparison.stock2) 
      setTimeline(selectedComparison.timeline)
      setInvestment(selectedComparison.investment)
      setDuration(selectedComparison.duration)
      setTemplate(selectedComparison.template)
      
      // Set smart date ranges based on timeline
      const endDate = new Date()
      const startDate = new Date()
      
      if (selectedComparison.timeline === "daily") {
        // Last 3 months for daily data
        startDate.setMonth(startDate.getMonth() - 3)
      } else if (selectedComparison.timeline === "weekly") {
        // Last 6 months for weekly data  
        startDate.setMonth(startDate.getMonth() - 6)
      } else {
        // Last 12 months for monthly data
        startDate.setMonth(startDate.getMonth() - 12)
      }
      
      setStartDate(startDate)
      setEndDate(endDate)
      
      // Log the suggestion reasoning
      console.log("🎯 Smart Suggestion:", selectedComparison.reasoning)
      
      setIsLoadingAI(false)
    }, 800) // Simulate realistic loading time
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="gradient-text">Stock Selection</CardTitle>
            <CardDescription>Choose two stocks to compare</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="stock1">Stock 1</Label>
                <Input
                  id="stock1"
                  placeholder="e.g., MSFT"
                  value={stock1}
                  onChange={(e) => setStock1(e.target.value.toUpperCase())}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock2">Stock 2</Label>
                <Input
                  id="stock2"
                  placeholder="e.g., GOOG"
                  value={stock2}
                  onChange={(e) => setStock2(e.target.value.toUpperCase())}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="gradient-text">Timeline Settings</CardTitle>
            <CardDescription>Configure the date range and frequency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Data Frequency</Label>
              <Select value={timeline} onValueChange={setTimeline}>
                <SelectTrigger id="timeline">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="investment">One-Time Investment ($)</Label>
              <Input id="investment" type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="gradient-text">Video Settings</CardTitle>
            <CardDescription>Customize your video output</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Background Template</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger id="template">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subway">Subway Surfer</SelectItem>
                  <SelectItem value="minecraft">Minecraft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Video Duration (seconds)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="45">45 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              className="w-full bg-transparent mb-3" 
              onClick={handleAISuggestions}
              disabled={isLoadingAI}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isLoadingAI ? "Getting Smart Suggestions..." : "Get Smart Suggestions"}
            </Button>
            <Button className="w-full" size="lg" onClick={handleGenerate}>
              Generate Video
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {showPreview ? (
          <>
            <VideoPreview stock1={stock1 || "MSFT"} stock2={stock2 || "GOOG"} template={template} />
            <Card>
              <CardHeader>
                <CardTitle className="gradient-text">Export Options</CardTitle>
                <CardDescription>Download or share your video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Video
                  </Button>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      TikTok (9:16)
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Instagram (9:16)
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      YouTube (16:9)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="flex h-[600px] items-center justify-center">
            <CardContent className="text-center">
              <Film className="mx-auto h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">No video generated yet</p>
              <p className="text-sm text-muted-foreground">Fill in the settings and click Generate Video</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
