import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { GuideDoc } from "@/data/docs"
import { getNextDocSlug } from "@/lib/navigation"
import { useCopy } from "@/lib/use-copy"
import { renderMarkdownBlock } from "./MarkdownRenderer"

interface GuideArticleProps {
  guide: GuideDoc
}

export function GuideArticle({ guide }: GuideArticleProps) {
  const { copiedText, handleCopy } = useCopy()
  const nextSlug = getNextDocSlug(guide.slug)

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {guide.title}
        </h1>
        <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
          {guide.description}
        </p>
      </div>

      <div className="prose-kibra max-w-none">
        {guide.content.split("\n\n").map((block, idx) =>
          renderMarkdownBlock(block, idx, copiedText, handleCopy)
        )}
      </div>

      <div className="border-t border-border mt-16 pt-8 flex items-center justify-between">
        <div />
        <Button variant="outline" size="lg" asChild className="gap-2 group rounded-xl px-6 h-12 shadow-sm hover:shadow-md transition-all">
          <Link to={`/docs/${nextSlug}`}>
            <span className="font-semibold tracking-tight">Next: {nextSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
