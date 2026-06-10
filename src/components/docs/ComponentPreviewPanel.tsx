import type { ComponentPreviewState } from "./useComponentPreviewState"
import { BasicComponentPreviews } from "./BasicComponentPreviews"
import { OverlayComponentPreviews } from "./OverlayComponentPreviews"

interface ComponentPreviewPanelProps {
  slug: string
  state: ComponentPreviewState
  copiedText: string | null
  onCopy: (text: string, id: string) => void
}

export function ComponentPreviewPanel(props: ComponentPreviewPanelProps) {
  return (
    <>
      <BasicComponentPreviews {...props} />
      <OverlayComponentPreviews {...props} />
    </>
  )
}
