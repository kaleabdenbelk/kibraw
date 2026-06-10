import { Sliders } from "lucide-react"
import type { ComponentPreviewState } from "./useComponentPreviewState"
import { INTERACTIVE_SLUGS } from "./useComponentPreviewState"

interface ComponentControlsPanelProps {
  slug: string
  state: ComponentPreviewState
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ComponentControlsPanel({ slug, state, open, onOpenChange }: ComponentControlsPanelProps) {
  const s = state
  const hasControls = (INTERACTIVE_SLUGS as readonly string[]).includes(slug)

  if (!hasControls) {
    return (
      <div className="text-xs text-muted-foreground italic text-center py-2">
        No live interactive controls available for this native component. Install via CLI to customize directly in your Expo project.
      </div>
    )
  }

  return (
    <div className="w-full border-t border-border/80 pt-6 mt-4">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className="md:hidden w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 cursor-pointer"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Sliders className="size-3.5" /> Live Controls & Knobs
        </span>
        <span>{open ? "−" : "+"}</span>
      </button>
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          <Sliders className="size-3.5" /> Live Controls & Knobs
        </div>
  {/* BUTTON CONTROLS */}
  {slug === "button" && (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Variant</label>
        <select
          value={s.btnVariant}
          onChange={(e) => s.setBtnVariant(e.target.value as "default" | "outline" | "secondary" | "ghost" | "destructive" | "link")}
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
          value={s.btnSize}
          onChange={(e) => s.setBtnSize(e.target.value as "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg")}
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
          value={s.btnLabel}
          onChange={(e) => s.setBtnLabel(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
    </div>
  )}

  {/* ACCORDION CONTROLS */}
  {slug === "accordion" && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div className="flex items-center justify-between p-2 rounded-lg border border-border/80 bg-white dark:bg-slate-900">
        <span className="text-xs font-medium text-slate-500">Selection Type</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => s.setAccType("single")}
            className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer
              ${s.accType === "single"
                ? "bg-slate-100 dark:bg-slate-800 border-border text-foreground font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            Single
          </button>
          <button
            onClick={() => s.setAccType("multiple")}
            className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer
              ${s.accType === "multiple"
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
          onClick={() => s.setAccCollapsible(!s.accCollapsible)}
          className={`px-3 py-1 text-xs rounded-md border transition-all cursor-pointer font-semibold
            ${s.accCollapsible
              ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 text-green-700 dark:text-green-400"
              : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900 text-red-700 dark:text-red-400"
            }`}
        >
          {s.accCollapsible ? "Enabled" : "Disabled"}
        </button>
      </div>
    </div>
  )}

  {/* ALERT CONTROLS */}
  {slug === "alert" && (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Variant</label>
        <select
          value={s.alVariant}
          onChange={(e) => s.setAlVariant(e.target.value as "default" | "destructive")}
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
          value={s.alTitle}
          onChange={(e) => s.setAlTitle(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
        <input
          type="text"
          value={s.alDescription}
          onChange={(e) => s.setAlDescription(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
    </div>
  )}

  {/* BADGE CONTROLS */}
  {slug === "badge" && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Variant</label>
        <select
          value={s.badgeVariant}
          onChange={(e) =>
            s.setBadgeVariant(e.target.value as "default" | "secondary" | "destructive" | "outline")
          }
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        >
          <option value="default">Default</option>
          <option value="secondary">Secondary</option>
          <option value="destructive">Destructive</option>
          <option value="outline">Outline</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Badge Label</label>
        <input
          type="text"
          value={s.badgeLabel}
          onChange={(e) => s.setBadgeLabel(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
    </div>
  )}

  {/* CARD CONTROLS */}
  {slug === "card" && (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Card Title</label>
        <input
          type="text"
          value={s.cardTitle}
          onChange={(e) => s.setCardTitle(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
        <input
          type="text"
          value={s.cardDescription}
          onChange={(e) => s.setCardDescription(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Content Text</label>
        <input
          type="text"
          value={s.cardContentText}
          onChange={(e) => s.setCardContentText(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
    </div>
  )}

  {/* INPUT CONTROLS */}
  {slug === "input" && (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Label</label>
        <input
          type="text"
          value={s.inputLabel}
          onChange={(e) => s.setInputLabel(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Value (Interactive)</label>
        <input
          type="text"
          value={s.inputValue}
          onChange={(e) => s.setInputValue(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Error Message (Optional)</label>
        <input
          type="text"
          value={s.inputError}
          onChange={(e) => s.setInputError(e.target.value)}
          placeholder="Type error text to show..."
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground"
        />
      </div>
    </div>
  )}

  {/* TEXTAREA CONTROLS */}
  {slug === "textarea" && (
    <div className="grid grid-cols-1 gap-4 text-sm">
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Textarea Content</label>
        <textarea
          value={s.textareaValue}
          onChange={(e) => s.setTextareaValue(e.target.value)}
          className="w-full text-xs p-1.5 rounded-lg border border-border bg-white dark:bg-slate-900 text-foreground h-16 resize-none"
        />
      </div>
    </div>
  )}

  {/* SKELETON CONTROLS */}
  {slug === "skeleton" && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div className="flex items-center justify-between p-2 rounded-lg border border-border/80 bg-white dark:bg-slate-900">
        <span className="text-xs font-medium text-slate-500">Loader Animation</span>
          <button
            onClick={() => s.setSkeletonLoading(!s.skeletonLoading)}
            className={`px-3 py-1 text-xs rounded-md border transition-all cursor-pointer font-semibold
              ${s.skeletonLoading
                ? "bg-kibra-primary/10 dark:bg-kibra-primary-dark/30 border-kibra-primary/30 dark:border-kibra-primary-dark/30 text-kibra-primary-dark dark:text-kibra-primary"
                : "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900 text-green-700 dark:text-green-400"
              }`}
          >
          {s.skeletonLoading ? "PULSING" : "LOADED / STATIC"}
        </button>
      </div>
    </div>
  )}

  {/* CHECKBOX CONTROLS */}
  {slug === "checkbox" && (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <div className="flex items-center justify-between p-2 rounded-lg border border-border/80 bg-white dark:bg-slate-900">
        <span className="text-xs font-medium text-slate-500">Checkbox Checked</span>
          <button
            onClick={() => s.setCheckboxChecked(!s.checkboxChecked)}
            className={`px-3 py-1 text-xs rounded-md border transition-all cursor-pointer font-semibold
              ${s.checkboxChecked
                ? "bg-kibra-primary/10 dark:bg-kibra-primary-dark/30 border-kibra-primary/30 dark:border-kibra-primary-dark/30 text-kibra-primary-dark dark:text-kibra-primary"
                : "bg-slate-50 dark:bg-slate-950 border-border text-slate-500"
              }`}
          >
          {s.checkboxChecked ? "TRUE" : "FALSE"}
        </button>
      </div>
    </div>
  )}
      </div>
    </div>
  )
}
