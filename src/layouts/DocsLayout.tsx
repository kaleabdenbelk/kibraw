import * as React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { DocsHeader } from "@/components/site/DocsHeader"
import { DocsSidebar } from "@/components/site/DocsSidebar"
import { SearchCommand } from "@/components/site/SearchCommand"
import { useSearchShortcut } from "@/components/site/use-search-shortcut"

export function DocsLayout() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  const openSearch = React.useCallback(() => setIsSearchOpen(true), [])
  useSearchShortcut(openSearch)

  React.useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith("#/docs/")) {
      const slug = hash.replace("#/docs/", "")
      navigate(`/docs/${slug}`, { replace: true })
      window.location.hash = ""
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-kibra-primary/20">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:border focus:border-border focus:rounded-md"
      >
        Skip to content
      </a>
      <DocsHeader
        onMenuToggle={() => setMobileMenuOpen((v) => !v)}
        mobileMenuOpen={mobileMenuOpen}
        onSearchOpen={openSearch}
      />
      <div className="flex-1 flex max-w-container mx-auto w-full px-6">
        <DocsSidebar mobileMenuOpen={mobileMenuOpen} onNavigate={() => setMobileMenuOpen(false)} />
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
        <main id="main-content" className="flex-1 min-w-0 md:pl-8 py-8 md:py-10">
          <Outlet />
        </main>
      </div>
      <SearchCommand open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  )
}
