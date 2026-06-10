import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  label: string
  code: string
  copyId: string
  copiedText: string | null
  onCopy: (text: string, id: string) => void
  variant?: "light" | "dark"
  className?: string
}

export function CodeBlock({
  label,
  code,
  copyId,
  copiedText,
  onCopy,
  variant = "light",
  className = "",
}: CodeBlockProps) {
  const isDark = variant === "dark"

  return (
    <div
      className={`relative group rounded-xl overflow-hidden border border-border font-mono text-xs leading-relaxed shadow-elevation-2 ${
        isDark ? "bg-slate-900 border-border/80" : "bg-slate-50 dark:bg-slate-950"
      } ${className}`}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 border-b border-border ${
          isDark ? "bg-slate-950 border-border/80" : "bg-slate-100/50 dark:bg-slate-900/40"
        }`}
      >
        <span className="text-[10px] text-muted-foreground font-sans">{label}</span>
        <button
          onClick={() => onCopy(code, copyId)}
          className={`inline-flex items-center gap-1.5 px-2 py-1 text-[11px] rounded-md cursor-pointer transition-colors ${
            isDark
              ? "bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200"
              : "p-1 text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Copy code"
        >
          {copiedText === copyId ? (
            <>
              <Check className={`size-3 ${isDark ? "text-green-400" : "text-green-500"}`} />
              {isDark && <span className="text-green-400">Copied</span>}
            </>
          ) : (
            <>
              <Copy className="size-3" />
              {isDark && <span>Copy Code</span>}
            </>
          )}
        </button>
      </div>
      <pre
        className={`p-4 overflow-x-auto ${isDark ? "text-slate-200 max-h-[500px]" : "text-slate-800 dark:text-slate-300"}`}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
