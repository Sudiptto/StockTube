import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { VideoCreationStudio } from "@/components/video-creation-studio"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CreatePage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="border-b border-border bg-card">
          <div className="flex h-16 items-center justify-between gap-4 px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold gradient-text">Create Video</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="p-6">
          <VideoCreationStudio />
        </div>
      </main>
    </SidebarProvider>
  )
}
