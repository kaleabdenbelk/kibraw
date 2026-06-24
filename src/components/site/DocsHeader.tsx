import { GITHUB_URL } from "@/lib/constants"
import { KibraLogo } from "./KibraLogo"
import { ThemeToggle } from "./ThemeToggle"
import { GithubIcon } from "./GithubIcon"
import { Search } from "lucide-react"

interface DocsHeaderProps {
  onMenuToggle: () => void
  mobileMenuOpen: boolean
  onSearchOpen: () => void
}

const navLinks = [
  { label: "Guides", href: "/docs/getting-started", active: true },
  { label: "Components", href: "/docs/button" },
  // { label: "Showcase", href: "#" },
  // { label: "Blog", href: "#" },
]

export function DocsHeader({
  onMenuToggle,
  mobileMenuOpen,
  onSearchOpen,
}: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
            aria-label="Toggle navigation"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
          
          <KibraLogo
            variant="horizontal"
            to="/docs/getting-started"
            showVersion
          />
        </div>

        <div className="ml-auto hidden items-center md:flex">
          <button
            onClick={onSearchOpen}
            className="flex w-full items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted md:w-56"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
            <kbd className="ml-auto rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium">
              ⌘ K
            </kbd>
          </button>
        </div>

        <nav className="ml-auto hidden items-center gap-5 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                l.active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label="GitHub repository"
          >
            <GithubIcon className="size-5" />
          </a>
        </div>
      </div>
    </header>
  )
}

