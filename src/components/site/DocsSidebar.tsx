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
      className={`fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-sidebar shrink-0 overflow-y-auto custom-scrollbar border-r border-border/60 bg-background px-4 py-6 transition-all duration-300 md:sticky md:block md:bg-transparent ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} `}
      aria-label="Documentation navigation"
    >
      <div className="space-y-6">
        <div>
          <h4 className="mb-3 flex items-center gap-1.5 px-3 text-xs font-bold tracking-wider text-slate-800 uppercase dark:text-slate-200">
            <BookOpen className="size-3.5 text-kibra-primary-dark dark:text-kibra-primary" />{" "}
            Getting Started
          </h4>
          <ul className="space-y-1">
            {Object.values(GUIDE_DOCS).map((guide) => (
              <li key={guide.slug}>
                <Link
                  to={`/docs/${guide.slug}`}
                  onClick={onNavigate}
                  aria-current={slug === guide.slug ? "page" : undefined}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                    slug === guide.slug
                      ? "border-l-2 border-kibra-primary bg-kibra-primary/10 pl-[10px] font-semibold text-kibra-primary-dark dark:bg-kibra-primary/20 dark:text-kibra-primary"
                      : "border-l-2 border-transparent pl-[10px] text-muted-foreground hover:translate-x-0.5 hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border/50 pt-6">
          <h4 className="mb-3 flex items-center gap-1.5 px-3 text-xs font-bold tracking-wider text-slate-800 uppercase dark:text-slate-200">
            <Layers className="size-3.5 text-kibra-primary-dark dark:text-kibra-primary" />{" "}
            Universal Primitives
          </h4>
          <ul className="space-y-1">
            {Object.values(COMPONENT_DOCS).map((component) => (
              <li key={component.slug}>
                <Link
                  to={`/docs/${component.slug}`}
                  onClick={onNavigate}
                  aria-current={slug === component.slug ? "page" : undefined}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                    slug === component.slug
                      ? "border-l-2 border-kibra-primary bg-kibra-primary/10 pl-[10px] font-semibold text-kibra-primary-dark dark:bg-kibra-primary/20 dark:text-kibra-primary"
                      : "border-l-2 border-transparent pl-[10px] text-muted-foreground hover:translate-x-0.5 hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <span>{component.title}</span>
                  {component.badges?.includes("New") && (
                    <span className="rounded-md bg-green-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-green-600 dark:bg-green-950/30 dark:text-green-400">
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
