import * as React from "react"

export function useCopy() {
  const [copiedText, setCopiedText] = React.useState<string | null>(null)

  const handleCopy = React.useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedText(id)
    setTimeout(() => setCopiedText(null), 2000)
  }, [])

  return { copiedText, handleCopy }
}
