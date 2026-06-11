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
      className={`relative group rounded-xl overflow-hidden border border-border/80 bg-zinc-950 font-mono text-[15px] leading-6 shadow-xl ${className}`}
    >
      <div className="flex h-12 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-zinc-800/80" />
            <div className="size-2.5 rounded-full bg-zinc-800/80" />
            <div className="size-2.5 rounded-full bg-zinc-800/80" />
          </div>
          <span className="text-[12px] font-semibold text-zinc-400 font-sans tracking-tight">{label}</span>
        </div>
        <button
          onClick={() => onCopy(code, copyId)}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100"
          aria-label="Copy code"
        >
          {copiedText === copyId ? (
            <>
              <Check className="size-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="max-h-[700px] overflow-x-auto p-6 sm:p-8 text-zinc-200 custom-scrollbar tracking-tight">
        <code className="block">{code}</code>
      </pre>
    </div>
  )
}
