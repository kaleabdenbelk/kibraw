import * as React from "react"
import { Text } from "react-native"
import { cn } from "@/lib/utils"

export const Label = React.forwardRef<any, any>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm font-medium leading-none text-slate-900 dark:text-slate-50", className)}
    {...props}
  />
))
Label.displayName = "Label"
