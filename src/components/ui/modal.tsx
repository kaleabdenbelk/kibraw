import * as React from "react"
import { View, Text } from "react-native"
import { cn } from "@/lib/utils"

export interface ModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	className?: string;
}

export function Modal({
	visible,
	onClose,
	title,
	description,
	children,
	className,
}: ModalProps) {
	if (!visible) return null;

	return (
		<div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
			<div className={cn("bg-white dark:bg-slate-900 border border-border/80 rounded-xl p-5 shadow-xl max-w-sm w-full space-y-4", className)}>
				{(title || description) && (
					<div className="space-y-1">
						{title && <Text className="text-base font-bold text-slate-900 dark:text-slate-50">{title}</Text>}
						{description && <Text className="text-xs text-slate-500">{description}</Text>}
					</div>
				)}
				{children}
			</div>
		</div>
	);
}
