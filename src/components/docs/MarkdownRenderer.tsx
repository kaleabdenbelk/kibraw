import * as React from "react"
import { Check, Copy } from "lucide-react"

export function parseInlineMarkdown(text: string): React.ReactNode[] {
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-slate-900 dark:text-slate-50">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="bg-slate-100 dark:bg-slate-900/60 px-1.5 py-0.5 rounded font-mono text-xs text-kibra-primary-dark dark:text-kibra-primary border border-border/40"
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
          className="text-kibra-primary-dark dark:text-kibra-primary hover:text-kibra-primary hover:underline transition-colors font-semibold"
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

  if (trimmed.startsWith("# ")) {
    return (
      <h2 key={idx} className="text-2xl font-extrabold text-slate-900 dark:text-slate-50 mt-10 mb-4 tracking-tight">
        {parseInlineMarkdown(trimmed.replace("# ", ""))}
      </h2>
    )
  }

  if (trimmed.startsWith("## ")) {
    return (
      <h3
        key={idx}
        className="text-xl font-extrabold text-slate-900 dark:text-slate-50 border-b border-border/60 pb-2 mt-10 mb-4 tracking-tight"
      >
        {parseInlineMarkdown(trimmed.replace("## ", ""))}
      </h3>
    )
  }

  if (trimmed.startsWith("### ")) {
    return (
      <h4 key={idx} className="text-lg font-bold text-slate-900 dark:text-slate-50 mt-8 mb-4">
        {parseInlineMarkdown(trimmed.replace("### ", ""))}
      </h4>
    )
  }

  if (trimmed === "---") {
    return <hr key={idx} className="my-8 border-t border-border/80" />
  }

  if (trimmed.startsWith("```")) {
    const lines = trimmed.split("\n")
    let language = "Code"
    const firstLine = lines[0]
    if (firstLine.length > 3) {
      const lang = firstLine.slice(3).toLowerCase()
      if (lang === "bash" || lang === "sh") language = "Terminal / Bash"
      else if (lang === "tsx" || lang === "ts") language = "TypeScript (React)"
      else if (lang === "json") language = "JSON Configuration"
      else language = lang.toUpperCase()
    }
    const codeContent = lines.slice(1, -1).join("\n")
    return (
      <div
        key={idx}
        className="relative group rounded-xl overflow-hidden border border-border bg-slate-50 dark:bg-slate-950 font-mono text-[11px] sm:text-xs leading-relaxed my-6 shadow-elevation-2"
      >
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100/50 dark:bg-slate-900/40 border-b border-border">
          <span className="text-[10px] text-muted-foreground font-sans font-semibold uppercase tracking-wider">
            {language}
          </span>
          <button
            onClick={() => handleCopy(codeContent, `guide-code-${idx}`)}
            className="p-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            aria-label="Copy code"
          >
            {copiedText === `guide-code-${idx}` ? (
              <Check className="size-3.5 text-green-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-slate-800 dark:text-slate-300 max-h-[400px]">
          <code>{codeContent}</code>
        </pre>
      </div>
    )
  }

  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
    const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s+/, ""))
    return (
      <ul key={idx} className="list-disc list-outside space-y-2.5 pl-5 my-4 text-slate-700 dark:text-slate-300">
        {items.map((item, iIdx) => (
          <li key={iIdx} className="leading-relaxed">
            {parseInlineMarkdown(item)}
          </li>
        ))}
      </ul>
    )
  }

  if (/^\d+\.\s+/.test(trimmed)) {
    const items = trimmed.split("\n").map((line) => line.replace(/^\d+\.\s+/, ""))
    return (
      <ol key={idx} className="list-decimal list-outside space-y-2.5 pl-5 my-4 text-slate-700 dark:text-slate-300">
        {items.map((item, iIdx) => (
          <li key={iIdx} className="leading-relaxed">
            {parseInlineMarkdown(item)}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <p key={idx} className="leading-relaxed text-slate-700 dark:text-slate-300 my-4 font-light">
      {parseInlineMarkdown(trimmed)}
    </p>
  )
}
