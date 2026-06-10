import { Search } from "lucide-react"
import { GITHUB_URL } from "@/lib/constants"
import { KibraLogo } from "./KibraLogo"
import { ThemeToggle } from "./ThemeToggle"
import { GithubIcon } from "./GithubIcon"

interface DocsHeaderProps {
  onMenuToggle: () => void
  mobileMenuOpen: boolean
  onSearchOpen: () => void
}

export function DocsHeader({ onMenuToggle, mobileMenuOpen, onSearchOpen }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6 max-w-container mx-auto w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">{mobileMenuOpen ? "Close" : "Open"} navigation</span>
            {mobileMenuOpen ? (
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <KibraLogo variant="horizontal" to="/docs/getting-started" showVersion />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onSearchOpen}
            className="hidden sm:flex items-center gap-2 h-9 w-40 md:w-64 px-3 rounded-lg border border-border bg-slate-50/50 dark:bg-slate-900 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 text-muted-foreground hover:text-foreground text-xs font-normal transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search documentation"
          >
            <Search className="size-3.5 shrink-0" />
            <span className="flex-1 text-left">Search docs...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-white dark:bg-slate-950 px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          </button>
          <button
            onClick={onSearchOpen}
            className="flex sm:hidden p-2 text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
            title="Search"
            aria-label="Search documentation"
          >
            <Search className="size-5" />
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground p-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="GitHub repository"
          >
            <GithubIcon className="size-5" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
