import React, { useEffect } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

function Skeleton({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof Animated.View>) {
	const opacity = useSharedValue(0.5);

	useEffect(() => {
		opacity.value = withRepeat(
			withSequence(
				withTiming(1, { duration: 1000 }),
				withTiming(0.5, { duration: 1000 }),
			),
			-1,
			true,
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<Animated.View
			style={[animatedStyle]}
			className={cn("rounded-md bg-slate-200 dark:bg-slate-800", className)}
			{...props}
		/>
	);
}

export { Skeleton };
