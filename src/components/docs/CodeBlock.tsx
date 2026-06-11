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
  className = "",
}: CodeBlockProps) {
  return (
    <div
      className={`relative group rounded-xl overflow-hidden border border-border/80 bg-zinc-950 font-mono text-[13px] leading-relaxed shadow-lg ${className}`}
    >
      <div className="flex h-11 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-zinc-800" />
            <div className="size-2.5 rounded-full bg-zinc-800" />
            <div className="size-2.5 rounded-full bg-zinc-800" />
          </div>
          <span className="text-[11px] font-medium text-zinc-500 font-sans ml-1 tracking-tight">{label}</span>
        </div>
        <button
          onClick={() => onCopy(code, copyId)}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100"
          aria-label="Copy code"
        >
          {copiedText === copyId ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="max-h-[650px] overflow-x-auto p-5 text-zinc-200 custom-scrollbar">
        <code className="block">{code}</code>
      </pre>
    </div>
  )
}
