import * as React from "react"
import { Cpu, Eye, Code, Terminal } from "lucide-react"
import type { ComponentDoc } from "@/data/docs"
import { useCopy } from "@/lib/use-copy"
import { CodeBlock } from "./CodeBlock"
import { PropsTable } from "./PropsTable"
import { ComponentPreviewPanel } from "./ComponentPreviewPanel"
import { ComponentControlsPanel } from "./ComponentControlsPanel"
import { useComponentPreviewState } from "./useComponentPreviewState"

interface ComponentShowcaseProps {
  component: ComponentDoc
}

export function ComponentShowcase({ component }: ComponentShowcaseProps) {
  const { copiedText, handleCopy } = useCopy()
  const state = useComponentPreviewState()
  const { activeTab, setActiveTab, controlsOpen, setControlsOpen } = state

  React.useEffect(() => {
    setActiveTab("preview")
  }, [component.slug, setActiveTab])

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {component.badges?.map((badge) => (
            <span
              key={badge}
              className="text-xs font-semibold bg-kibra-primary/10 dark:bg-kibra-primary-dark/30 text-kibra-primary-dark dark:text-kibra-primary px-2.5 py-0.5 rounded-md"
            >
              {badge}
            </span>
          ))}
          <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-md flex items-center gap-1">
            <Cpu className="size-3" /> React Native Compatible
          </span>
        </div>
        <h1 className="text-h1 text-slate-900 dark:text-slate-50">{component.title}</h1>
        <p className="text-body-lg text-muted-foreground mt-2 font-light">{component.description}</p>
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center rounded-lg border border-border bg-muted/40 p-1">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              ${
                activeTab === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            aria-selected={activeTab === "preview"}
            role="tab"
          >
            <Eye className="size-4" /> Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              ${
                activeTab === "code"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            aria-selected={activeTab === "code"}
            role="tab"
          >
            <Code className="size-4" /> Code
          </button>
        </div>

        {activeTab === "preview" && (
          <div className="space-y-4">
            <div className="relative flex flex-col min-h-[300px] border border-border/80 rounded-xl bg-muted/30 p-6 md:p-8 justify-center items-center overflow-hidden shadow-elevation-2">
              <div className="flex-1 flex items-center justify-center p-6 w-full max-w-md">
                <ComponentPreviewPanel
                  slug={component.slug}
                  state={state}
                  copiedText={copiedText}
                  onCopy={handleCopy}
                />
              </div>
              <ComponentControlsPanel
                slug={component.slug}
                state={state}
                open={controlsOpen}
                onOpenChange={setControlsOpen}
              />
            </div>
          </div>
        )}

        {activeTab === "code" && (
          <CodeBlock
            label={`@/components/ui/${component.slug}.tsx`}
            code={component.code}
            copyId="comp-src"
            copiedText={copiedText}
            onCopy={handleCopy}
            variant="dark"
            className="my-4"
          />
        )}
      </div>

      <div className="space-y-3 pt-6 border-t border-border/60 sticky top-20 z-10 bg-background/95 backdrop-blur-sm py-4 -mx-1 px-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
          <Terminal className="size-4 text-kibra-primary" /> CLI Installation
        </h3>
        <CodeBlock
          label="Bash"
          code={component.installation}
          copyId="comp-install"
          copiedText={copiedText}
          onCopy={handleCopy}
        />
      </div>

      <div className="space-y-3 pt-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Usage Example</h3>
        <CodeBlock
          label="React (TypeScript)"
          code={component.usage}
          copyId="comp-usage"
          copiedText={copiedText}
          onCopy={handleCopy}
        />
      </div>

      <div className="space-y-4 pt-4 pb-12">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Props Reference</h3>
        <PropsTable props={component.props} />
      </div>
    </div>
  )
}
