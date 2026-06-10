import { COMPONENT_DOCS, GUIDE_DOCS } from "@/data/docs"

export const GUIDE_SLUGS = Object.keys(GUIDE_DOCS)
export const COMPONENT_SLUGS = Object.keys(COMPONENT_DOCS)

export function isComponentSlug(slug: string): slug is keyof typeof COMPONENT_DOCS {
  return slug in COMPONENT_DOCS
}

export function isValidDocSlug(slug: string): boolean {
  return slug in GUIDE_DOCS || slug in COMPONENT_DOCS
}

const GUIDE_FLOW = [
  "getting-started",
  "commands",
  "architecture",
  "troubleshooting",
  "registry-guide",
  "hosting-guide",
] as const

export function getNextDocSlug(currentSlug: string): string {
  const guideIndex = GUIDE_FLOW.indexOf(currentSlug as (typeof GUIDE_FLOW)[number])
  if (guideIndex >= 0 && guideIndex < GUIDE_FLOW.length - 1) {
    return GUIDE_FLOW[guideIndex + 1]
  }
  if (currentSlug === "hosting-guide") {
    return "button"
  }
  return "getting-started"
}
