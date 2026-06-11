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
        <div className="mb-3 flex flex-wrap gap-2">
          {component.badges?.map((badge) => (
            <span
              key={badge}
              className="rounded-md border border-kibra-primary/20 bg-kibra-primary/10 px-2.5 py-0.5 text-xs font-semibold text-kibra-primary-dark dark:border-kibra-primary/30 dark:bg-kibra-primary/20 dark:text-kibra-primary"
            >
              {badge}
            </span>
          ))}
          <span className="flex items-center gap-1.5 rounded-md border border-border/60 bg-slate-100/80 px-2.5 py-0.5 text-xs font-semibold text-slate-600 shadow-sm dark:bg-slate-900/80 dark:text-slate-400">
            <Cpu className="size-3.5 text-kibra-primary-dark dark:text-kibra-primary" />{" "}
            React Native Compatible
          </span>
        </div>
        <h1 className="text-h1 tracking-tight text-slate-900 dark:text-slate-50">
          {component.title}
        </h1>
        <p className="text-body-lg mt-2.5 leading-relaxed font-light text-muted-foreground">
          {component.description}
        </p>
      </div>

      <div className="space-y-5">
        <div className="inline-flex items-center rounded-xl border border-border/80 bg-slate-100/60 p-1 dark:bg-slate-900/40">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
              activeTab === "preview"
                ? "border border-border/40 bg-white font-semibold text-foreground shadow-sm dark:bg-slate-950"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-selected={activeTab === "preview"}
            role="tab"
          >
            <Eye className="size-4 text-kibra-primary-dark dark:text-kibra-primary" />{" "}
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
              activeTab === "code"
                ? "border border-border/40 bg-white font-semibold text-foreground shadow-sm dark:bg-slate-950"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-selected={activeTab === "code"}
            role="tab"
          >
            <Code className="size-4 text-kibra-primary-dark dark:text-kibra-primary" />{" "}
            Code
          </button>
        </div>

        {activeTab === "preview" && (
          <div className="animate-in space-y-4 duration-200 fade-in">
            <div
              className="relative flex min-h-[350px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/80 p-6 shadow-elevation-2 md:p-8"
              style={{
                backgroundColor: "var(--background)",
                backgroundImage:
                  "radial-gradient(var(--border) 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px",
              }}
            >
              <div className="flex w-full max-w-md flex-1 items-center justify-center p-6">
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
          <div className="animate-in duration-200 fade-in">
            <CodeBlock
              label={`@/components/ui/${component.slug}.tsx`}
              code={component.code}
              copyId="comp-src"
              copiedText={copiedText}
              onCopy={handleCopy}
              className="my-4"
            />
          </div>
        )}
      </div>

      <div className="sticky top-14 z-10 space-y-3.5 border-t border-border/40 bg-background/90 py-4 pt-8 backdrop-blur-md">
        <h3 className="flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-slate-50">
          <Terminal className="size-4.5 text-kibra-primary-dark dark:text-kibra-primary" />{" "}
          CLI Installation
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
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          Usage Example
        </h3>
        <CodeBlock
          label="React (TypeScript)"
          code={component.usage}
          copyId="comp-usage"
          copiedText={copiedText}
          onCopy={handleCopy}
        />
      </div>

      <div className="space-y-4 pt-4 pb-12">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
          Props Reference
        </h3>
        <PropsTable props={component.props} />
      </div>
    </div>
  )
}
