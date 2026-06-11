import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary/90 dark:bg-primary/30",
				secondary:
					"border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
				destructive:
					"border-transparent bg-red-500 text-slate-50 dark:bg-red-900 dark:text-slate-50",
				outline: "text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.ComponentPropsWithoutRef<typeof View>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
	return (
		<View className={cn(badgeVariants({ variant }), className)} {...props}>
			{typeof children === 'string' ? (
				<Text
					className={cn(
						"text-xs font-semibold",
						variant === "default"
							? "text-white"
							: "text-slate-900 dark:text-slate-50",
					)}
				>
					{children}
				</Text>
			) : (
				children
			)}
		</View>
	);
}

export { Badge, badgeVariants };
