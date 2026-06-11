import * as React from "react";
import { TextInput } from "react-native";
import { cn } from "@/lib/utils";

export interface TextareaProps
	extends React.ComponentPropsWithoutRef<typeof TextInput> {}

const Textarea = React.forwardRef<
	React.ElementRef<typeof TextInput>,
	TextareaProps
>(({ className, ...props }, ref) => {
	return (
		<TextInput
			ref={ref}
			multiline
			numberOfLines={4}
			textAlignVertical="top"
			className={cn(
				"flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-400",
				className,
			)}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
