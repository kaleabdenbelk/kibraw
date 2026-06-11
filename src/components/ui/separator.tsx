import * as React from "react"
import { View } from "react-native"
import { cn } from "@/lib/utils"

export const Separator = React.forwardRef<any, any>(
	(
		{ className, orientation = "horizontal", ...props },
		ref,
	) => (
		<View
			ref={ref}
			className={cn(
				"shrink-0 bg-slate-200 dark:bg-slate-800",
				orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
				className,
			)}
			{...props}
		/>
	),
);
Separator.displayName = "Separator";
