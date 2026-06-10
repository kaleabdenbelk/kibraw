import { Link } from "react-router-dom"
import { APP_VERSION, GITHUB_URL } from "@/lib/constants"
import { KibraLogo } from "./KibraLogo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="space-y-3">
            <KibraLogo variant="horizontal" to="/" />
            <p className="text-body-sm text-muted-foreground max-w-sm">
              Copy-paste React Native components for Expo. Built with NativeWind, accessible primitives, and
              developer-first tooling.
            </p>
          </div>
          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="text-label-md text-foreground mb-3">Documentation</h4>
              <ul className="space-y-2 text-body-sm text-muted-foreground">
                <li>
                  <Link to="/docs/getting-started" className="hover:text-foreground transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link to="/docs/button" className="hover:text-foreground transition-colors">
                    Components
                  </Link>
                </li>
                <li>
                  <Link to="/docs/registry-guide" className="hover:text-foreground transition-colors">
                    Registry Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-label-md text-foreground mb-3">Community</h4>
              <ul className="space-y-2 text-body-sm text-muted-foreground">
                <li>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-body-sm text-muted-foreground">
          <span>Kibra UI {APP_VERSION}</span>
          <span>Press D to toggle theme</span>
        </div>
      </div>
    </footer>
  )
}
