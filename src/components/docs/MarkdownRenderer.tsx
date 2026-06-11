import * as React from "react"
import { Check, Copy, Info, AlertTriangle, Lightbulb, Terminal as TerminalIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function parseInlineMarkdown(text: string): React.ReactNode[] {
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-bold text-foreground"
        >
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85rem] font-medium text-foreground border border-border/40"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
    if (linkMatch) {
      const linkText = linkMatch[1]
      const linkUrl = linkMatch[2]
      return (
        <a
          key={index}
          href={linkUrl}
          target={linkUrl.startsWith("http") ? "_blank" : undefined}
          rel={linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
          className="font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
        >
          {linkText}
        </a>
      )
    }
    return part
  })
}

export function renderMarkdownBlock(
  block: string,
  idx: number,
  copiedText: string | null,
  handleCopy: (text: string, id: string) => void
): React.ReactNode {
  const trimmed = block.trim()
  if (!trimmed) return null

  // H1 (Main headers in guides)
  if (trimmed.startsWith("# ")) {
    return (
      <h2
        key={idx}
        className="mt-12 mb-6 scroll-m-20 border-b border-border pb-3 text-3xl font-extrabold tracking-tight"
      >
        {parseInlineMarkdown(trimmed.replace("# ", ""))}
      </h2>
    )
  }

  // H2
  if (trimmed.startsWith("## ")) {
    return (
      <h3
        key={idx}
        className="mt-10 mb-4 scroll-m-20 border-b border-border pb-2 text-2xl font-bold tracking-tight first:mt-0"
      >
        {parseInlineMarkdown(trimmed.replace("## ", ""))}
      </h3>
    )
  }

  // H3
  if (trimmed.startsWith("### ")) {
    return (
      <h4
        key={idx}
        className="mt-8 mb-4 scroll-m-20 text-xl font-semibold tracking-tight"
      >
        {parseInlineMarkdown(trimmed.replace("### ", ""))}
      </h4>
    )
  }

  // Horizontal Rule
  if (trimmed === "---") {
    return <hr key={idx} className="my-8 border-border/60" />
  }

  // Blockquotes / Callouts
  if (trimmed.startsWith(">")) {
    const content = trimmed.replace(/^>\s*/, "").trim()
    let type = "info"
    let title = ""
    let text = content
    let Icon = Info

    if (content.startsWith("**Note:**") || content.startsWith("**NOTE:**")) {
      type = "note"
      title = "Note"
      text = content.replace(/^\*\*(Note|NOTE):\*\*\s*/, "")
    } else if (content.startsWith("**Warning:**") || content.startsWith("**WARNING:**")) {
      type = "warning"
      title = "Warning"
      Icon = AlertTriangle
      text = content.replace(/^\*\*(Warning|WARNING):\*\*\s*/, "")
    } else if (content.startsWith("**Tip:**") || content.startsWith("**TIP:**") || content.startsWith("💡")) {
      type = "tip"
      title = "Tip"
      Icon = Lightbulb
      text = content.replace(/^\*\*(Tip|TIP):\*\*\s*/, "").replace(/^💡\s*/, "")
    }

    return (
      <div
        key={idx}
        className={cn(
          "my-6 flex gap-4 rounded-xl border p-5 shadow-sm transition-all",
          type === "note" && "border-blue-500/20 bg-blue-500/5 text-blue-900 dark:text-blue-100",
          type === "warning" && "border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-100",
          type === "tip" && "border-emerald-500/20 bg-emerald-500/5 text-emerald-900 dark:text-emerald-100",
          type === "info" && "border-border/60 bg-muted/40 text-foreground"
        )}
      >
        <Icon className={cn(
          "mt-0.5 size-5 shrink-0",
          type === "note" && "text-blue-500",
          type === "warning" && "text-amber-500",
          type === "tip" && "text-emerald-500",
          type === "info" && "text-muted-foreground"
        )} />
        <div className="space-y-1.5 flex-1 min-w-0">
          {title && (
            <span className={cn(
              "text-xs font-bold uppercase tracking-wider",
              type === "note" && "text-blue-600 dark:text-blue-400",
              type === "warning" && "text-amber-600 dark:text-amber-400",
              type === "tip" && "text-emerald-600 dark:text-emerald-400"
            )}>
              {title}
            </span>
          )}
          <div className="text-[15px] leading-relaxed opacity-90">
            {parseInlineMarkdown(text)}
          </div>
        </div>
      </div>
    )
  }

  // Tables
  if (trimmed.startsWith("|")) {
    const lines = trimmed.split("\n").map(l => l.trim()).filter(Boolean)
    if (lines.length >= 2) {
      const headers = lines[0].split("|").slice(1, -1).map(h => h.trim())
      const alignLine = lines[1]
      const aligns = alignLine.split("|").slice(1, -1).map(a => {
        const s = a.trim()
        if (s.startsWith(":") && s.endsWith(":")) return "center"
        if (s.endsWith(":")) return "right"
        return "left"
      })

      const rows = lines.slice(2).map(line => {
        return line.split("|").slice(1, -1).map(c => c.trim())
      })

      return (
        <div key={idx} className="my-8 w-full overflow-y-auto rounded-xl border border-border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 transition-colors hover:bg-muted">
                {headers.map((header, hIdx) => (
                  <th
                    key={hIdx}
                    className="h-11 px-4 text-left align-middle text-xs font-bold text-muted-foreground uppercase tracking-wider"
                    style={{ textAlign: (aligns[hIdx] as any) || "left" }}
                  >
                    {parseInlineMarkdown(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0 text-sm">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-border transition-colors hover:bg-muted/30">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="p-4 align-middle font-normal"
                      style={{ textAlign: (aligns[cIdx] as any) || "left" }}
                    >
                      {parseInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  // Code Blocks
  if (trimmed.startsWith("```")) {
    const lines = trimmed.split("\n")
    let language = "Code"
    const firstLine = lines[0]
    if (firstLine.length > 3) {
      const lang = firstLine.slice(3).toLowerCase()
      if (lang === "bash" || lang === "sh") language = "bash"
      else if (lang === "tsx" || lang === "ts") language = "tsx"
      else if (lang === "json") language = "json"
      else language = lang
    }
    const codeContent = lines.slice(1, -1).join("\n")
    return (
      <div key={idx} className="group relative my-8 overflow-hidden rounded-xl border border-border bg-zinc-950 shadow-md">
        <div className="flex h-11 items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="size-3.5 text-zinc-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {language === 'bash' ? 'terminal' : language}
            </span>
          </div>
          <button
            onClick={() => handleCopy(codeContent, `guide-code-${idx}`)}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100"
          >
            {copiedText === `guide-code-${idx}` ? (
              <>
                <Check className="size-3.5" /> <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" /> <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="max-h-[600px] overflow-x-auto p-5 text-[13px] font-medium leading-relaxed text-zinc-200">
          <code className={language}>{codeContent}</code>
        </pre>
      </div>
    )
  }

  // Lists
  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
    const items = trimmed.split("\n").map(line => line.replace(/^[-*]\s+/, ""))
    return (
      <ul key={idx} className="my-6 ml-6 list-disc space-y-3 marker:text-muted-foreground/60">
        {items.map((item, iIdx) => (
          <li key={iIdx} className="leading-relaxed opacity-90">
            {parseInlineMarkdown(item)}
          </li>
        ))}
      </ul>
    )
  }

  if (/^\d+\.\s+/.test(trimmed)) {
    const items = trimmed.split("\n").map(line => line.replace(/^\d+\.\s+/, ""))
    return (
      <ol key={idx} className="my-6 ml-6 list-decimal space-y-3 marker:text-muted-foreground/60">
        {items.map((item, iIdx) => (
          <li key={iIdx} className="leading-relaxed opacity-90">
            {parseInlineMarkdown(item)}
          </li>
        ))}
      </ol>
    )
  }

  // Paragraph
  return (
    <p key={idx} className="leading-relaxed [&&]:my-6 opacity-90 first:mt-0">
      {parseInlineMarkdown(trimmed)}
    </p>
  )
}
