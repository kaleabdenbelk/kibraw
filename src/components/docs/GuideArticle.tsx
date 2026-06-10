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
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 text-slate-900 dark:text-slate-50">{guide.title}</h1>
        <p className="text-body-lg text-muted-foreground mt-2 font-light">{guide.description}</p>
      </div>

      <div className="border-t border-border mt-6 pt-6 prose-kibra max-w-none space-y-2">
        {guide.content.split("\n\n").map((block, idx) =>
          renderMarkdownBlock(block, idx, copiedText, handleCopy)
        )}
      </div>

      <div className="border-t border-border mt-10 pt-8 flex justify-end">
        <Button variant="outline" asChild className="gap-2 group">
          <Link to={`/docs/${nextSlug}`}>
            <span>Next step</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
