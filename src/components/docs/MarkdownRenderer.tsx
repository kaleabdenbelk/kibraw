import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Check, Copy, Info, AlertTriangle, Lightbulb, Terminal as TerminalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "./CodeBlock"

interface MarkdownRendererProps {
  content: string
  copiedText: string | null
  onCopy: (text: string, id: string) => void
}

export function MarkdownRenderer({ content, copiedText, onCopy }: MarkdownRendererProps) {
  return (
    <div className="prose-kibra max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h2 className="mt-12 mb-6 scroll-m-20 border-b border-border pb-3 text-3xl font-extrabold tracking-tight">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="mt-10 mb-4 scroll-m-20 border-b border-border pb-2 text-2xl font-bold tracking-tight first:mt-0">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mt-8 mb-4 scroll-m-20 text-xl font-semibold tracking-tight">
              {children}
            </h4>
          ),
          
          // Paragraphs & Lists
          p: ({ children }) => <p className="leading-relaxed [&&]:my-6 opacity-90 first:mt-0">{children}</p>,
          ul: ({ children }) => <ul className="my-6 ml-6 list-disc space-y-3 marker:text-muted-foreground/60">{children}</ul>,
          ol: ({ children }) => <ol className="my-6 ml-6 list-decimal space-y-3 marker:text-muted-foreground/60">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed opacity-90">{children}</li>,
          
          // Inline Elements
          strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
          // Remove the default pre wrapper so our custom CodeBlock can handle its own container
          pre: ({ children }: any) => <>{children}</>,
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
              return (
                <div className="my-8">
                  <CodeBlock
                    label={match[1] === "bash" || match[1] === "sh" ? "terminal" : match[1]}
                    language={match[1]}
                    code={String(children).replace(/\n$/, "")}
                    copyId={`code-${Math.random().toString(36).substr(2, 9)}`}
                    copiedText={copiedText}
                    onCopy={onCopy}
                  />
                </div>
              );
            }
            return (
              <code
                className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85rem] font-medium text-foreground border border-border/40"
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
            >
              {children}
            </a>
          ),
          
          // Blockquotes (Callouts)
          blockquote: ({ children }) => {
            // Find the text content inside the blockquote
            let textContent = "";
            React.Children.forEach(children, (child: any) => {
              if (child?.props?.children) {
                if (typeof child.props.children === "string") {
                  textContent += child.props.children;
                } else if (Array.isArray(child.props.children)) {
                  child.props.children.forEach((c: any) => {
                    if (typeof c === "string") textContent += c;
                    else if (c?.props?.children && typeof c.props.children === "string") textContent += c.props.children;
                  });
                }
              }
            });

            let type = "info";
            let Icon = Info;
            let title = "";

            if (textContent.includes("Note:") || textContent.includes("NOTE:")) {
              type = "note";
              title = "Note";
            } else if (textContent.includes("Warning:") || textContent.includes("WARNING:")) {
              type = "warning";
              Icon = AlertTriangle;
              title = "Warning";
            } else if (textContent.includes("Tip:") || textContent.includes("TIP:") || textContent.includes("💡")) {
              type = "tip";
              Icon = Lightbulb;
              title = "Tip";
            }

            return (
              <div
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
                  <div className="text-[15px] leading-relaxed opacity-90 flex-1">
                    {children}
                  </div>
                </div>
              </div>
            );
          },
          
          // Hr
          hr: () => <hr className="my-8 border-border/60" />,
          
          // Tables
          table: ({ children }) => (
            <div className="my-8 w-full overflow-y-auto rounded-xl border border-border shadow-sm">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="border-b border-border bg-muted/50">{children}</thead>,
          th: ({ children, style }) => (
            <th 
              className="h-11 px-4 text-left align-middle text-xs font-bold text-muted-foreground uppercase tracking-wider"
              style={style}
            >
              {children}
            </th>
          ),
          tr: ({ children }) => <tr className="border-b border-border transition-colors hover:bg-muted/30 last:border-0">{children}</tr>,
          td: ({ children, style }) => (
            <td className="p-4 align-middle font-normal text-sm" style={style}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
