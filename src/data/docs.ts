export interface ComponentProp {
  name: string
  type: string
  default: string
  description: string
}

export interface ComponentDoc {
  title: string
  description: string
  slug: string
  badges?: string[]
  installation: string
  usage: string
  code: string
  props: ComponentProp[]
}

export interface GuideDoc {
  title: string
  description: string
  slug: string
  content: string
}

export const GUIDE_DOCS: Record<string, GuideDoc> = {
  introduction: {
    title: "Introduction",
    description: "Re-imagining components with universal React Native primitives.",
    slug: "introduction",
    content: `### Universal Primitives for Web & Native

Welcome to **Kibra UI**, a component library crafted with high-fidelity React Native primitives optimized for both the web and native mobile platforms (iOS and Android). 

Instead of traditional web-only div-based architectures, Kibra UI uses native-aliased primitives like \`View\`, \`Text\`, and \`Animated\` blocks. Through **react-native-web** and **react-native-reanimated**, you can run, test, and visually preview native-ready components inside Vite with 60 FPS fluid transitions.

### Why Kibra UI?

1. **Universal Codebase**: Write once, deploy anywhere. The exact same components can be copied into an Expo React Native mobile project or a Vite React web application.
2. **Beautiful Design**: Styled following premium minimal design guidelines, featuring elegant borders, spacious layout, and fluid dark-mode integration.
3. **Smooth Reanimated Transitions**: Real high-performance physics-based native animations out-of-the-box (no clunky CSS animations).
4. **Accessible by Default**: Powered by industry-standard accessibility patterns adapted for universal rendering.`
  },
  installation: {
    title: "Installation",
    description: "How to set up and configure your project for Kibra UI.",
    slug: "installation",
    content: `### Step 1: Install Peer Dependencies

Kibra UI requires universal rendering libraries to bridge the gap between React Native and the Web. Run the following command in your terminal:

\`\`\`bash
pnpm add @rn-primitives/accordion react-native-web react-native-reanimated class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
\`\`\`

### Step 2: Configure Path Shims

To ensure seamless importing across environments, make sure your \`tsconfig.json\` and bundler are aliased to resolve React Native shims for the Web.

Add the following to your \`tsconfig.app.json\` under \`compilerOptions.paths\`:

\`\`\`json
{
  "compilerOptions": {
    "paths": {
      "react-native": ["./src/shims/react-native-shim.tsx"],
      "react-native-reanimated": ["./src/shims/react-native-reanimated-shim.tsx"],
      "@rn-primitives/accordion": ["./src/shims/rn-primitives-accordion-shim.tsx"],
      "lucide-react-native": ["./node_modules/lucide-react"],
      "@/*": ["./src/*"]
    }
  }
}
\`\`\`

### Step 3: Add Tailwind CSS Setup

Kibra UI components are styled using Tailwind. In Tailwind v4, styles are imported directly in your main CSS file:

\`\`\`css
/* src/index.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
\`\`\``
  },
  cli: {
    title: "Command Line Interface",
    description: "Initialize, configure, and add components to your workspace instantly.",
    slug: "cli",
    content: `### The Kibra CLI

The Kibra CLI simplifies the process of scaffold-building by dynamically copying universal component files straight into your local codebase.

### Initialization

Initialize Kibra in your project directory:

\`\`\`bash
npx kibra init
\`\`\`

This command creates a configuration file and verifies your Tailwind CSS / path aliases are correctly established.

### Adding Components

Add components individually using the \`add\` command:

\`\`\`bash
npx kibra add button
npx kibra add accordion
npx kibra add alert
\`\`\`

This will automatically write the components into your local \`src/components/ui/\` folder, ready to be customized.`
  }
}

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  button: {
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    slug: "button",
    badges: ["Universal", "Accessible", "Customizable"],
    installation: "npx kibra add button",
    usage: `import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <Button variant="default" size="default" onClick={() => console.log("Clicked")}>
      Click me
    </Button>
  )
}`,
    code: `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }`,
    props: [
      {
        name: "variant",
        type: '"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"',
        default: '"default"',
        description: "The visual style variant of the button."
      },
      {
        name: "size",
        type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
        default: '"default"',
        description: "The height and padding scale of the button."
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description: "Whether to merge properties into the immediate child element."
      }
    ]
  },
  accordion: {
    title: "Accordion",
    description: "A vertically collapsing accordion list with smooth animated transitions.",
    slug: "accordion",
    badges: ["Universal", "Animated", "Reanimated 3.x"],
    installation: "npx kibra add accordion",
    usage: `import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion-native"

export default function Demo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes! It uses react-native-reanimated transitions for smooth expansion.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
    code: `import * as AccordionPrimitive from "@rn-primitives/accordion";
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
>((({ className, children, ...props }, ref) => {
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

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };`,
    props: [
      {
        name: "type",
        type: '"single" | "multiple"',
        default: '"single"',
        description: "Controls whether single or multiple accordion panels can expand at once."
      },
      {
        name: "collapsible",
        type: "boolean",
        default: "false",
        description: "When type is 'single', controls whether an expanded panel can collapse on click."
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        default: "undefined",
        description: "The item value(s) of the panel(s) expanded by default."
      }
    ]
  },
  alert: {
    title: "Alert",
    description: "Displays a beautiful alert banner or callout box for notifications and errors.",
    slug: "alert",
    badges: ["Universal", "Accessible", "Lightweight"],
    installation: "npx kibra add alert",
    usage: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert-native"

export default function Demo() {
  return (
    <Alert variant="default">
      <AlertDescription>
        <AlertTitle>Heads up!</AlertTitle>
        You can build responsive universal web & mobile apps with Kibra.
      </AlertDescription>
    </Alert>
  )
}`,
    code: `import { cva, type VariantProps } from "class-variance-authority";
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

export { Alert, AlertTitle, AlertDescription };`,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "The visual style and color coding of the alert callout."
      }
    ]
  }
}
