import { Outlet } from "react-router-dom"
import { MarketingHeader } from "@/components/site/MarketingHeader"
import { SiteFooter } from "@/components/site/SiteFooter"

export function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-kibra-primary/20">
      <MarketingHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
