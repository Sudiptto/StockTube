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
  const [stock1, setStock1] = React.useState("NFLX")
  const [stock2, setStock2] = React.useState("DIS")
  const [startDate, setStartDate] = React.useState<Date>(new Date("2023-06-01"))
  const [endDate, setEndDate] = React.useState<Date>(new Date("2024-12-31"))
  const [timeline, setTimeline] = React.useState("weekly")
  const [investment, setInvestment] = React.useState("500")
  const [duration, setDuration] = React.useState("10")
  const [showPreview, setShowPreview] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const handleGenerate = async () => {
    if (!stock1 || !stock2 || !startDate || !endDate) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)
    setVideoUrl(null)

    try {
      const payload = {
        stock1: stock1.toUpperCase(),
        stock2: stock2.toUpperCase(),
        start_date: format(startDate, "yyyy-MM-dd"),
        end_date: format(endDate, "yyyy-MM-dd"),
        daily_freq: timeline,
        "one-time-investment": parseInt(investment),
        vid_duration: parseInt(duration)
      }

      const response = await fetch("http://127.0.0.1:5000/stock_req", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (data.status === "success") {
        setVideoUrl(data.video_url)
        setShowPreview(true)
      } else {
        setError(data.message || "Failed to generate video")
      }
    } catch (err) {
      setError("Failed to connect to the API. Make sure the server is running.")
      console.error("API Error:", err)
    } finally {
      setIsLoading(false)
    }
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
            <Button variant="outline" className="w-full bg-transparent">
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Suggestions
            </Button>
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
              <Label htmlFor="duration">Video Duration (seconds)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="45">45 seconds</SelectItem>
                  <SelectItem value="60">60 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? "Generating Video..." : "Generate Video"}
            </Button>
            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <Card className="flex h-[600px] items-center justify-center">
            <CardContent className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-lg font-medium">Loading...</p>
              <p className="text-sm text-muted-foreground">Generating your video, please wait</p>
            </CardContent>
          </Card>
        ) : showPreview && videoUrl ? (
          <>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[9/16] bg-black">
                  <video 
                    src={videoUrl} 
                    controls 
                    className="w-full h-full object-cover"
                    poster=""
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="gradient-text">Export Options</CardTitle>
                <CardDescription>Download or share your video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button 
                    className="w-full bg-transparent" 
                    variant="outline"
                    onClick={() => window.open(videoUrl, '_blank')}
                  >
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
