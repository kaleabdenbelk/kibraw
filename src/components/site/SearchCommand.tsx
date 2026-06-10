import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { COMPONENT_DOCS, GUIDE_DOCS } from "@/data/docs"
import { GITHUB_URL } from "@/lib/constants"

interface SearchCommandProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type SearchItem = {
  id: string
  title: string
  description: string
  category: "Guides" | "Components" | "Actions"
  slug?: string
  action?: () => void
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedSearchIndex, setSelectedSearchIndex] = React.useState(0)

  const searchItems = React.useMemo<SearchItem[]>(
    () => [
      ...Object.values(GUIDE_DOCS).map((guide) => ({
        id: guide.slug,
        title: guide.title,
        description: guide.description,
        category: "Guides" as const,
        slug: guide.slug,
      })),
      ...Object.values(COMPONENT_DOCS).map((comp) => ({
        id: comp.slug,
        title: `${comp.title} Component`,
        description: comp.description,
        category: "Components" as const,
        slug: comp.slug,
      })),
      {
        id: "theme",
        title: "Toggle Theme",
        description: `Switch to ${theme === "dark" ? "Light" : "Dark"} mode.`,
        category: "Actions" as const,
        action: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
      {
        id: "github",
        title: "GitHub Repository",
        description: "View the Kibra source code.",
        category: "Actions" as const,
        action: () => window.open(GITHUB_URL, "_blank"),
      },
    ],
    [theme, setTheme]
  )

  const filteredSearchItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const triggerSearchItem = React.useCallback(
    (item: SearchItem) => {
      if (item.slug) {
        navigate(`/docs/${item.slug}`)
      } else if (item.action) {
        item.action()
      }
      onOpenChange(false)
      setSearchQuery("")
    },
    [navigate, onOpenChange]
  )

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      onOpenChange(false)
      setSearchQuery("")
      return
    }
    if (filteredSearchItems.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedSearchIndex((prev) => (prev + 1) % filteredSearchItems.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedSearchIndex((prev) => (prev - 1 + filteredSearchItems.length) % filteredSearchItems.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (filteredSearchItems[selectedSearchIndex]) {
        triggerSearchItem(filteredSearchItems[selectedSearchIndex])
      }
    }
  }

  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false)
        setSearchQuery("")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 dark:bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
    >
      <div
        onClick={() => {
          onOpenChange(false)
          setSearchQuery("")
        }}
        className="absolute inset-0"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-elevation-3 flex flex-col overflow-hidden max-h-[450px]">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search docs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedSearchIndex(0)
            }}
            onKeyDown={handleSearchKeyDown}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none border-none py-0.5"
          />
          <button
            onClick={() => {
              onOpenChange(false)
              setSearchQuery("")
            }}
            className="text-[10px] bg-slate-100 dark:bg-slate-900 border border-border px-1.5 py-0.5 rounded text-muted-foreground hover:text-foreground cursor-pointer"
          >
            ESC
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {filteredSearchItems.length === 0 ? (
            <div className="text-center py-6 text-sm text-muted-foreground">No matches found. Try another search.</div>
          ) : (
            <div className="space-y-3">
              {(["Guides", "Components", "Actions"] as const).map((category) => {
                const itemsInCategory = filteredSearchItems.filter((item) => item.category === category)
                if (itemsInCategory.length === 0) return null

                return (
                  <div key={category}>
                    <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase px-2 py-1">
                      {category}
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {itemsInCategory.map((item) => {
                        const globalIndex = filteredSearchItems.findIndex((fi) => fi.id === item.id)
                        const isSelected = globalIndex === selectedSearchIndex

                        return (
                          <button
                            key={item.id}
                            onClick={() => triggerSearchItem(item)}
                            onMouseEnter={() => setSelectedSearchIndex(globalIndex)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs flex flex-col gap-0.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                              ${isSelected ? "bg-slate-100 dark:bg-slate-900 text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                          >
                            <span
                              className={`font-semibold ${isSelected ? "text-kibra-primary-dark dark:text-kibra-primary" : "text-foreground"}`}
                            >
                              {item.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground leading-relaxed truncate max-w-full">
                              {item.description}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-border/60 bg-slate-50 dark:bg-slate-950/20 text-[10px] text-muted-foreground flex items-center justify-between shrink-0 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-0.5">
              <kbd className="border border-border bg-white dark:bg-slate-900 px-1 rounded shadow-sm text-[8px] font-semibold">
                ↑
              </kbd>
              <kbd className="border border-border bg-white dark:bg-slate-900 px-1 rounded shadow-sm text-[8px] font-semibold">
                ↓
              </kbd>
              navigate
            </span>
            <span className="flex items-center gap-0.5">
              <kbd className="border border-border bg-white dark:bg-slate-900 px-1 rounded shadow-sm text-[8px] font-semibold">
                ↵
              </kbd>
              select
            </span>
          </div>
          <span>{filteredSearchItems.length} results</span>
        </div>
      </div>
    </div>
  )
}
