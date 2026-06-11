import { Check, Copy } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  label: string
  code: string
  copyId: string
  copiedText: string | null
  onCopy: (text: string, id: string) => void
  language?: string
  className?: string
}

const customPrismTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: 'transparent',
    padding: '0',
    margin: '0',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
    fontFamily: 'inherit',
  },
}

export function CodeBlock({
  label,
  code,
  copyId,
  copiedText,
  onCopy,
  language = "tsx",
  className = "",
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "relative group rounded-xl overflow-hidden border border-border/80 bg-zinc-950 font-mono text-[14.5px] leading-6 shadow-sm",
        className
      )}
    >
      <div className="flex h-11 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-zinc-800/80" />
            <div className="size-2 rounded-full bg-zinc-800/80" />
            <div className="size-2 rounded-full bg-zinc-800/80" />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 font-sans tracking-widest uppercase">{label}</span>
        </div>
        <button
          onClick={() => onCopy(code, copyId)}
          className="flex items-center gap-2 rounded-md px-2.5 py-1 text-[11px] font-semibold text-zinc-400 transition-all hover:bg-zinc-800 text-zinc-100"
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
              <span className="opacity-100 transition-opacity">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="max-h-[700px] overflow-x-auto p-5 sm:p-6 custom-scrollbar tracking-tight text-zinc-100">
        <SyntaxHighlighter
          language={language === "terminal" ? "bash" : language}
          style={customPrismTheme}
          useInlineStyles={true}
          customStyle={{
            background: 'transparent',
            padding: 0,
            margin: 0,
            color: 'inherit',
          }}
          codeTagProps={{
            style: {
              background: 'transparent',
              fontFamily: 'inherit',
              color: 'inherit',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
