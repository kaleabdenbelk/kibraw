import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  React.useEffect(() => {
    document.title = "Page Not Found | Kibra UI"
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-h1 text-slate-900 dark:text-slate-50">404</h1>
      <p className="text-body-lg text-muted-foreground mt-2 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-3 mt-8">
        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/docs/getting-started">View docs</Link>
        </Button>
      </div>
    </div>
  )
}
