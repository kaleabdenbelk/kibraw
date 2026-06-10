import { BookOpen, Layers } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { COMPONENT_DOCS, GUIDE_DOCS } from "@/data/docs"

interface DocsSidebarProps {
  mobileMenuOpen: boolean
  onNavigate?: () => void
}

export function DocsSidebar({ mobileMenuOpen, onNavigate }: DocsSidebarProps) {
  const { slug = "getting-started" } = useParams<{ slug: string }>()

  return (
    <aside
      className={`
        fixed md:sticky top-14 left-0 z-30 w-sidebar h-[calc(100vh-3.5rem)] shrink-0 overflow-y-auto border-r border-border/60 bg-background md:bg-transparent px-4 py-6 transition-all duration-300 md:block
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      aria-label="Documentation navigation"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase px-3 mb-3 flex items-center gap-1.5">
            <BookOpen className="size-3.5" /> Getting Started
          </h4>
          <ul className="space-y-1">
            {Object.values(GUIDE_DOCS).map((guide) => (
              <li key={guide.slug}>
                <Link
                  to={`/docs/${guide.slug}`}
                  onClick={onNavigate}
                  aria-current={slug === guide.slug ? "page" : undefined}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${
                      slug === guide.slug
                        ? "bg-secondary text-foreground dark:bg-secondary/70"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                    }`}
                >
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase px-3 mb-3 flex items-center gap-1.5">
            <Layers className="size-3.5" /> Universal Primitives
          </h4>
          <ul className="space-y-1">
            {Object.values(COMPONENT_DOCS).map((component) => (
              <li key={component.slug}>
                <Link
                  to={`/docs/${component.slug}`}
                  onClick={onNavigate}
                  aria-current={slug === component.slug ? "page" : undefined}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${
                      slug === component.slug
                        ? "border-l-2 border-kibra-primary bg-muted/40 text-kibra-primary-dark dark:text-kibra-primary font-bold pl-[10px]"
                        : "border-l-2 border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground pl-[10px]"
                    }`}
                >
                  <span>{component.title}</span>
                  {component.badges?.includes("New") && (
                    <span className="text-[10px] font-semibold font-mono text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950/30 px-1 py-0.5 rounded-md">
                      New
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}
