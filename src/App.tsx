import * as React from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion-native"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert-native"
import { GUIDE_DOCS, COMPONENT_DOCS } from "@/data/docs"
import {
  Menu,
  X,
  Check,
  Copy,
  Terminal,
  Sliders,
  Eye,
  Code,
  Sun,
  Moon,
  Layers,
  BookOpen,
  Cpu,
  Sparkles,
  ArrowRight,
  Search
} from "lucide-react"

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

// Helper to check if a slug is a component or a guide
const isComponentSlug = (slug: string): slug is keyof typeof COMPONENT_DOCS => {
  return slug in COMPONENT_DOCS
}

export function App() {
  const { theme, setTheme } = useTheme()
  const [activeSlug, setActiveSlug] = React.useState<string>("introduction")
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview")

  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedSearchIndex, setSelectedSearchIndex] = React.useState(0)

  const searchItems = [
    { id: "intro", title: "Introduction", description: "Re-imagining components with universal React Native primitives.", category: "Guides" as const, slug: "introduction" },
    { id: "install", title: "Installation", description: "How to set up and configure your project for Kibra UI.", category: "Guides" as const, slug: "installation" },
    { id: "cli", title: "Command Line Interface", description: "Initialize, configure, and add components to your workspace instantly.", category: "Guides" as const, slug: "cli" },
    { id: "btn", title: "Button Component", description: "Displays a button or a component that looks like a button.", category: "Components" as const, slug: "button" },
    { id: "acc", title: "Accordion Component", description: "A vertically collapsing accordion list with smooth animated transitions.", category: "Components" as const, slug: "accordion" },
    { id: "al", title: "Alert Component", description: "Displays a beautiful alert banner or callout box for notifications.", category: "Components" as const, slug: "alert" },
    { id: "theme", title: "Toggle Theme", description: `Switch to ${theme === "dark" ? "Light" : "Dark"} mode.`, category: "Actions" as const, action: () => setTheme(theme === "dark" ? "light" : "dark") },
    { id: "github", title: "GitHub Repository", description: "View the source code of the UI UX Pro Max skill.", category: "Actions" as const, action: () => window.open("https://github.com/nextlevelbuilder/ui-ux-pro-max-skill", "_blank") },
  ]

  const filteredSearchItems = searchItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Ctrl+K or Cmd+K shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const triggerSearchItem = (item: typeof searchItems[number]) => {
    if (item.slug) {
      navigateTo(item.slug)
    } else if (item.action) {
      item.action()
    }
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  // Interactive states for BUTTON preview
  const [btnVariant, setBtnVariant] = React.useState<"default" | "outline" | "secondary" | "ghost" | "destructive" | "link">("default")
  const [btnSize, setBtnSize] = React.useState<"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg">("default")
  const [btnLabel, setBtnLabel] = React.useState("Click Me")
  const [btnClicks, setBtnClicks] = React.useState(0)

  // Interactive states for ACCORDION preview
  const [accType, setAccType] = React.useState<"single" | "multiple">("single")
  const [accCollapsible, setAccCollapsible] = React.useState(true)

  // Interactive states for ALERT preview
  const [alVariant, setAlVariant] = React.useState<"default" | "destructive">("default")
  const [alTitle, setAlTitle] = React.useState("Heads up!")
  const [alDescription, setAlDescription] = React.useState("This alert component runs universally on web and native devices.")

  // Sync state with URL hash
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith("#/docs/")) {
        const slug = hash.replace("#/docs/", "")
        if (slug in GUIDE_DOCS || slug in COMPONENT_DOCS) {
          setActiveSlug(slug)
          // Scroll to top of article container on navigation
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      } else {
        // Default route
        window.location.hash = "#/docs/introduction"
      }
    }

    // Run once on load
    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigateTo = (slug: string) => {
    window.location.hash = `#/docs/${slug}`
    setMobileMenuOpen(false)
    setActiveTab("preview")
  }

  // Code copy helper
  const [copiedText, setCopiedText] = React.useState<string | null>(null)
  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      setIsSearchOpen(false)
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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-indigo-500/20">
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-6 max-w-[1400px] mx-auto w-full">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("introduction")}>
              <div className="flex items-center justify-center size-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 font-bold text-base leading-none">
                K
              </div>
              <span className="font-semibold text-base tracking-tight">Kibra UI</span>
              <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full font-mono font-medium ml-1">
                v0.1
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 h-9 w-40 md:w-64 px-3 rounded-lg border border-border bg-slate-50/50 dark:bg-slate-900 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 text-muted-foreground hover:text-foreground text-xs font-normal transition-all cursor-pointer"
            >
              <Search className="size-3.5 shrink-0" />
              <span className="flex-1 text-left">Search docs...</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-white dark:bg-slate-950 px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
                <span className="text-[9px]">⌘</span>K
              </kbd>
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex sm:hidden p-2 text-muted-foreground hover:text-foreground rounded-md transition-colors cursor-pointer"
              title="Search"
            >
              <Search className="size-5" />
            </button>

            <a
              href="https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground p-2 rounded-md transition-colors"
            >
              <Github className="size-5" />
            </a>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground p-2 rounded-md transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* CORE CONTENT LAYOUT */}
      <div className="flex-1 flex max-w-[1400px] mx-auto w-full px-6">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className={`
          fixed md:sticky top-14 left-0 z-30 w-64 h-[calc(100vh-3.5rem)] shrink-0 overflow-y-auto border-r border-border/60 bg-background md:bg-transparent px-4 py-6 transition-all duration-300 md:block
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          <div className="space-y-6">
            {/* GETTING STARTED GROUP */}
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase px-3 mb-3 flex items-center gap-1.5">
                <BookOpen className="size-3.5" /> Getting Started
              </h4>
              <ul className="space-y-1">
                {Object.values(GUIDE_DOCS).map((guide) => (
                  <li key={guide.slug}>
                    <button
                      onClick={() => navigateTo(guide.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer flex items-center justify-between
                        ${activeSlug === guide.slug
                          ? "bg-secondary text-foreground dark:bg-secondary/70"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                        }`}
                    >
                      {guide.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPONENTS GROUP */}
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase px-3 mb-3 flex items-center gap-1.5">
                <Layers className="size-3.5" /> Universal Primitives
              </h4>
              <ul className="space-y-1">
                {Object.values(COMPONENT_DOCS).map((component) => (
                  <li key={component.slug}>
                    <button
                      onClick={() => navigateTo(component.slug)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer flex items-center justify-between
                        ${activeSlug === component.slug
                          ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-semibold"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                        }`}
                    >
                      <span>{component.title}</span>
                      {component.badges && component.badges.includes("New") && (
                        <span className="text-[10px] font-semibold font-mono text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950/30 px-1 py-0.5 rounded-md">
                          New
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* BACKDROP FOR MOBILE MENU */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}

        {/* MAIN DOCUMENTATION WINDOW */}
        <main className="flex-1 min-w-0 md:pl-8 py-8 md:py-10">
          <article className="max-w-3xl">
            {/* RENDER GUIDE PAGE */}
            {!isComponentSlug(activeSlug) && GUIDE_DOCS[activeSlug] && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900 dark:text-slate-50">
                    {GUIDE_DOCS[activeSlug].title}
                  </h1>
                  <p className="text-lg text-muted-foreground mt-2 font-light">
                    {GUIDE_DOCS[activeSlug].description}
                  </p>
                </div>

                <div className="border-t border-border mt-6 pt-6 prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4">
                  {GUIDE_DOCS[activeSlug].content.split("\n\n").map((block, idx) => {
                    if (block.startsWith("### ")) {
                      return (
                        <h3 key={idx} className="text-xl font-bold text-slate-900 dark:text-slate-50 mt-8 mb-4">
                          {block.replace("### ", "")}
                        </h3>
                      )
                    }
                    if (block.startsWith("1. ") || block.startsWith("2. ") || block.startsWith("3. ") || block.startsWith("4. ")) {
                      return (
                        <ol key={idx} className="list-decimal list-inside space-y-2 pl-2">
                          {block.split("\n").map((li, lIdx) => (
                            <li key={lIdx} className="leading-relaxed">
                              {li.replace(/^\d+\.\s+/, "")}
                            </li>
                          ))}
                        </ol>
                      )
                    }
                    if (block.startsWith("```")) {
                      const lines = block.split("\n")
                      const content = lines.slice(1, -1).join("\n")
                      return (
                        <div key={idx} className="relative group rounded-xl overflow-hidden border border-border/80 bg-slate-50 dark:bg-slate-950 font-mono text-xs leading-relaxed my-4">
                          <div className="flex items-center justify-between px-4 py-1.5 bg-slate-100/50 dark:bg-slate-900/60 border-b border-border/80">
                            <span className="text-[10px] text-muted-foreground font-sans">Terminal</span>
                            <button
                              onClick={() => handleCopy(content, `guide-code-${idx}`)}
                              className="p-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                            >
                              {copiedText === `guide-code-${idx}` ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                            </button>
                          </div>
                          <pre className="p-4 overflow-x-auto text-slate-800 dark:text-slate-300">
                            <code>{content}</code>
                          </pre>
                        </div>
                      )
                    }
                    return <p key={idx} className="leading-relaxed">{block}</p>
                  })}
                </div>

                {/* NEXT PAGE CARD */}
                <div className="border-t border-border mt-10 pt-8 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (activeSlug === "introduction") navigateTo("installation")
                      if (activeSlug === "installation") navigateTo("cli")
                      if (activeSlug === "cli") navigateTo("button")
                    }}
                    className="gap-2 group"
                  >
                    <span>Next step</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}

            {/* RENDER COMPONENT PAGE */}
            {isComponentSlug(activeSlug) && COMPONENT_DOCS[activeSlug] && (
              <div className="space-y-8">
                <div>
                  {/* Badges and titles */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {COMPONENT_DOCS[activeSlug].badges?.map((badge) => (
                      <span key={badge} className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded-md">
                        {badge}
                      </span>
                    ))}
                    <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Cpu className="size-3" /> React Native Compatible
                    </span>
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900 dark:text-slate-50">
                    {COMPONENT_DOCS[activeSlug].title}
                  </h1>
                  <p className="text-lg text-muted-foreground mt-2 font-light">
                    {COMPONENT_DOCS[activeSlug].description}
                  </p>
                </div>

                {/* TWO TABS: PREVIEW & CODE */}
                <div className="space-y-4">
                  <div className="flex border-b border-border/80">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 -mb-[2px] transition-all cursor-pointer flex items-center gap-2
                        ${activeTab === "preview"
                          ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <Eye className="size-4" /> Preview
                    </button>
                    <button
                      onClick={() => setActiveTab("code")}
                      className={`px-4 py-2 text-sm font-medium border-b-2 -mb-[2px] transition-all cursor-pointer flex items-center gap-2
                        ${activeTab === "code"
                          ? "border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <Code className="size-4" /> Code
                    </button>
                  </div>

                  {activeTab === "preview" && (
                    <div className="space-y-4">
                      {/* PREVIEW CONTAINER */}
                      <div className="relative flex flex-col min-h-[300px] border border-border/80 rounded-xl bg-slate-50 dark:bg-slate-950/40 p-6 md:p-8 justify-center items-center overflow-hidden">
                        
                        {/* THE LIVE COMPONENT DISPLAY CONTAINER */}
                        <div className="flex-1 flex items-center justify-center p-6 w-full max-w-md">
                          
                          {/* BUTTON PREVIEW */}
                          {activeSlug === "button" && (
                            <div className="flex flex-col items-center gap-4">
                              <Button
                                variant={btnVariant}
                                size={btnSize}
                                onClick={() => setBtnClicks(c => c + 1)}
                              >
                                {btnSize === "icon" || btnSize === "icon-xs" || btnSize === "icon-sm" || btnSize === "icon-lg" ? (
                                  <Sparkles className="size-4" />
                                ) : (
                                  btnLabel
                                )}
                              </Button>
                              <div className="text-[11px] text-muted-foreground font-mono bg-white dark:bg-slate-900 border border-border px-2 py-0.5 rounded-md">
                                Clicks: {btnClicks}
                              </div>
                            </div>
                          )}

                          {/* ACCORDION PREVIEW */}
                          {activeSlug === "accordion" && (
                            <div className="w-full bg-white dark:bg-slate-900 border border-border/60 rounded-xl p-5 shadow-sm">
                              <Accordion type={accType} collapsible={accCollapsible} defaultValue="item-1">
                                <AccordionItem value="item-1">
                                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                  <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern and is fully screen-reader compatible.
                                  </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                  <AccordionTrigger>Is it universal?</AccordionTrigger>
                                  <AccordionContent>
                                    Yes! It renders flawlessly as a React Native list on iOS/Android, and mirrors as a lightweight compliant accordion on Web.
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </div>
                          )}

                          {/* ALERT PREVIEW */}
                          {activeSlug === "alert" && (
                            <div className="w-full">
                              <Alert variant={alVariant}>
                                <AlertDescription>
                                  <AlertTitle>{alTitle}</AlertTitle>
                                  {alDescription}
                                </AlertDescription>
                              </Alert>
                            </div>
                          )}

                        </div>

                        {/* CONTROLS EXPANDER PANEL */}
                        <div className="w-full border-t border-border/80 pt-6 mt-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                            <Sliders className="size-3.5" /> Live Controls & Knobs
                          </div>

                          {/* BUTTON CONTROLS */}
                          {activeSlug === "button" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">Variant</label>
                                <select
                                  value={btnVariant}
                                  onChange={(e) => setBtnVariant(e.target.value as "default" | "outline" | "secondary" | "ghost" | "destructive" | "link")}
                                  className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
                                >
                                  <option value="default">Default (Solid)</option>
                                  <option value="outline">Outline</option>
                                  <option value="secondary">Secondary</option>
                                  <option value="ghost">Ghost</option>
                                  <option value="destructive">Destructive</option>
                                  <option value="link">Link</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">Size Scale</label>
                                <select
                                  value={btnSize}
                                  onChange={(e) => setBtnSize(e.target.value as "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg")}
                                  className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
                                >
                                  <option value="default">Default</option>
                                  <option value="xs">Extra Small (xs)</option>
                                  <option value="sm">Small (sm)</option>
                                  <option value="lg">Large (lg)</option>
                                  <option value="icon">Icon only</option>
                                </select>
                              </div>
                              <div className="sm:col-span-2 md:col-span-1">
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">Button Label</label>
                                <input
                                  type="text"
                                  value={btnLabel}
                                  onChange={(e) => setBtnLabel(e.target.value)}
                                  className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
                                />
                              </div>
                            </div>
                          )}

                          {/* ACCORDION CONTROLS */}
                          {activeSlug === "accordion" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center justify-between p-2 rounded-lg border border-border/80 bg-white dark:bg-slate-900">
                                <span className="text-xs font-medium text-slate-500">Selection Type</span>
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => setAccType("single")}
                                    className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer
                                      ${accType === "single"
                                        ? "bg-slate-100 dark:bg-slate-800 border-border text-foreground font-semibold"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                      }`}
                                  >
                                    Single
                                  </button>
                                  <button
                                    onClick={() => setAccType("multiple")}
                                    className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer
                                      ${accType === "multiple"
                                        ? "bg-slate-100 dark:bg-slate-800 border-border text-foreground font-semibold"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                      }`}
                                  >
                                    Multiple
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-center justify-between p-2 rounded-lg border border-border/80 bg-white dark:bg-slate-900">
                                <span className="text-xs font-medium text-slate-500">Allow Collapsing All</span>
                                <button
                                  onClick={() => setAccCollapsible(!accCollapsible)}
                                  className={`px-3 py-1 text-xs rounded-md border transition-all cursor-pointer font-semibold
                                    ${accCollapsible
                                      ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 text-green-700 dark:text-green-400"
                                      : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-700 dark:text-red-400"
                                    }`}
                                >
                                  {accCollapsible ? "Enabled" : "Disabled"}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* ALERT CONTROLS */}
                          {activeSlug === "alert" && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">Variant</label>
                                <select
                                  value={alVariant}
                                  onChange={(e) => setAlVariant(e.target.value as "default" | "destructive")}
                                  className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
                                >
                                  <option value="default">Default</option>
                                  <option value="destructive">Destructive</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">Alert Title</label>
                                <input
                                  type="text"
                                  value={alTitle}
                                  onChange={(e) => setAlTitle(e.target.value)}
                                  className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
                                <input
                                  type="text"
                                  value={alDescription}
                                  onChange={(e) => setAlDescription(e.target.value)}
                                  className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "code" && (
                    <div className="relative group rounded-xl overflow-hidden border border-border/80 bg-slate-900 font-mono text-xs leading-relaxed my-4">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-border/80">
                        <span className="text-[10px] text-muted-foreground font-sans">
                          src/components/ui/{COMPONENT_DOCS[activeSlug].slug === "button" ? "button.tsx" : `${COMPONENT_DOCS[activeSlug].slug}-native.tsx`}
                        </span>
                        <button
                          onClick={() => handleCopy(COMPONENT_DOCS[activeSlug].code, "comp-src")}
                          className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] rounded-md bg-slate-800 border border-slate-700 hover:bg-slate-700 cursor-pointer text-slate-200 transition-colors"
                        >
                          {copiedText === "comp-src" ? (
                            <>
                              <Check className="size-3 text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="p-4 overflow-x-auto max-h-[500px]">
                        <pre className="text-slate-200">
                          <code>{COMPONENT_DOCS[activeSlug].code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>

                {/* SECTION: CLI INSTALLATION */}
                <div className="space-y-3 pt-6 border-t border-border/60">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <Terminal className="size-4 text-indigo-500" /> CLI Installation
                  </h3>
                  <div className="relative group rounded-xl overflow-hidden border border-border bg-slate-50 dark:bg-slate-950 font-mono text-xs leading-relaxed">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-100/50 dark:bg-slate-900/40 border-b border-border">
                      <span className="text-[10px] text-muted-foreground font-sans">Bash</span>
                      <button
                        onClick={() => handleCopy(COMPONENT_DOCS[activeSlug].installation, "comp-install")}
                        className="p-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      >
                        {copiedText === "comp-install" ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-slate-800 dark:text-slate-300">
                      <code>{COMPONENT_DOCS[activeSlug].installation}</code>
                    </pre>
                  </div>
                </div>

                {/* SECTION: MANUAL USAGE */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Usage Example</h3>
                  <div className="relative group rounded-xl overflow-hidden border border-border bg-slate-50 dark:bg-slate-950 font-mono text-xs leading-relaxed">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-100/50 dark:bg-slate-900/40 border-b border-border">
                      <span className="text-[10px] text-muted-foreground font-sans">React (TypeScript)</span>
                      <button
                        onClick={() => handleCopy(COMPONENT_DOCS[activeSlug].usage, "comp-usage")}
                        className="p-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      >
                        {copiedText === "comp-usage" ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-slate-800 dark:text-slate-300">
                      <code>{COMPONENT_DOCS[activeSlug].usage}</code>
                    </pre>
                  </div>
                </div>

                {/* SECTION: PROPS SPECIFICATIONS */}
                <div className="space-y-4 pt-4 pb-12">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Props Reference</h3>
                  <div className="overflow-x-auto border border-border/80 rounded-xl bg-white dark:bg-slate-950/10">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border bg-slate-50/50 dark:bg-slate-950/40">
                          <th className="p-3 font-semibold text-slate-900 dark:text-slate-50">Prop</th>
                          <th className="p-3 font-semibold text-slate-900 dark:text-slate-50">Type</th>
                          <th className="p-3 font-semibold text-slate-900 dark:text-slate-50">Default</th>
                          <th className="p-3 font-semibold text-slate-900 dark:text-slate-50">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COMPONENT_DOCS[activeSlug].props.map((prop) => (
                          <tr key={prop.name} className="border-b border-border/50 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 last:border-b-0">
                            <td className="p-3 font-semibold text-slate-900 dark:text-slate-200 font-mono">{prop.name}</td>
                            <td className="p-3 text-indigo-600 dark:text-indigo-400 font-mono break-all">{prop.type}</td>
                            <td className="p-3 text-muted-foreground font-mono">{prop.default}</td>
                            <td className="p-3 text-slate-600 dark:text-slate-300">{prop.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </article>
        </main>
      </div>

      {/* SEARCH COMMAND DIALOG */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 dark:bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4 transition-all">
          <div
            onClick={() => {
              setIsSearchOpen(false)
              setSearchQuery("")
            }}
            className="absolute inset-0"
          />
          <div className="relative w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl flex flex-col overflow-hidden max-h-[450px]">
            {/* SEARCH INPUT */}
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
                  setIsSearchOpen(false)
                  setSearchQuery("")
                }}
                className="text-[10px] bg-slate-100 dark:bg-slate-900 border border-border px-1.5 py-0.5 rounded text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* SEARCH RESULTS */}
            <div className="flex-1 overflow-y-auto p-2 space-y-4">
              {filteredSearchItems.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  No matches found. Try another search.
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Category groups */}
                  {["Guides", "Components", "Actions"].map((category) => {
                    const itemsInCategory = filteredSearchItems.filter(
                      (item) => item.category === category
                    )
                    if (itemsInCategory.length === 0) return null

                    return (
                      <div key={category}>
                        <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase px-2 py-1">
                          {category}
                        </div>
                        <div className="space-y-0.5 mt-1">
                          {itemsInCategory.map((item) => {
                            const globalIndex = filteredSearchItems.findIndex(
                              (fi) => fi.id === item.id
                            )
                            const isSelected = globalIndex === selectedSearchIndex

                            return (
                              <button
                                key={item.id}
                                onClick={() => triggerSearchItem(item)}
                                onMouseEnter={() => setSelectedSearchIndex(globalIndex)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex flex-col gap-0.5 transition-all cursor-pointer
                                  ${isSelected
                                    ? "bg-slate-100 dark:bg-slate-900 text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                  }`}
                              >
                                <span className={`font-semibold ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-foreground"}`}>
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

            {/* SEARCH FOOTER */}
            <div className="px-4 py-2 border-t border-border/60 bg-slate-50 dark:bg-slate-950/20 text-[10px] text-muted-foreground flex items-center justify-between shrink-0 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-0.5">
                  <kbd className="border border-border bg-white dark:bg-slate-900 px-1 rounded shadow-sm text-[8px] font-semibold">↑</kbd>
                  <kbd className="border border-border bg-white dark:bg-slate-900 px-1 rounded shadow-sm text-[8px] font-semibold">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-0.5">
                  <kbd className="border border-border bg-white dark:bg-slate-900 px-1 rounded shadow-sm text-[8px] font-semibold">↵</kbd>
                  select
                </span>
              </div>
              <div>
                <span>{filteredSearchItems.length} results</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
