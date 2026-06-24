import { Terminal } from "lucide-react";
import { SearchButton } from "./DocsSearch";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Guides", href: "#", active: true },
  { label: "Tutorial", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "AI", href: "#" },
  { label: "Pricing", href: "#" },
];

export function DocsHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
            aria-label="Toggle navigation"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-background">
              <Terminal className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-medium text-muted-foreground">StackBlitz</span>
              <span className="block text-base font-bold tracking-tight">WebContainers</span>
            </span>
          </a>
        </div>

        <div className="ml-auto hidden items-center md:flex">
          <SearchButton />
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

        <ThemeToggle />

        <a
          href="https://stackblitz.com/"
          target="_blank"
          rel="noreferrer"
          className="ml-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go to Console
        </a>
      </div>
    </header>
  );
}
