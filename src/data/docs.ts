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
  },
  "hosting-guide": {
    title: "Production & Hosting",
    description: "Learn how to host and deploy your dynamic registry API and documentation site.",
    slug: "hosting-guide",
    content: `# 🌐 Production & Hosting

Deploying your custom component registry and documentation site is incredibly simple thanks to our co-located architecture. Because your compiled registry files reside inside the \`public/registry/\` folder, hosting the documentation site on **Vercel**, **Netlify**, or **GitHub Pages** will automatically host your CLI-ready API endpoints as well!

---

### 🏛️ The Co-location Concept

By compiling your registry directly into the public directory of your Vite frontend, you create a dual-purpose static server:
- **Web App**: Accessible at \`https://kibra-two.vercel.app/\` (for documentation, previews, and guides).
- **Static API**: Accessible at \`https://kibra-two.vercel.app/registry/index.json\` (for the CLI).

This means you only need to manage **one single deployment** for both your docs and your CLI downloader!

---

### 🚀 Deploying to Vercel (Recommended)

Follow these steps to host your workspace on Vercel:

### 1. Push your code to GitHub
Make sure your documentation repository (\`kibra2\`) is pushed to a remote repository on GitHub, GitLab, or Bitbucket.

### 2. Connect to Vercel
1. Log in to [Vercel](https://vercel.com) and click **"Add New"** -> **"Project"**.
2. Import your repository.
3. Configure the build settings:
   - **Framework Preset**: \`Vite\`
   - **Root Directory**: \`.\` (or \`kibra2\` if part of a monorepo)
   - **Build Command**: \`pnpm run build\`
   - **Output Directory**: \`dist\`
4. Click **"Deploy"**.

Once deployed, Vercel will give you a domain like \`https://kibra-two.vercel.app/\`.

---

### 🔌 Connecting your CLI to your Registry

To make the \`kibra\` CLI fetch components from your newly hosted registry, you (and your users) can configure it in two ways:

### A. Run CLI with the direct --registry flag
Users can add components by pointing directly to your hosted registry URL:
\`\`\`bash
npx kibra add button --registry https://kibra-two.vercel.app/registry
\`\`\`

### B. Register a permanent custom alias
Users can add your registry permanently inside their local \`kibra.json\` configuration:
\`\`\`json
{
  "registries": {
    "mine": "https://kibra-two.vercel.app/registry"
  }
}
\`\`\`
Then they can install any component from you using the shorthand:
\`\`\`bash
npx kibra add mine/button
\`\`\`

---

### 📋 Registry Health Check
Once your deployment is complete, verify that your static API endpoints are working by visiting them in your browser:
- [ ] Index: \`https://kibra-two.vercel.app/registry/index.json\`
- [ ] Component: \`https://kibra-two.vercel.app/registry/button.json\`

If both URLs return raw JSON successfully, your custom registry is 100% active, global, and live!`
  }
}

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  "accordion": {
    title: "Accordion",
    description: "A vertically collapsing accordion list with smooth animated transitions.",
    slug: "accordion",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add accordion",
    usage: `import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function Demo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses Reanimated for smooth open/close animations.
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
`,
    props: [
          {
                "name": "type",
                "type": "\"single\" | \"multiple\"",
                "default": "undefined",
                "description": "Whether one or multiple items can be opened at the same time."
          },
          {
                "name": "collapsible",
                "type": "boolean",
                "default": "false",
                "description": "When type is 'single', allows closing the open item by pressing it again."
          },
          {
                "name": "value",
                "type": "string | string[]",
                "default": "undefined",
                "description": "The controlled open state of the accordion item(s)."
          },
          {
                "name": "onValueChange",
                "type": "(value: string | string[]) => void",
                "default": "undefined",
                "description": "Callback called when the open state of an accordion item changes."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names to apply to the accordion root."
          }
    ]
  },
  "alert-dialog": {
    title: "Alert Dialog",
    description: "A modal dialog that interrupts the user with important content and requires an acknowledgement.",
    slug: "alert-dialog",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add alert-dialog",
    usage: `import * as React from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AlertDialog } from "@/components/ui/alertdialog"
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button label="Delete Account" variant="danger" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
    code: `import * as AlertDialogPrimitive from "@rn-primitives/alert-dialog";
import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
		style={StyleSheet.absoluteFill}
		className={cn("z-50 bg-black/80", className)}
		{...props}
		ref={ref}
		asChild
	>
		<Animated.View entering={FadeIn} exiting={FadeOut} />
	</AlertDialogPrimitive.Overlay>
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
	<AlertDialogPortal>
		<AlertDialogOverlay />
		<AlertDialogPrimitive.Content
			ref={ref}
			className={cn(
				"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg sm:rounded-lg dark:bg-slate-950 dark:border-slate-800",
				className,
			)}
			{...props}
		/>
	</AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
	<View
		className={cn(
			"flex flex-col space-y-2 text-center sm:text-left",
			className,
		)}
		{...props}
	/>
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
	<View
		className={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			className,
		)}
		{...props}
	/>
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Title
		ref={ref}
		className={cn(
			"text-lg font-semibold text-slate-900 dark:text-slate-50",
			className,
		)}
		{...props}
	/>
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
		{...props}
	/>
));
AlertDialogDescription.displayName =
	AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Action
		ref={ref}
		className={cn(buttonVariants(), className)}
		{...props}
	/>
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Cancel
		ref={ref}
		className={cn(
			buttonVariants({ variant: "outline" }),
			"mt-2 sm:mt-0",
			className,
		)}
		{...props}
	/>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
`,
    props: [
          {
                "name": "open",
                "type": "boolean",
                "default": "undefined",
                "description": "The controlled open state of the dialog."
          },
          {
                "name": "onOpenChange",
                "type": "(open: boolean) => void",
                "default": "undefined",
                "description": "Callback called when the open state changes."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for AlertDialogContent."
          }
    ]
  },
  "alert": {
    title: "Alert",
    description: "Displays a beautiful alert banner or callout box for notifications and errors.",
    slug: "alert",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add alert",
    usage: `import * as React from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function Demo() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please sign in again.
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

export { Alert, AlertTitle, AlertDescription };
`,
    props: [
          {
                "name": "variant",
                "type": "\"default\" | \"destructive\"",
                "default": "\"default\"",
                "description": "The visual style of the alert."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          },
          {
                "name": "children",
                "type": "React.ReactNode",
                "default": "undefined",
                "description": "Content of the alert. Use AlertTitle and AlertDescription."
          }
    ]
  },
  "aspect-ratio": {
    title: "Aspect Ratio",
    description: "Displays content within a desired, fixed aspect ratio across platforms.",
    slug: "aspect-ratio",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add aspect-ratio",
    usage: `import * as React from "react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { AspectRatio } from "@/components/ui/aspectratio"

export default function Demo() {
  return (
    <AspectRatio ratio={16 / 9} style={{ width: '100%' }}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd' }}
        style={{ width: '100%', height: '100%', borderRadius: 8 }}
        resizeMode="cover"
      />
    </AspectRatio>
  )
}`,
    code: `import * as AspectRatioPrimitive from "@rn-primitives/aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
`,
    props: [
          {
                "name": "ratio",
                "type": "number",
                "default": "1",
                "description": "The desired aspect ratio (width / height). e.g. 16/9, 4/3, 1."
          },
          {
                "name": "style",
                "type": "ViewStyle",
                "default": "undefined",
                "description": "Additional styles to apply to the container."
          }
    ]
  },
  "avatar": {
    title: "Avatar",
    description: "An image element with a fallback for representing user profiles.",
    slug: "avatar",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add avatar",
    usage: `import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Demo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`,
    code: `import * as AvatarPrimitive from "@rn-primitives/avatar";
import { Image } from "expo-image";
import * as React from "react";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
			className,
		)}
		{...props}
	/>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		asChild
		className={cn("aspect-square h-full w-full", className)}
		source={props.source || { uri: props.src }}
		{...props}
	>
		<Image
			source={props.source || { uri: props.src } as any}
			contentFit="cover"
			transition={200}
			style={{ width: "100%", height: "100%" }}
		/>
	</AvatarPrimitive.Image>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, children, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800",
			className,
		)}
		{...props}
	>
		{typeof children === 'string' ? (
			<Text className="text-xs font-medium text-slate-900 dark:text-slate-50">
				{children}
			</Text>
		) : (
			children
		)}
	</AvatarPrimitive.Fallback>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
`,
    props: [
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the avatar root (controls size)."
          },
          {
                "name": "src",
                "type": "string",
                "default": "undefined",
                "description": "URL of the avatar image. Passed to AvatarImage."
          },
          {
                "name": "source",
                "type": "ImageSourcePropType",
                "default": "undefined",
                "description": "React Native image source object. Passed to AvatarImage."
          }
    ]
  },
  "badge": {
    title: "Badge",
    description: "Displays a small badge or label for tags, counts, or status indicators.",
    slug: "badge",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add badge",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Badge } from "@/components/ui/badge"

export default function Demo() {
  return (
    <View className="flex-row gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">Beta</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </View>
  )
}`,
    code: `import { cva, type VariantProps } from "class-variance-authority";
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
`,
    props: [
          {
                "name": "variant",
                "type": "\"default\" | \"secondary\" | \"destructive\" | \"outline\"",
                "default": "\"default\"",
                "description": "The visual style of the badge."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          },
          {
                "name": "children",
                "type": "React.ReactNode",
                "default": "undefined",
                "description": "The label text or content inside the badge."
          }
    ]
  },
  "button.stories": {
    title: "Button.stories",
    description: "Displays a beautiful Button.stories component.",
    slug: "button.stories",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add button.stories",
    usage: `import * as React from "react"
import { Button.stories } from "@/components/ui/button.stories"

export default function Demo() {
  return (
    
  )
}`,
    code: `import React from "react";
import { View } from "react-native";
import { Button } from "./button";

export default {
	title: "Components/Button",
	component: Button,
};

export const Default = () => (
	<View style={{ padding: 20 }}>
		<Button label="Default Button" />
	</View>
);

export const Secondary = () => (
	<View style={{ padding: 20 }}>
		<Button variant="secondary" label="Secondary Button" />
	</View>
);
`,
    props: []
  },
  "button": {
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    slug: "button",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add button",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <View className="flex-col gap-3">
      <Button label="Default" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Outline" variant="outline" />
      <Button label="Danger" variant="danger" />
      <Button label="Loading…" loading />
    </View>
  )
}`,
    code: `import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

const buttonVariants = cva(
	"flex-row items-center justify-center rounded-md px-4 py-2 active:opacity-80",
	{
		variants: {
			variant: {
				default: "bg-primary",
				secondary: "bg-slate-100 dark:bg-slate-800",
				outline: "border border-slate-200 bg-transparent dark:border-slate-700",
				ghost: "bg-transparent",
				danger: "bg-red-500",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ButtonProps
	extends React.ComponentPropsWithoutRef<typeof Pressable>,
		VariantProps<typeof buttonVariants> {
	label?: string;
	labelClasses?: string;
	loading?: boolean;
	className?: string;
	children?: React.ReactNode;
}

function Button({
	className,
	variant,
	size,
	label,
	labelClasses,
	loading,
	children,
	...props
}: ButtonProps) {
	return (
		<Pressable
			className={cn(buttonVariants({ variant, size, className }))}
			accessibilityRole="button"
			accessibilityState={{
				disabled: !!props.disabled || !!loading,
				busy: !!loading,
			}}
			accessibilityLabel={props.accessibilityLabel || label}
			{...props}
		>
			{loading ? (
				<ActivityIndicator
					color={variant === "default" ? "white" : "black"}
					accessibilityLabel="Loading"
				/>
			) : (
				<>
					{label && (
						<Text
							className={cn(
								"text-sm font-medium",
								variant === "default"
									? "text-white"
									: "text-black dark:text-white",
								labelClasses,
							)}
						>
							{label}
						</Text>
					)}
					{typeof children === 'string' ? (
						<Text
							className={cn(
								"text-sm font-medium",
								variant === "default"
									? "text-white"
									: "text-black dark:text-white",
								labelClasses,
							)}
						>
							{children}
						</Text>
					) : (
						children
					)}
				</>
			)}
		</Pressable>
	);
}

export { Button, buttonVariants };
`,
    props: [
          {
                "name": "variant",
                "type": "\"default\" | \"secondary\" | \"outline\" | \"ghost\" | \"danger\"",
                "default": "\"default\"",
                "description": "The visual style of the button."
          },
          {
                "name": "size",
                "type": "\"default\" | \"sm\" | \"lg\" | \"icon\"",
                "default": "\"default\"",
                "description": "The size of the button."
          },
          {
                "name": "label",
                "type": "string",
                "default": "undefined",
                "description": "Text label to display inside the button."
          },
          {
                "name": "labelClasses",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the label Text component."
          },
          {
                "name": "loading",
                "type": "boolean",
                "default": "false",
                "description": "When true, displays an ActivityIndicator and disables interaction."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the Pressable root."
          },
          {
                "name": "children",
                "type": "React.ReactNode",
                "default": "undefined",
                "description": "Custom children rendered inside the button instead of the label."
          },
          {
                "name": "disabled",
                "type": "boolean",
                "default": "false",
                "description": "Disables the button when true."
          },
          {
                "name": "onPress",
                "type": "() => void",
                "default": "undefined",
                "description": "Callback invoked when the button is pressed."
          }
    ]
  },
  "card": {
    title: "Card",
    description: "Displays a card with header, content, and footer sections.",
    slug: "card",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add card",
    usage: `import * as React from "react"
import { Text } from "react-native"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text className="text-sm text-slate-600 dark:text-slate-400">
          Your trial period ends in 7 days.
        </Text>
      </CardContent>
      <CardFooter>
        <Button label="View all" variant="outline" />
      </CardFooter>
    </Card>
  )
}`,
    code: `import { cn } from "@/lib/utils";
import type React from "react";
import { Text, View } from "react-native";

function Card({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) {
	return (
		<View
			className={cn(
				"rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) {
	return (
		<View
			className={cn("flex flex-col space-y-1.5 pb-4", className)}
			accessibilityRole="header"
			{...props}
		/>
	);
}

function CardTitle({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
	return (
		<Text
			className={cn(
				"text-xl font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-50",
				className,
			)}
			accessibilityRole="header"
			{...props}
		/>
	);
}

function CardDescription({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
	return (
		<Text
			className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
			{...props}
		/>
	);
}

function CardContent({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) {
	return <View className={cn("pt-0", className)} {...props} />;
}

function CardFooter({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) {
	return (
		<View
			className={cn("flex flex-row items-center pt-4", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
};
`,
    props: [
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the card container."
          },
          {
                "name": "children",
                "type": "React.ReactNode",
                "default": "undefined",
                "description": "Card content. Use CardHeader, CardContent, and CardFooter."
          }
    ]
  },
  "checkbox": {
    title: "Checkbox",
    description: "A control that allows the user to toggle between checked and unchecked states.",
    slug: "checkbox",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add checkbox",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Demo() {
  const [checked, setChecked] = React.useState(false);
  
  return (
    <View className="flex-row items-center gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Label>Accept terms and conditions</Label>
    </View>
  );
}`,
    code: `import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import { Check } from "lucide-react-native";
import * as React from "react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			"peer h-5 w-5 shrink-0 rounded-sm border border-primary shadow-sm items-center justify-center",
			props.checked ? "bg-primary" : "bg-transparent",
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn("items-center justify-center")}
		>
			<Check
				size={14}
				strokeWidth={3}
				className="text-white"
			/>
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
`,
    props: [
          {
                "name": "checked",
                "type": "boolean",
                "default": "undefined",
                "description": "The controlled checked state of the checkbox."
          },
          {
                "name": "onCheckedChange",
                "type": "(checked: boolean) => void",
                "default": "undefined",
                "description": "Callback called when the checked state changes."
          },
          {
                "name": "disabled",
                "type": "boolean",
                "default": "false",
                "description": "Disables the checkbox when true."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          }
    ]
  },
  "dialog": {
    title: "Dialog",
    description: "A modal window overlaying the primary window, forcing user interaction.",
    slug: "dialog",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add dialog",
    usage: `import * as React from "react"
import { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button label="Edit Profile" variant="outline" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <Input label="Name" placeholder="Pedro Duarte" />
        <Input label="Username" placeholder="@peduarte" />
        <DialogFooter>
          <Button label="Save changes" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
    code: `import * as DialogPrimitive from "@rn-primitives/dialog";
import { X } from "lucide-react-native";
import * as React from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"absolute inset-0 z-50 bg-black/80",
			className,
		)}
		{...props}
	>
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={StyleSheet.absoluteFill}
			className="bg-black/80"
		/>
	</DialogPrimitive.Overlay>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<DialogPortal>
		<DialogOverlay />
		<DialogPrimitive.Content
			ref={ref}
			className={cn(
				"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 dark:border-slate-800 dark:bg-slate-950 sm:rounded-lg",
				className,
			)}
			{...props}
		>
			{children}
			<DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none dark:ring-offset-slate-950 dark:focus:ring-slate-300">
				<X size={16} className="text-slate-500" />
			</DialogPrimitive.Close>
		</DialogPrimitive.Content>
	</DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
	<View
		className={cn(
			"flex flex-col space-y-1.5 text-center sm:text-left",
			className,
		)}
		{...props}
	/>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) => (
	<View
		className={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			className,
		)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, children, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight text-slate-950 dark:text-slate-50",
			className,
		)}
		{...props}
	>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </DialogPrimitive.Title>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, children, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
		{...props}
	>
    {typeof children === 'string' ? <Text>{children}</Text> : children}
  </DialogPrimitive.Description>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogClose,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
`,
    props: [
          {
                "name": "open",
                "type": "boolean",
                "default": "undefined",
                "description": "The controlled open state of the dialog."
          },
          {
                "name": "onOpenChange",
                "type": "(open: boolean) => void",
                "default": "undefined",
                "description": "Callback called when the open state changes."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for DialogContent."
          }
    ]
  },
  "drawer": {
    title: "Drawer",
    description: "A drawer component that slides out from the bottom or side of the screen.",
    slug: "drawer",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add drawer",
    usage: `import * as React from "react"
import { View, Text } from "react-native"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button label="Open Drawer" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>
            Set your daily activity goal.
          </DrawerDescription>
        </DrawerHeader>
        <View className="py-4">
          <Text className="text-center text-4xl font-bold">350</Text>
        </View>
        <DrawerFooter>
          <Button label="Submit" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`,
    code: `import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	SlideInDown,
	SlideOutDown,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

// A simple universal Drawer implementation using Reanimated
// In the future, this can be swapped with a more complex primitive if needed

const DrawerContext = React.createContext<{
	open: boolean;
	setOpen: (open: boolean) => void;
}>({
	open: false,
	setOpen: () => {},
});

const Drawer = ({
	children,
	open: controlledOpen,
	onOpenChange,
}: {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) => {
	const [internalOpen, setInternalOpen] = React.useState(false);
	const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
	const setOpen = onOpenChange || setInternalOpen;

	return (
		<DrawerContext.Provider value={{ open, setOpen }}>
			{children}
		</DrawerContext.Provider>
	);
};

const DrawerTrigger = ({
	asChild,
	children,
	...props
}: {
	asChild?: boolean;
	children: React.ReactNode;
}) => {
	const { setOpen } = React.useContext(DrawerContext);

	if (asChild && React.isValidElement(children)) {
		return React.cloneElement(children as React.ReactElement<any>, {
			onPress: () => setOpen(true),
			...props,
		});
	}

	return (
		<View {...props} onTouchEnd={() => setOpen(true)}>
			{children}
		</View>
	);
};

const DrawerContent = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const { open, setOpen } = React.useContext(DrawerContext);

	if (!open) return null;

	return (
		<View style={StyleSheet.absoluteFill} className="z-50">
			<Animated.View
				entering={FadeIn}
				exiting={FadeOut}
				className="absolute inset-0 bg-black/40"
				onTouchEnd={() => setOpen(false)}
			/>
			<Animated.View
				entering={SlideInDown}
				exiting={SlideOutDown}
				className={cn(
					"absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 p-6 rounded-t-3xl min-h-[300px]",
					className,
				)}
			>
				<View className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-6" />
				{children}
			</Animated.View>
		</View>
	);
};

const DrawerHeader = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => (
	<View className={cn("mb-4 space-y-2", className)}>
		{typeof children === 'string' ? <Text>{children}</Text> : children}
	</View>
);

const DrawerTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => (
	<Text
		className={cn(
			"text-xl font-semibold text-slate-900 dark:text-slate-50",
			className,
		)}
	>
		{typeof children === 'string' ? <Text>{children}</Text> : children}
	</Text>
);

const DrawerDescription = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => (
	<Text className={cn("text-sm text-slate-500 dark:text-slate-400", className)}>
		{typeof children === 'string' ? <Text>{children}</Text> : children}
	</Text>
);

const DrawerFooter = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => <View className={cn("mt-auto pt-4 space-y-2", className)}>{children}</View>;

export {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerFooter,
};
`,
    props: [
          {
                "name": "open",
                "type": "boolean",
                "default": "undefined",
                "description": "The controlled open state of the drawer."
          },
          {
                "name": "onOpenChange",
                "type": "(open: boolean) => void",
                "default": "undefined",
                "description": "Callback called when the open state changes."
          },
          {
                "name": "children",
                "type": "React.ReactNode",
                "default": "undefined",
                "description": "Use DrawerTrigger and DrawerContent as direct children."
          }
    ]
  },
  "dropdown-menu": {
    title: "Dropdown Menu",
    description: "Displays a list of actions or options to the user, triggered by a button.",
    slug: "dropdown-menu",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add dropdown-menu",
    usage: `import * as React from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenu } from "@/components/ui/dropdownmenu"

export default function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button label="Open" variant="outline" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <DropdownMenuPrimitive.Text>Profile</DropdownMenuPrimitive.Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuPrimitive.Text>Billing</DropdownMenuPrimitive.Text>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuPrimitive.Text>Settings</DropdownMenuPrimitive.Text>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DropdownMenuPrimitive.Text>Sign out</DropdownMenuPrimitive.Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
    code: `import * as DropdownMenuPrimitive from "@rn-primitives/dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react-native";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={ref}
		className={cn(
			"flex-row items-center gap-2 rounded-sm px-2 py-1.5",
			inset && "pl-8",
			className,
		)}
		{...props}
	>
		<DropdownMenuPrimitive.Text className="text-sm text-slate-900 dark:text-slate-50">
			{children as string}
		</DropdownMenuPrimitive.Text>
		<ChevronRight size={14} className="ml-auto text-slate-500" />
	</DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
	DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.SubContent
		ref={ref}
		className={cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-lg dark:bg-slate-950 dark:border-slate-800",
			className,
		)}
		{...props}
		asChild
	>
		<Animated.View entering={FadeIn} exiting={FadeOut}>
			{props.children}
		</Animated.View>
	</DropdownMenuPrimitive.SubContent>
));
DropdownMenuSubContent.displayName =
	DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-md dark:bg-slate-950 dark:border-slate-800",
				className,
			)}
			{...props}
			asChild
		>
			<Animated.View entering={FadeIn} exiting={FadeOut}>
				{props.children}
			</Animated.View>
		</DropdownMenuPrimitive.Content>
	</DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Item
		ref={ref}
		className={cn(
			"relative flex-row items-center gap-2 rounded-sm px-2 py-1.5 active:bg-slate-100 dark:active:bg-slate-800",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			"relative flex-row items-center rounded-sm py-1.5 pl-8 pr-2 active:bg-slate-100 dark:active:bg-slate-800",
			className,
		)}
		checked={checked}
		{...props}
	>
		<View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Check size={14} className="text-slate-900 dark:text-slate-50" />
			</DropdownMenuPrimitive.ItemIndicator>
		</View>
		<DropdownMenuPrimitive.Text className="text-sm text-slate-900 dark:text-slate-50">
			{children as string}
		</DropdownMenuPrimitive.Text>
	</DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
	DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<DropdownMenuPrimitive.RadioItem
		ref={ref}
		className={cn(
			"relative flex-row items-center rounded-sm py-1.5 pl-8 pr-2 active:bg-slate-100 dark:active:bg-slate-800",
			className,
		)}
		{...props}
	>
		<View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle size={8} className="fill-slate-900 text-slate-900 dark:fill-slate-50 dark:text-slate-50" />
			</DropdownMenuPrimitive.ItemIndicator>
		</View>
		<DropdownMenuPrimitive.Text className="text-sm text-slate-900 dark:text-slate-50">
			{children as string}
		</DropdownMenuPrimitive.Text>
	</DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label
		ref={ref}
		className={cn(
			"px-2 py-1.5 text-sm font-semibold text-slate-900 dark:text-slate-50",
			inset && "pl-8",
			className,
		)}
		{...props}
	/>
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<DropdownMenuPrimitive.Separator
		ref={ref}
		className={cn("-mx-1 my-1 h-px bg-slate-200 dark:bg-slate-800", className)}
		{...props}
	/>
));
DropdownMenuSeparator.displayName =
	DropdownMenuPrimitive.Separator.displayName;

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
};
`,
    props: [
          {
                "name": "open",
                "type": "boolean",
                "default": "undefined",
                "description": "The controlled open state of the dropdown menu."
          },
          {
                "name": "onOpenChange",
                "type": "(open: boolean) => void",
                "default": "undefined",
                "description": "Callback called when the open state changes."
          },
          {
                "name": "sideOffset",
                "type": "number",
                "default": "4",
                "description": "The distance in pixels from the trigger. Prop of DropdownMenuContent."
          },
          {
                "name": "inset",
                "type": "boolean",
                "default": "false",
                "description": "When true, adds extra left padding. Available on DropdownMenuItem."
          }
    ]
  },
  "input": {
    title: "Input",
    description: "A standard text input field for form entry and user interaction.",
    slug: "input",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add input",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Input } from "@/components/ui/input"

export default function Demo() {
  const [value, setValue] = React.useState('');
  
  return (
    <View className="gap-4">
      <Input
        label="Email"
        placeholder="you@example.com"
        keyboardType="email-address"
        value={value}
        onChangeText={setValue}
      />
      <Input
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        error="Password is too short"
      />
    </View>
  );
}`,
    code: `import { cn } from "@/lib/utils";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
	label?: string;
	error?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
	({ className, label, error, ...props }, ref) => {
		return (
			<View className="w-full space-y-2">
				{label && (
					<Text className="text-sm font-medium text-slate-900 dark:text-slate-50">
						{label}
					</Text>
				)}
				<TextInput
					ref={ref}
					className={cn(
						"flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus:border-primary dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-400",
						error && "border-red-500",
						className,
					)}
					accessibilityLabel={props.accessibilityLabel || label}
					accessibilityHint={props.accessibilityHint || error}
					{...props}
				/>
				{error && <Text className="text-xs text-red-500">{error}</Text>}
			</View>
		);
	},
);
Input.displayName = "Input";

export { Input };
`,
    props: [
          {
                "name": "label",
                "type": "string",
                "default": "undefined",
                "description": "Label text displayed above the input field."
          },
          {
                "name": "error",
                "type": "string",
                "default": "undefined",
                "description": "Error message displayed below the input with red styling."
          },
          {
                "name": "placeholder",
                "type": "string",
                "default": "undefined",
                "description": "Placeholder text shown when the input is empty."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the TextInput."
          },
          {
                "name": "value",
                "type": "string",
                "default": "undefined",
                "description": "The controlled value of the input."
          },
          {
                "name": "onChangeText",
                "type": "(text: string) => void",
                "default": "undefined",
                "description": "Callback called when the text changes."
          },
          {
                "name": "secureTextEntry",
                "type": "boolean",
                "default": "false",
                "description": "Masks input for password fields."
          }
    ]
  },
  "label": {
    title: "Label",
    description: "An accessible label component associated with input controls.",
    slug: "label",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add label",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Demo() {
  return (
    <View className="gap-2">
      <Label>Email address</Label>
      <Input placeholder="you@example.com" />
    </View>
  )
}`,
    code: `import * as LabelPrimitive from "@rn-primitives/label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const labelVariants = cva(
	"text-sm font-medium leading-none text-slate-900 dark:text-slate-50 web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70",
);

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Text>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text> &
		VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
	<LabelPrimitive.Root>
		<LabelPrimitive.Text
			ref={ref}
			className={cn(labelVariants(), className)}
			{...props}
		/>
	</LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Text.displayName;

export { Label };
`,
    props: [
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          },
          {
                "name": "children",
                "type": "React.ReactNode",
                "default": "undefined",
                "description": "The label text content."
          }
    ]
  },
  "modal": {
    title: "Modal",
    description: "A flexible overlay dialog component for focusing user attention.",
    slug: "modal",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add modal",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

export default function Demo() {
  const [visible, setVisible] = React.useState(false);
  
  return (
    <>
      <Button label="Open Modal" onPress={() => setVisible(true)} />
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Confirm action"
        description="Are you sure you want to continue? This cannot be undone."
      >
        <View className="flex-row gap-3 mt-4">
          <Button
            label="Cancel"
            variant="outline"
            className="flex-1"
            onPress={() => setVisible(false)}
          />
          <Button label="Confirm" className="flex-1" onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </>
  );
}`,
    code: `import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import {
	BackHandler,
	Modal as RNModal,
	Pressable,
	Text,
	View,
} from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	SlideInBottom,
	SlideOutBottom,
} from "react-native-reanimated";

interface ModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	className?: string;
}

/**
 * Elite Modal component for Kibra.
 * Includes: 
 * - Smooth Reanimated transitions
 * - A11y roles and focus management via RN Modal
 * - Backdrop click-to-close
 * - Hardware back button handling
 */
export function Modal({
	visible,
	onClose,
	title,
	description,
	children,
	className,
}: ModalProps) {
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				if (visible) {
					onClose();
					return true;
				}
				return false;
			},
		);

		return () => backHandler.remove();
	}, [visible, onClose]);

	return (
		<RNModal
			transparent
			visible={visible}
			onRequestClose={onClose}
			animationType="none" // We use Reanimated for custom transitions
		>
			<View className="flex-1 justify-end sm:justify-center">
				{/* Backdrop */}
				<Animated.View
					entering={FadeIn}
					exiting={FadeOut}
					className="absolute inset-0 bg-black/50"
				>
					<Pressable className="flex-1" onPress={onClose} accessibilityLabel="Close modal" />
				</Animated.View>

				{/* Modal Content */}
				<Animated.View
					entering={SlideInBottom}
					exiting={SlideOutBottom}
					className={cn(
						"bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl p-6 shadow-xl",
						className,
					)}
					accessibilityRole="alert"
					aria-modal="true"
				>
					<View className="flex-col space-y-2 mb-4">
						{title && (
							<Text className="text-xl font-bold text-slate-900 dark:text-slate-50" accessibilityRole="header">
								{title}
							</Text>
						)}
						{description && (
							<Text className="text-sm text-slate-500 dark:text-slate-400">
								{description}
							</Text>
						)}
					</View>

					<View>{children}</View>
				</Animated.View>
			</View>
		</RNModal>
	);
}
`,
    props: [
          {
                "name": "visible",
                "type": "boolean",
                "default": "undefined",
                "description": "Controls whether the modal is shown."
          },
          {
                "name": "onClose",
                "type": "() => void",
                "default": "undefined",
                "description": "Callback called when the user dismisses the modal (backdrop press or hardware back)."
          },
          {
                "name": "title",
                "type": "string",
                "default": "undefined",
                "description": "Bold title text displayed at the top of the modal."
          },
          {
                "name": "description",
                "type": "string",
                "default": "undefined",
                "description": "Subtitle / description text shown below the title."
          },
          {
                "name": "children",
                "type": "React.ReactNode",
                "default": "undefined",
                "description": "Custom content rendered inside the modal body."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the modal sheet container."
          }
    ]
  },
  "popover": {
    title: "Popover",
    description: "Displays rich content in a portal, triggered by an anchor element.",
    slug: "popover",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add popover",
    usage: `import * as React from "react"
import { Text } from "react-native"
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button label="Open Popover" variant="outline" />
      </PopoverTrigger>
      <PopoverContent>
        <Text className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          Dimensions
        </Text>
        <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Set the dimensions for the layer.
        </Text>
      </PopoverContent>
    </Popover>
  )
}`,
    code: `import * as PopoverPrimitive from "@rn-primitives/popover";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			ref={ref}
			align={align}
			sideOffset={sideOffset}
			className={cn(
				"z-50 w-72 rounded-md border bg-white p-4 shadow-md outline-none dark:bg-slate-950 dark:border-slate-800",
				className,
			)}
			{...props}
			asChild
		>
			<Animated.View entering={FadeIn} exiting={FadeOut}>
				{props.children}
			</Animated.View>
		</PopoverPrimitive.Content>
	</PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
`,
    props: [
          {
                "name": "open",
                "type": "boolean",
                "default": "undefined",
                "description": "The controlled open state of the popover."
          },
          {
                "name": "onOpenChange",
                "type": "(open: boolean) => void",
                "default": "undefined",
                "description": "Callback called when the open state changes."
          },
          {
                "name": "align",
                "type": "\"start\" | \"center\" | \"end\"",
                "default": "\"center\"",
                "description": "Alignment of the popover content relative to the trigger. Prop of PopoverContent."
          },
          {
                "name": "sideOffset",
                "type": "number",
                "default": "4",
                "description": "Distance in pixels from the trigger. Prop of PopoverContent."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for PopoverContent."
          }
    ]
  },
  "progress": {
    title: "Progress",
    description: "Displays an indicator showing the completion progress of a task.",
    slug: "progress",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add progress",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function Demo() {
  const [value, setValue] = React.useState(33);
  
  return (
    <View className="gap-4">
      <Progress value={value} />
      <Button
        label="Increment"
        variant="outline"
        onPress={() => setValue(v => Math.min(100, v + 10))}
      />
    </View>
  );
}`,
    code: `import * as ProgressPrimitive from "@rn-primitives/progress";
import * as React from "react";
import Animated, {
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
	return (
		<ProgressPrimitive.Root
			ref={ref}
			className={cn(
				"relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
				className,
			)}
			{...props}
		>
			<Indicator value={value} />
		</ProgressPrimitive.Root>
	);
});
Progress.displayName = ProgressPrimitive.Root.displayName;

function Indicator({ value }: { value: number | null | undefined }) {
	const animatedStyle = useAnimatedStyle(() => {
		return {
			width: withSpring(\`\${value ?? 0}%\`, { overshootClamping: true }),
		};
	});

	return (
		<ProgressPrimitive.Indicator asChild>
			<Animated.View
				style={animatedStyle}
				className="h-full bg-primary"
			/>
		</ProgressPrimitive.Indicator>
	);
}

export { Progress };
`,
    props: [
          {
                "name": "value",
                "type": "number | null | undefined",
                "default": "undefined",
                "description": "The current progress value between 0 and 100."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the track container."
          }
    ]
  },
  "radio-group": {
    title: "Radio Group",
    description: "A set of checkable buttons where only one button can be checked at a time.",
    slug: "radio-group",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add radio-group",
    usage: `import * as React from "react"
import { View } from "react-native"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { RadioGroup } from "@/components/ui/radiogroup"

export default function Demo() {
  const [value, setValue] = React.useState('comfortable');
  
  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="default" />
        <Label>Default</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="comfortable" />
        <Label>Comfortable</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="compact" />
        <Label>Compact</Label>
      </View>
    </RadioGroup>
  );
}`,
    code: `import * as RadioGroupPrimitive from "@rn-primitives/radio-group";
import { Circle } from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Root
			className={cn("grid gap-2", className)}
			{...props}
			ref={ref}
		/>
	);
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				"aspect-square h-5 w-5 rounded-full border border-primary items-center justify-center shadow-sm",
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="items-center justify-center">
				<Circle
					size={10}
					className="fill-primary text-primary"
				/>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
`,
    props: [
          {
                "name": "value",
                "type": "string",
                "default": "undefined",
                "description": "The controlled value of the selected radio item."
          },
          {
                "name": "onValueChange",
                "type": "(value: string) => void",
                "default": "undefined",
                "description": "Callback called when the selected value changes."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the group container."
          }
    ]
  },
  "separator": {
    title: "Separator",
    description: "A visual divider line to separate content sections or list items.",
    slug: "separator",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add separator",
    usage: `import * as React from "react"
import { View, Text } from "react-native"
import { Separator } from "@/components/ui/separator"

export default function Demo() {
  return (
    <View className="gap-4">
      <Text className="text-sm font-medium">Kibra UI</Text>
      <Separator />
      <View className="flex-row h-5 items-center gap-4">
        <Text className="text-sm">Blog</Text>
        <Separator orientation="vertical" />
        <Text className="text-sm">Docs</Text>
        <Separator orientation="vertical" />
        <Text className="text-sm">Source</Text>
      </View>
    </View>
  )
}`,
    code: `import * as SeparatorPrimitive from "@rn-primitives/separator";
import * as React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{ className, orientation = "horizontal", decorative = true, ...props },
		ref,
	) => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"shrink-0 bg-slate-200 dark:bg-slate-800",
				orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
				className,
			)}
			{...props}
		/>
	),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
`,
    props: [
          {
                "name": "orientation",
                "type": "\"horizontal\" | \"vertical\"",
                "default": "\"horizontal\"",
                "description": "The axis the separator should extend along."
          },
          {
                "name": "decorative",
                "type": "boolean",
                "default": "true",
                "description": "When true, indicates the element is purely visual and hidden from accessibility tree."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          }
    ]
  },
  "skeleton": {
    title: "Skeleton",
    description: "Displays a placeholder preview layout while content is loading.",
    slug: "skeleton",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add skeleton",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Skeleton } from "@/components/ui/skeleton"

export default function Demo() {
  return (
    <View className="flex-row items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <View className="gap-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </View>
    </View>
  )
}`,
    code: `import React, { useEffect } from "react";
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
`,
    props: [
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "NativeWind classes that set the skeleton's size (height and width) and shape."
          }
    ]
  },
  "slider": {
    title: "Slider",
    description: "An input element that allows users to select a value from a range of values.",
    slug: "slider",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add slider",
    usage: `import * as React from "react"
import { View, Text } from "react-native"
import { Slider } from "@/components/ui/slider"

export default function Demo() {
  const [value, setValue] = React.useState([50]);
  
  return (
    <View className="gap-4">
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={100}
        step={1}
        onValueChange={setValue}
      />
      <Text className="text-center text-sm text-slate-500">
        Volume: {value[0]}%
      </Text>
    </View>
  );
}`,
    code: `import * as SliderPrimitive from "@rn-primitives/slider";
import * as React from "react";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
	const value = props.value ?? [0];

	return (
		<SliderPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex-row w-full touch-none select-none items-center",
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
				<SliderPrimitive.Range className="absolute h-full bg-primary" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border border-slate-200 bg-white shadow active:scale-110 dark:border-slate-800 dark:bg-slate-950" />
		</SliderPrimitive.Root>
	);
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
`,
    props: [
          {
                "name": "value",
                "type": "number[]",
                "default": "[0]",
                "description": "The controlled value of the slider as an array."
          },
          {
                "name": "minimumValue",
                "type": "number",
                "default": "0",
                "description": "The minimum allowed value."
          },
          {
                "name": "maximumValue",
                "type": "number",
                "default": "100",
                "description": "The maximum allowed value."
          },
          {
                "name": "step",
                "type": "number",
                "default": "1",
                "description": "The step increment between values."
          },
          {
                "name": "onValueChange",
                "type": "(values: number[]) => void",
                "default": "undefined",
                "description": "Callback called when the slider value changes."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          }
    ]
  },
  "switch": {
    title: "Switch",
    description: "A toggle switch control that allows users to turn a setting on or off.",
    slug: "switch",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add switch",
    usage: `import * as React from "react"
import { View } from "react-native"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Demo() {
  const [enabled, setEnabled] = React.useState(false);
  
  return (
    <View className="flex-row items-center justify-between">
      <Label>Airplane Mode</Label>
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
      />
    </View>
  );
}`,
    code: `import * as SwitchPrimitives from "@rn-primitives/switch";
import * as React from "react";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={cn(
			"peer h-6 w-11 shrink-0 cursor-pointer flex-row items-center rounded-full border-2 border-transparent",
			props.checked ? "bg-primary" : "bg-slate-200 dark:bg-slate-800",
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={cn(
				"pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md transition-transform",
				props.checked ? "translate-x-5" : "translate-x-0",
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
`,
    props: [
          {
                "name": "checked",
                "type": "boolean",
                "default": "undefined",
                "description": "The controlled checked (on) state of the switch."
          },
          {
                "name": "onCheckedChange",
                "type": "(checked: boolean) => void",
                "default": "undefined",
                "description": "Callback called when the checked state changes."
          },
          {
                "name": "disabled",
                "type": "boolean",
                "default": "false",
                "description": "Disables the switch when true."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          }
    ]
  },
  "tabs": {
    title: "Tabs",
    description: "A set of tabbed content sections where only one tab is visible at a time.",
    slug: "tabs",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add tabs",
    usage: `import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function Demo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Input label="Name" placeholder="Pedro Duarte" />
      </TabsContent>
      <TabsContent value="password">
        <Input label="Current password" secureTextEntry />
      </TabsContent>
    </Tabs>
  )
}`,
    code: `import * as TabsPrimitive from "@rn-primitives/tabs";
import * as React from "react";
import { Text, View } from "react-native";
import { cn } from "@/lib/utils";

const Tabs = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Root>,
	Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "value" | "onValueChange"> & {
		defaultValue?: string;
		value?: string;
		onValueChange?: (value: string) => void;
	}
>(({ defaultValue, value: controlledValue, onValueChange: controlledOnValueChange, ...props }, ref) => {
	const [internalValue, setInternalValue] = React.useState(defaultValue || "");
	const value = controlledValue !== undefined ? controlledValue : internalValue;
	const onValueChange = (val: string) => {
		setInternalValue(val);
		controlledOnValueChange?.(val);
	};

	return (
		<TabsPrimitive.Root
			ref={ref}
			value={value}
			onValueChange={onValueChange}
			{...props}
		/>
	);
});
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(
			"flex-row h-11 items-center justify-center rounded-lg bg-slate-100 p-1 dark:bg-slate-800",
			className,
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
	const { value } = TabsPrimitive.useRootContext() as any;
	const isActive = value === props.value;

	return (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex-1 flex-row items-center justify-center rounded-md px-3 py-1.5",
				isActive
					? "bg-white shadow-sm dark:bg-slate-950"
					: "bg-transparent",
				className,
			)}
			{...props}
		>
			{typeof children === 'string' ? (
				<Text
					className={cn(
						"text-sm font-medium",
						isActive
							? "text-slate-900 dark:text-slate-50"
							: "text-slate-500 dark:text-slate-400",
					)}
				>
					{children}
				</Text>
			) : (
				children as React.ReactNode
			)}
		</TabsPrimitive.Trigger>
	);
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn("mt-2", className)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
`,
    props: [
          {
                "name": "defaultValue",
                "type": "string",
                "default": "undefined",
                "description": "The value of the tab that is selected by default (uncontrolled)."
          },
          {
                "name": "value",
                "type": "string",
                "default": "undefined",
                "description": "The controlled value of the selected tab."
          },
          {
                "name": "onValueChange",
                "type": "(value: string) => void",
                "default": "undefined",
                "description": "Callback called when the selected tab changes."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for the root."
          }
    ]
  },
  "textarea": {
    title: "Textarea",
    description: "A multi-line text input field for longer form entries.",
    slug: "textarea",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add textarea",
    usage: `import * as React from "react"
import { Text } from "react-native"
import { Textarea } from "@/components/ui/textarea"

export default function Demo() {
  return (
    <Textarea
      placeholder="Type your message here."
      numberOfLines={4}
    />
  )
}`,
    code: `import * as React from "react";
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
`,
    props: [
          {
                "name": "placeholder",
                "type": "string",
                "default": "undefined",
                "description": "Placeholder text shown when the textarea is empty."
          },
          {
                "name": "numberOfLines",
                "type": "number",
                "default": "4",
                "description": "Number of lines to display."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          },
          {
                "name": "value",
                "type": "string",
                "default": "undefined",
                "description": "The controlled text value."
          },
          {
                "name": "onChangeText",
                "type": "(text: string) => void",
                "default": "undefined",
                "description": "Callback called when the text changes."
          }
    ]
  },
  "toggle": {
    title: "Toggle",
    description: "A two-state button that can be toggled on or off.",
    slug: "toggle",
    badges: ["Universal","Accessible","Customizable"],
    installation: "npx kibra add toggle",
    usage: `import * as React from "react"
import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react-native"

export default function Demo() {
  const [bold, setBold] = React.useState(false);
  
  return (
    <Toggle
      variant="outline"
      pressed={bold}
      onPressedChange={setBold}
    >
      <Bold size={16} className="text-slate-900 dark:text-slate-50" />
    </Toggle>
  );
}`,
    code: `import * as TogglePrimitive from "@rn-primitives/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"flex-row items-center justify-center rounded-md text-sm font-medium active:opacity-80 pb-0.5",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-slate-200 bg-transparent shadow-sm dark:border-slate-800",
			},
			size: {
				default: "h-10 px-3",
				sm: "h-9 px-2.5",
				lg: "h-11 px-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => {
	const isActive = props.pressed;

	return (
		<TogglePrimitive.Root
			ref={ref}
			className={cn(
				toggleVariants({ variant, size, className }),
				isActive
					? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50"
					: "text-slate-500 dark:text-slate-400",
			)}
			{...props}
		/>
	);
});

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
`,
    props: [
          {
                "name": "variant",
                "type": "\"default\" | \"outline\"",
                "default": "\"default\"",
                "description": "The visual style of the toggle."
          },
          {
                "name": "size",
                "type": "\"default\" | \"sm\" | \"lg\"",
                "default": "\"default\"",
                "description": "The size of the toggle."
          },
          {
                "name": "pressed",
                "type": "boolean",
                "default": "undefined",
                "description": "The controlled pressed state of the toggle."
          },
          {
                "name": "onPressedChange",
                "type": "(pressed: boolean) => void",
                "default": "undefined",
                "description": "Callback called when the pressed state changes."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names."
          }
    ]
  },
  "tooltip": {
    title: "Tooltip",
    description: "A brief informative message that appears when hovering or pressing an element.",
    slug: "tooltip",
    badges: ["Universal","Accessible","Customizable","Animated"],
    installation: "npx kibra add tooltip",
    usage: `import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function Demo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button label="Hover me" variant="outline" />
        </TooltipTrigger>
        <TooltipContent>
          Add to library
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
    code: `import * as TooltipPrimitive from "@rn-primitives/tooltip";
import * as React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<TooltipPrimitive.Portal>
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"z-50 overflow-hidden rounded-md bg-slate-900 px-3 py-1.5 shadow-md dark:bg-slate-50",
				className,
			)}
			{...props}
			asChild
		>
			<Animated.View entering={FadeIn} exiting={FadeOut}>
				<TooltipPrimitive.Text
					className={cn(
						"text-xs font-medium text-slate-50 dark:text-slate-900",
					)}
				>
					{props.children as string}
				</TooltipPrimitive.Text>
			</Animated.View>
		</TooltipPrimitive.Content>
	</TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
`,
    props: [
          {
                "name": "sideOffset",
                "type": "number",
                "default": "4",
                "description": "Distance in pixels between the trigger and the tooltip content. Prop of TooltipContent."
          },
          {
                "name": "className",
                "type": "string",
                "default": "undefined",
                "description": "Additional NativeWind class names for TooltipContent."
          },
          {
                "name": "delayDuration",
                "type": "number",
                "default": "700",
                "description": "Duration in ms from when the mouse enters the trigger until the tooltip opens."
          }
    ]
  },
};
