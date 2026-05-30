import * as AccordionPrimitive from "@rn-primitives/accordion";
import { ChevronDown } from "lucide-react-native";
import * as React from "react";
import { Text, View } from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn("border-b border-slate-200 dark:border-slate-800", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
	const { isExpanded } = AccordionPrimitive.useItemContext();

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: withTiming(isExpanded ? "180deg" : "0deg") }],
		};
	});

	return (
		<AccordionPrimitive.Header className="flex w-full">
			<AccordionPrimitive.Trigger
				ref={ref}
				className={cn(
					"w-full flex-row items-center justify-between py-4",
					className,
				)}
				{...props}
			>
				{typeof children === 'string' ? (
					<Text className="text-sm font-medium text-slate-900 dark:text-slate-50">
						{children}
					</Text>
				) : (
					children as React.ReactNode
				)}
				<Animated.View style={animatedStyle}>
					<ChevronDown
						size={16}
						className="text-slate-500 dark:text-slate-400"
					/>
				</Animated.View>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden"
		{...props}
	>
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			layout={LinearTransition}
			className={cn("pb-4 pt-0", className)}
		>
			{typeof children === 'string' ? (
				<Text className="text-sm text-slate-600 dark:text-slate-400">
					{children}
				</Text>
			) : (
				children as React.ReactNode
			)}
		</Animated.View>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
