import * as React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { DocsHeader } from "@/components/site/DocsHeader"
import { DocsSidebar } from "@/components/site/DocsSidebar"
import { DocsToc } from "@/components/site/DocsToc"
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
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20">
      <DocsHeader
        onMenuToggle={() => setMobileMenuOpen((v) => !v)}
        mobileMenuOpen={mobileMenuOpen}
        onSearchOpen={openSearch}
      />
      
      <div className="mx-auto flex w-full max-w-[100rem]">
        <DocsSidebar 
          mobileMenuOpen={mobileMenuOpen} 
          onNavigate={() => setMobileMenuOpen(false)} 
        />
        
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
        
        <main id="main-content" className="min-w-0 flex-1 px-5 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </main>

        <DocsToc />
      </div>

      <SearchCommand open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  )
}

