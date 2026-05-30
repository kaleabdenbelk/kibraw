import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";

const alertVariants = cva(
	"relative w-full rounded-lg border p-4 shadow-sm",
	{
		variants: {
			variant: {
				default: "bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800",
				destructive:
					"border-red-500/50 bg-red-50 dark:bg-red-950/20 dark:border-red-500",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const Alert = React.forwardRef<
	React.ElementRef<typeof View>,
	React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof alertVariants>
>(({ className, variant, children, ...props }, ref) => (
	<View
		ref={ref}
		role="alert"
		className={cn(alertVariants({ variant }), "flex-row gap-3", className)}
		{...props}
	>
		{children}
	</View>
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
	React.ElementRef<typeof Text>,
	React.ComponentPropsWithoutRef<typeof Text>
>(({ className, children, ...props }, ref) => (
	<Text
		ref={ref}
		className={cn(
			"font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-50",
			className,
		)}
		{...props}
	>
		{typeof children === 'string' ? (
			<Text>{children}</Text>
		) : (
			children
		)}
	</Text>
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
	React.ElementRef<typeof Text>,
	React.ComponentPropsWithoutRef<typeof Text>
>(({ className, children, ...props }, ref) => (
	<View className="flex-1">
		<Text
			ref={ref}
			className={cn(
				"text-sm text-slate-600 dark:text-slate-400 leading-relaxed",
				className,
			)}
			{...props}
		>
			{typeof children === 'string' ? (
				<Text>{children}</Text>
			) : (
				children
			)}
		</Text>
	</View>
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
