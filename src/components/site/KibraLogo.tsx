import { Link } from "react-router-dom"
import { APP_VERSION } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface KibraLogoProps {
  variant?: "horizontal" | "vertical" | "icon"
  to?: string
  showVersion?: boolean
  className?: string
}

export function KibraLogo({
  variant = "horizontal",
  to = "/",
  showVersion = false,
  className = "",
}: KibraLogoProps) {
  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "flex items-center",
        variant === "vertical" ? "flex-col text-center" : "flex-row"
      )}>
        {/* SVG Icon + Wordmark */}
        <svg 
          viewBox={variant === "icon" ? "0 0 200 200" : "0 0 800 200"}
          className={cn(
            variant === "icon" ? "h-8 w-8" : "h-8 w-auto",
            variant === "vertical" && "h-20 mb-2"
          )}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Icon Part */}
          <g transform={variant === "icon" ? "scale(0.3125)" : "translate(20, 20) scale(0.3125)"} opacity="0.95">
            <path d="M 160 100 Q 220 256 160 412" stroke="#00d8ff" strokeWidth="72" strokeLinecap="round" />
            <path d="M 370 110 C 270 110, 240 200, 166 280" stroke="#00d8ff" strokeWidth="72" strokeLinecap="round" />
            <path d="M 370 402 C 270 402, 240 312, 166 232" stroke="#00d8ff" strokeWidth="72" strokeLinecap="round" />
          </g>

          {/* Text Part (Hidden if variant is 'icon') */}
          {variant !== "icon" && (
            <g className="fill-foreground transition-colors duration-300">
              <text 
                x="210" 
                y="112" 
                className="text-[72px] font-bold tracking-[-0.02em]"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Kibra
              </text>
              <text 
                x="214" 
                y="148" 
                className="text-[18px] font-medium opacity-60 tracking-[0.15em] uppercase"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Cross-Platform UI System
              </text>
            </g>
          )}
        </svg>

        {showVersion && (
          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-mono font-medium ml-2">
            {APP_VERSION}
          </span>
        )}
      </div>
    </div>
  )

  if (variant === "vertical") return content

  return (
    <Link to={to} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
      {content}
    </Link>
  )
}
