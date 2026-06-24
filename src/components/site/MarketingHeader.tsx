import { Link } from "react-router-dom"
import { GITHUB_URL } from "@/lib/constants"
import { KibraLogo } from "./KibraLogo"
import { ThemeToggle } from "./ThemeToggle"
import { GithubIcon } from "./GithubIcon"

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6 max-w-container mx-auto w-full">
        <KibraLogo variant="horizontal" to="/" />

        <nav className="hidden sm:flex items-center gap-6 text-label-md text-muted-foreground">
          <Link to="/docs/getting-started" className="hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link to="/docs/button" className="hover:text-foreground transition-colors">
            Components
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="sm:hidden text-muted-foreground hover:text-foreground p-2 rounded-md transition-colors"
            aria-label="GitHub"
          > */}
          <Link to={GITHUB_URL}>
            <GithubIcon className="mr-4 size-5" />
          </Link>
          {/* </a> */}
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
