import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Search, BookOpen, Layers, Zap, Command, ArrowRight } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { COMPONENT_DOCS, GUIDE_DOCS } from "@/data/docs"
import { GITHUB_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"

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

  const filteredSearchItems = searchQuery.trim() === "" 
    ? searchItems.slice(0, 8) // Show recent/popular if empty
    : searchItems.filter(
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Guides": return <BookOpen className="size-3.5" />
      case "Components": return <Layers className="size-3.5" />
      case "Actions": return <Zap className="size-3.5" />
      default: return <Search className="size-3.5" />
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-background/60 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={() => {
          onOpenChange(false)
          setSearchQuery("")
        }}
        className="absolute inset-0"
        aria-hidden="true"
      />
      
      <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden max-h-[500px] animate-in zoom-in-95 duration-200 slide-in-from-top-4">
        <div className="flex h-14 items-center gap-3 px-4 border-b border-border/60">
          <Search className="size-5 text-muted-foreground shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search documentation or commands..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedSearchIndex(0)
            }}
            onKeyDown={handleSearchKeyDown}
            className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none border-none py-1"
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <kbd className="hidden sm:flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
            <button
              onClick={() => {
                onOpenChange(false)
                setSearchQuery("")
              }}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
            >
              <kbd className="text-[10px] uppercase font-sans">Esc</kbd>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 custom-scrollbar">
          {filteredSearchItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="size-6 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-foreground">No matches found</p>
              <p className="text-xs text-muted-foreground mt-1">Try another search term or browse guides.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {(["Guides", "Components", "Actions"] as const).map((category) => {
                const itemsInCategory = filteredSearchItems.filter((item) => item.category === category)
                if (itemsInCategory.length === 0) return null

                return (
                  <div key={category} className="space-y-1">
                    <div className="px-3 text-[11px] font-bold tracking-tight text-primary uppercase opacity-70">
                      {category}
                    </div>
                    {itemsInCategory.map((item) => {
                      const globalIndex = filteredSearchItems.findIndex((fi) => fi.id === item.id)
                      const isSelected = globalIndex === selectedSearchIndex

                      return (
                        <button
                          key={item.id}
                          onClick={() => triggerSearchItem(item)}
                          onMouseEnter={() => setSelectedSearchIndex(globalIndex)}
                          className={cn(
                            "group relative w-full text-left px-3 py-3 rounded-xl flex items-center gap-4 transition-all duration-200 cursor-pointer",
                            isSelected 
                              ? "bg-primary/10 text-foreground ring-1 ring-primary/20" 
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )}
                        >
                          <div className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-all",
                            isSelected 
                              ? "bg-card border-primary/30 shadow-sm text-primary" 
                              : "bg-muted/30 border-transparent text-muted-foreground"
                          )}>
                            {getCategoryIcon(item.category)}
                          </div>
                          
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className={cn(
                              "text-[13px] font-semibold tracking-tight",
                              isSelected ? "text-foreground" : "text-foreground/80"
                            )}>
                              {item.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground truncate leading-relaxed">
                              {item.description}
                            </span>
                          </div>

                          {isSelected && (
                            <div className="flex items-center gap-1.5 animate-in fade-in slide-in-from-right-2 duration-300">
                              <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Open</span>
                              <ArrowRight className="size-3.5 text-primary" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="px-4 h-11 border-t border-border/60 bg-muted/40 text-[10px] text-muted-foreground flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="flex items-center gap-1">
                <kbd className="bg-card border border-border px-1.5 py-0.5 rounded shadow-sm text-[9px] font-bold">↑</kbd>
                <kbd className="bg-card border border-border px-1.5 py-0.5 rounded shadow-sm text-[9px] font-bold">↓</kbd>
              </span>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="bg-card border border-border px-1.5 py-0.5 rounded shadow-sm text-[9px] font-bold">↵</kbd>
              <span>to select</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary/60">
            <Command className="size-3" />
            <span className="font-semibold tracking-wider font-mono">PANEL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
