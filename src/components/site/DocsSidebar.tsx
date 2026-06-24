import { useState } from "react";
import { ChevronRight, BookOpen, Layers } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { COMPONENT_DOCS, GUIDE_DOCS } from "@/data/docs";

interface DocsSidebarProps {
  mobileMenuOpen: boolean;
  onNavigate?: () => void;
}

export function DocsSidebar({ mobileMenuOpen, onNavigate }: DocsSidebarProps) {
  const { slug = "getting-started" } = useParams<{ slug: string }>();
  const [guidesOpen, setGuidesOpen] = useState(true);
  const [componentsOpen, setComponentsOpen] = useState(true);

  return (
    <aside
      className={`${
        mobileMenuOpen ? "block fixed inset-0 z-30 pt-16 bg-background" : "hidden"
      } w-full shrink-0 border-r bg-secondary/30 lg:block lg:relative lg:inset-auto lg:z-auto lg:pt-0 lg:w-64`}
    >
      <nav className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-4 text-sm scrollbar-thin scrollbar-thumb-border">
        {/* Guides Section */}
        <div className="mb-4">
          <button
            onClick={() => setGuidesOpen(!guidesOpen)}
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 font-bold tracking-tight text-foreground transition-colors hover:bg-accent/60"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Guides</span>
            </div>
            <ChevronRight
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                guidesOpen ? "rotate-90" : ""
              }`}
            />
          </button>
          {guidesOpen && (
            <ul className="mt-1 space-y-0.5 ml-1 border-l pl-2">
              {Object.values(GUIDE_DOCS).map((guide) => (
                <li key={guide.slug}>
                  <Link
                    to={`/docs/${guide.slug}`}
                    onClick={onNavigate}
                    className={`block rounded-md px-3 py-1.5 transition-colors ${
                      slug === guide.slug
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    }`}
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Components Section */}
        <div className="mb-4">
          <button
            onClick={() => setComponentsOpen(!componentsOpen)}
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 font-bold tracking-tight text-foreground transition-colors hover:bg-accent/60"
          >
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>Components</span>
            </div>
            <ChevronRight
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                componentsOpen ? "rotate-90" : ""
              }`}
            />
          </button>
          {componentsOpen && (
            <ul className="mt-1 space-y-0.5 ml-1 border-l pl-2">
              {Object.values(COMPONENT_DOCS).map((component) => (
                <li key={component.slug}>
                  <Link
                    to={`/docs/${component.slug}`}
                    onClick={onNavigate}
                    className={`flex items-center justify-between rounded-md px-3 py-1.5 transition-colors ${
                      slug === component.slug
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    }`}
                  >
                    <span>{component.title}</span>
                    {component.badges?.includes("New") && (
                      <span className="rounded bg-emerald-500/10 px-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 border-t pt-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-md px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
          >
            <span>GitHub</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between rounded-md px-3 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
          >
            <span>Changelog</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}

const GITHUB_URL = "https://github.com/kaleabdenbelk/kibraw";

