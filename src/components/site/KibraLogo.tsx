import { Link } from "react-router-dom"
import { APP_VERSION } from "@/lib/constants"

interface KibraLogoProps {
  variant?: "horizontal" | "vertical" | "icon"
  to?: string
  showVersion?: boolean
  className?: string
}

const LOGO_SRC = {
  horizontal: "/brand/kibra-logo-horizontal.svg",
  vertical: "/brand/kibra-logo-vertical.svg",
  icon: "/brand/kibra-logo-icon.svg",
} as const

const LOGO_HEIGHT = {
  horizontal: "h-8",
  vertical: "h-24 md:h-32",
  icon: "h-8 w-8",
} as const

export function KibraLogo({
  variant = "horizontal",
  to = "/",
  showVersion = false,
  className = "",
}: KibraLogoProps) {
  const content = (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={LOGO_SRC[variant]}
        alt="Kibra"
        className={`${LOGO_HEIGHT[variant]} w-auto object-contain`}
      />
      {showVersion && (
        <span className="text-[10px] bg-kibra-primary/10 dark:bg-kibra-primary-dark/20 text-kibra-primary-dark dark:text-kibra-primary px-1.5 py-0.5 rounded-full font-mono font-medium">
          {APP_VERSION}
        </span>
      )}
    </div>
  )

  if (variant === "vertical") {
    return content
  }

  return (
    <Link to={to} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
      {content}
    </Link>
  )
}
