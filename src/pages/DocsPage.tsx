import * as React from "react"
import { Navigate, useParams } from "react-router-dom"
import { COMPONENT_DOCS, GUIDE_DOCS } from "@/data/docs"
import { isComponentSlug, isValidDocSlug } from "@/lib/navigation"
import { GuideArticle } from "@/components/docs/GuideArticle"

const ComponentShowcase = React.lazy(() =>
  import("@/components/docs/ComponentShowcase").then((m) => ({ default: m.ComponentShowcase }))
)

export function DocsPage() {
  const { slug = "getting-started" } = useParams<{ slug: string }>()

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    if (isComponentSlug(slug)) {
      document.title = `${COMPONENT_DOCS[slug].title} | Kibra UI`
    } else if (GUIDE_DOCS[slug]) {
      document.title = `${GUIDE_DOCS[slug].title} | Kibra UI`
    }
  }, [slug])

  if (!isValidDocSlug(slug)) {
    return <Navigate to="/docs/getting-started" replace />
  }

  if (isComponentSlug(slug)) {
    return (
      <article className="max-w-4xl text-[15px] leading-7 text-foreground/90">
        <React.Suspense
          fallback={
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3" />
              <div className="h-64 bg-muted rounded-xl" />
            </div>
          }
        >
          <ComponentShowcase component={COMPONENT_DOCS[slug]} />
        </React.Suspense>
      </article>
    )
  }

  const guide = GUIDE_DOCS[slug]
  if (!guide) {
    return <Navigate to="/docs/getting-started" replace />
  }

  return (
    <article className="max-w-3xl text-[15px] leading-7 text-foreground/90">
      <GuideArticle guide={guide} />
    </article>
  )
}

