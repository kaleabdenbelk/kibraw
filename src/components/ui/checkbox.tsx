import { Check } from "lucide-react";
import * as React from "react";
import { Pressable } from "react-native";
import { cn } from "@/lib/utils";

export const Checkbox = React.forwardRef<any, any>(({ className, checked, onCheckedChange, ...props }, ref) => (
	<Pressable
		ref={ref}
		onPress={() => onCheckedChange?.(!checked)}
		className={cn(
			"peer h-5 w-5 shrink-0 rounded border border-kibra-primary shadow-sm items-center justify-center cursor-pointer transition-colors flex",
			checked ? "bg-kibra-primary" : "bg-transparent",
			className,
		)}
		{...props}
	>
		{checked && (
			<Check
				size={14}
				strokeWidth={3}
				className="text-white"
			/>
		)}
	</Pressable>
));
Checkbox.displayName = "Checkbox";
