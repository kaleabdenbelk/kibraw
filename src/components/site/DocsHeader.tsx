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

export function DocsHeader({
  onMenuToggle,
  mobileMenuOpen,
  onSearchOpen,
}: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 dark:bg-background/70">
      <div className="max-w-container mx-auto flex h-14 w-full items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="-ml-2 cursor-pointer rounded-md p-2 text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Close" : "Open"} navigation
            </span>
            {mobileMenuOpen ? (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <KibraLogo
            variant="horizontal"
            to="/docs/getting-started"
            showVersion
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onSearchOpen}
            className="hidden h-9 w-40 cursor-pointer items-center gap-2 rounded-lg border border-border bg-slate-100/40 px-3 text-xs font-normal text-muted-foreground shadow-sm transition-all duration-200 hover:border-kibra-primary/30 hover:bg-slate-100/80 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:flex md:w-64 dark:bg-slate-900/40 dark:hover:border-kibra-primary/40 dark:hover:bg-slate-900/80"
            aria-label="Search documentation"
          >
            <Search className="size-3.5 shrink-0 text-muted-foreground/80" />
            <span className="flex-1 text-left">Search docs...</span>
            <kbd className="pointer-events-none inline-flex h-5 items-center gap-0.5 rounded border border-border/80 bg-white px-1.5 font-mono text-[10px] font-medium text-muted-foreground/80 shadow-sm select-none dark:bg-slate-950">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          </button>
          <button
            onClick={onSearchOpen}
            className="flex cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground sm:hidden"
            title="Search"
            aria-label="Search documentation"
          >
            <Search className="size-5" />
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
