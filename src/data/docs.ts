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
  "getting-started": {
    title: "Getting Started",
    description: "Learn how to set up and build your first Expo app with Kibra.",
    slug: "getting-started",
    content: `# 👋 Getting Started with Kibra

Welcome! We're so excited to help you build your next Expo masterpiece. Kibra is designed to be the fastest, most reliable way to ship high-quality UI in React Native.

## 🚀 Quick Start (60 Seconds)

If you have an existing Expo project, run:

\`\`\`bash
npx kibra init
npx kibra add button
\`\`\`

If you're starting from scratch:

\`\`\`bash
npx kibra create my-new-app
\`\`\`

---

## 🛠️ Requirements

Before you begin, ensure you have the following installed:
- **Node.js 20+**
- **Expo SDK 50+**
- **NativeWind v4** (Kibra handles this automatically in \`create\` mode!)

---

## 📖 Step-by-Step Tutorial

### 1. Initialize your project
Kibra needs a \`kibra.json\` file to know where to place your components and how to map your aliases.

\`\`\`bash
npx kibra init
\`\`\`
This will create a default configuration:
- \`components\`: mapped to \`@/components/ui\`
- \`utils\`: mapped to \`@/lib/utils\`

### 2. Browse the Showroom
Visit the [Kibra Showroom](https://user.github.io/kibra) to see all available components.

### 3. Add your first component
Let's add a Button:

\`\`\`bash
npx kibra add button
\`\`\`
**What happens behind the scenes?**
1. Kibra fetches the component metadata from our registry.
2. It detects required NPM dependencies (like \`class-variance-authority\`).
3. It installs them using your preferred package manager.
4. It writes the component file to your project, automatically updating imports to match your project's aliases.

### 4. Start building
Import your new component and start building your UI:

\`\`\`tsx
import { Button } from "@/components/ui/button";

export default function HomeScreen() {
  return (
    <Button label="Hello Kibra!" onPress={() => console.log("Pressed!")} />
  );
}
\`\`\`

---

## 💡 Pro Tips
- **Dry Run**: Curious what \`add\` will do? Use \`npx kibra add button --dry-run\`.
- **Minimal Mode**: Use \`npx kibra create --template minimal\` for a bare-bones setup.`
  },
  commands: {
    title: "Command Reference",
    description: "Master the Kibra CLI with this comprehensive guide to every command and flag.",
    slug: "commands",
    content: `# 🛠️ Command Reference

Master the Kibra CLI with this comprehensive guide to every command, flag, and option.

---

## \`kibra create <name>\`
The primary entry point for new projects.

| Flag | Alpha | Description |
| :--- | :---: | :--- |
| \`-t, --template\` | \`minimal\` \\| \`full\` | Choose a project starter template. |
| \`-c, --clean\` | Boolean | Skip pre-installing baseline components (\`button\`, \`utils\`). |
| \`-n, --no-icons\` | Boolean | Skip icon library installation entirely. |

**Example:**
\`\`\`bash
npx kibra create awesome-app --template full --clean
\`\`\`

---

## \`kibra add <component>\`
Adds a component from the registry to your local project.

| Flag | Type | Description |
| :--- | :---: | :--- |
| \`-r, --registry\` | URL \\| Path | Use a custom registry URL or local folder. |
| \`-d, --dry-run\` | Boolean | Preview file changes and dependency installs without writing. |

**Component Aliases:**
You can target specific registries using the \`alias/name\` syntax:
\`\`\`bash
npx kibra add my-custom-reg/special-card
\`\`\`

---

## \`kibra init\`
Generates a \`kibra.json\` configuration file in your current directory. Use this to retrofit Kibra into an existing Expo project.

---

## \`kibra list\`
Fetches and displays all available components in the registry.

| Flag | Type | Description |
| :--- | :---: | :--- |
| \`-r, --registry\` | URL \\| Path | List components from a specific registry. |

---

## \`kibra setup-nativewind\`
An interactive guide to setting up NativeWind v4, Tailwind CSS, and your preferred icon library in any Expo project. Use this if you already have a project but want the Kibra styling engine.

---

## \`kibra build\`
*(Developer Only)* Used to build the JSON registry metadata from a directory of source files.

| Flag | Type | Description |
| :--- | :---: | :--- |
| \`-i, --input\` | Path | Directory containing component source files. |
| \`-o, --output\` | Path | Directory to output the JSON artifacts. |

---

## Global Options
- \`-V, --version\`: Output the current version of Kibra.
- \`-h, --help\`: Display help for any command.`
  },
  architecture: {
    title: "Architecture & Philosophy",
    description: "Why we built Kibra and how it handles your code with transactional safety.",
    slug: "architecture",
    content: `# 🧠 Architecture & Philosophy

Why did we build Kibra? And more importantly, how does it handle your code with such precision?

## The "Blueprint" Philosophy
Unlike traditional component libraries that ship compiled code in \`node_modules\`, Kibra ships **Blueprints**. 

When you run \`add\`, you are not installing a package; you are "forking" a source file into your own codebase. This gives you 100% control over the styling, props, and behavior of your UI.

---

## Technical Core

### 1. AST-Powered Dependency Detection
Kibra doesn't use fragile Regex to find dependencies. We use the **TypeScript Compiler API** to parse your source code into an Abstract Syntax Tree (AST). 
- We detect every \`import\` statement.
- We distinguish between "External" (NPM) and "Registry" (Local) dependencies.
- We auto-generate the \`registry.json\` metadata so you don't have to maintain it manually.

### 2. Template Interpolation Engine
When a component is "teleported" from our registry to your project, it goes through our interpolation engine:
- **Alias Mapping**: If your project uses \`@ui/\` instead of \`@/components/ui\`, Kibra detects this and rewrites the imports on the fly.
- **Token Replacement**: We use \`{{UTILS_ALIAS}}\` and \`{{COMPONENTS_ALIAS}}\` tokens in our source files to ensure perfect fitment regardless of your folder structure.

### 3. Atomic Writes with Transactional Safety
To avoid corrupting your project during a crash, Kibra uses an **Atomic Write Pattern**:
1. Files are written to a \`.kibra-tmp-*\` file first.
2. Only after a successful write is the file renamed to its final target.
3. If an error occurs, the temporary files are automatically cleaned up.

---

## Data Flow

\`\`\`
+------------------+     +------------------+     +------------------------+
|  Registry Source | --> | Registry Builder | --> | dist-registry JSON     |
+------------------+     +------------------+     +------------------------+
                                                              |
                                                              v
+------------------+                              +------------------------+
| User kibra.json  | ---------------------------> |       Kibra CLI        |
+------------------+                              +------------------------+
                                                              |
                                           +------------------+------------------+
                                           |                                     |
                                           v                                     v
                               +-----------------------+             +-----------------------+
                               | User Project Files    |             | NPM Install (Deps)    |
                               +-----------------------+             +-----------------------+
\`\`\`

### Registry Integrity
Every push to the Kibra main branch triggers a CI workflow that rebuilds the entire JSON registry, ensuring that the components you see in the Showroom are always perfectly synced with the code in the repo.

---

## Design Choices
- **Zero-Dependency Runtime**: Once a component is in your project, it has no connection back to Kibra. You own the code.
- **A11y First**: Every component in the Kibra registry must pass an accessibility audit before being merged.
- **NativeWind Optimized**: Our engine is specifically tuned for Tailwind CSS in React Native.`
  },
  troubleshooting: {
    title: "Troubleshooting",
    description: "Common configuration, styling, and dependency snags and how to fix them.",
    slug: "troubleshooting",
    content: `# 🩹 Troubleshooting

Running into a snag? Don't worry, we've got you covered. Here are the most common issues and how to fix them.

---

## 🏗️ Configuration Issues

### "kibra.json not found"
**Symptoms:** Commands like \`add\` or \`list\` fail with a configuration error.
**Fix:** Run \`npx kibra init\` in your project root to create your configuration file.

### Alias Conflicts
**Symptoms:** Imports in added components look like \`@/lib/utils\` but your project uses a different path.
**Fix:** Update your \`kibra.json\` with the correct aliases:
\`\`\`json
{
  "aliases": {
    "utils": "src/lib/utils",
    "components": "src/components/ui"
  }
}
\`\`\`

---

## 💅 Styling Issues

### Tailwind styles aren't applying
**Symptoms:** Components appear without styling or with basic defaults.
**Fix:** 
1. Ensure \`nativewind\` and \`tailwindcss\` are installed.
2. Check your \`tailwind.config.js\` to ensure Kibra's component paths are included in the \`content\` array:
\`\`\`javascript
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  // ...
};
\`\`\`

---

## 📦 Dependency Issues

### "Module not found" after installation
**Symptoms:** You ran \`kibra add\`, but the app crashes saying a module (e.g. \`react-native-reanimated\`) is missing.
**Fix:** Sometimes package managers need a kick. Try:
- **npm**: \`npm install\`
- **pnpm**: \`pnpm install\`
- **expo**: \`npx expo install --fix\`

---

## 🛠️ CLI Crashes

### Permission Denied
**Symptoms:** CLI fails to write files to your project.
**Fix:** Ensure you have write permissions to the directory. Avoid running with \`sudo\` as it can corrupt your \`node_modules\` permissions.

### Update Notice won't go away
**Symptoms:** CLI keeps telling you to update even after you have.
**Fix:** Kibra caches update checks for 24 hours. You can force a fresh check by clearing your global npm cache, or simply wait for the cache to expire.

---

## 🆘 Still Need Help?
- **GitHub Issues**: Report bugs or request features at [github.com/user/kibra/issues](https://github.com/user/kibra/issues).`
  },
  "registry-guide": {
    title: "Custom Registries",
    description: "Learn how to build, package, and host your own custom Kibra registries.",
    slug: "registry-guide",
    content: `# 🚀 Custom Registries Guide

Let's build a component registry from scratch.

### 1. Structure your components
Create a folder named \`my-ui\` and add a button:
\`\`\`bash
mkdir -p my-ui/ui
# Create a component in my-ui/ui/my-btn.tsx
\`\`\`

### 2. Run the Kibra Builder
You don't need to install a separate tool. The builder is part of the \`kibra\` CLI:

\`\`\`bash
npx kibra build --input ./my-ui --output ./dist-registry
\`\`\`

**Check the result:**
Look inside \`./dist-registry/my-btn.json\`. You'll see that Kibra has automatically:
- Detected all your \`import\` statements.
- Listed your NPM dependencies.
- Packaged your source code into a JSON string.

### 3. Go Live
Upload that \`./dist-registry\` folder to **GitHub Pages**, **Vercel**, or even a **shared Dropbox folder**. 

**Your users can now do this:**
\`\`\`bash
npx kibra add my-btn --registry https://your-hosted-url.com
\`\`\`

---

## 🏗️ How it Works (The Protocol)
Kibra uses a standardized folder structure to detect component types:

\`\`\`
/my-collection
  /ui       # Standard UI components (Button, Card, etc.)
  /lib      # Shared logic and utilities
  /hooks    # Custom React hooks
\`\`\`

### Important: Use Alias Tokens
To ensure your components work in *any* user project, use our **Alias Tokens** in your source code:

- \`{{UTILS_ALIAS}}\`: Resolves to the user's local utilities path.
- \`{{COMPONENTS_ALIAS}}\`: Resolves to the user's local components path.

**Example:**
\`\`\`tsx
import { cn } from "{{UTILS_ALIAS}}";
import { Button } from "{{COMPONENTS_ALIAS}}/button";
\`\`\`

---

## 2. Generating the Registry
Once your components are ready, use the Kibra CLI to build the metadata. 

**Example Build Command:**
\`\`\`bash
npx kibra build --input ./my-collection --output ./public-registry
\`\`\`

**What this does:**
- Scans all files recursively.
- Uses **AST Analysis** to detect NPM dependencies automatically.
- Generates an \`index.json\` and individual \`[component].json\` files.

---

## 3. Hosting & Distribution
Upload the contents of your \`./public-registry\` folder to any static host. 

### How users install from you:
Provide your registry URL to your users. They can install your components in two ways:

#### A. Direct Flag
\`\`\`bash
npx kibra add button --registry https://ui.your-brand.com
\`\`\`

#### B. Permanent Configuration
Users can add your registry to their \`kibra.json\`:
\`\`\`json
{
  "registries": {
    "mine": "https://ui.your-brand.com"
  }
}
\`\`\`
Then they can use your alias: \`npx kibra add mine/button\`.

---

## 📋 Registry Checklist
- [ ] **NativeWind Ready**: Components use \`cn\` and Tailwind classes.
- [ ] **A11y Compliant**: Includes \`accessibilityRole\` and \`accessibilityLabel\`.
- [ ] **Tokenized Imports**: All internal imports use \`{{UTILS_ALIAS}}\` or \`{{COMPONENTS_ALIAS}}\`.
- [ ] **Standalone**: Components don't rely on hidden global providers.`
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
