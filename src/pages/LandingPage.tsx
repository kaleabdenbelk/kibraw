import { ArrowRight, Smartphone, Copy, Palette, Zap, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { InlineCommand } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/site/GithubIcon";

export function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              v0.1 — Button & Card available now
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
              Components for{" "}
              <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                React Native
              </span>
              .
              <br />
              Built with NativeWind.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Beautifully designed, accessible, open-code components for Expo and React Native.
              Copy. Paste. Own your UI.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/docs/installation"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/docs/components/button"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                Browse components
              </Link>
              <a
                href="https://github.com/lucide-react/lucide"
                className="inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            </div>
            <div className="mt-8 max-w-md">
              <InlineCommand command="npx nativeui@latest add button" />
            </div>
          </div>

          {/* Phone frame mockup */}
          <div className="relative mx-auto">
            <div className="absolute -inset-10 -z-10 bg-gradient-to-tr from-muted to-transparent rounded-[3rem] blur-3xl opacity-60" />
            <PhoneFrame />
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Copy, title: "Copy & paste", text: "No package. Components live in your repo." },
            { icon: Palette, title: "NativeWind v4", text: "Same utility classes you use on the web." },
            { icon: Zap, title: "RN primitives", text: "Pressable, View, Text. No magic." },
            { icon: Code2, title: "Themable", text: "Semantic tokens, light + dark out of the box." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-background border border-border">
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-3 font-semibold">{title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Component grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Components</h2>
            <p className="mt-2 text-muted-foreground">
              Tap any preview to see source and installation instructions.
            </p>
          </div>
          <Link
            to="/docs/components/button"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <ComponentCard
            to="/docs/components/button"
            name="Button"
            description="Touchable Pressable with six variants, four sizes, and a loading state."
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              <DemoButton>Default</DemoButton>
              <DemoButton variant="outline">Outline</DemoButton>
              <DemoButton variant="secondary">Secondary</DemoButton>
            </div>
          </ComponentCard>

          <ComponentCard
            to="/docs/components/card"
            name="Card"
            description="Composable container with header, content, and footer slots."
          >
            <DemoCard className="w-full max-w-xs">
              <DemoCardHeader>
                <DemoCardTitle>Create project</DemoCardTitle>
                <DemoCardDescription>Deploy in one click.</DemoCardDescription>
              </DemoCardHeader>
              <DemoCardFooter>
                <DemoButton variant="outline" size="sm">
                  Cancel
                </DemoButton>
                <DemoButton size="sm">Deploy</DemoButton>
              </DemoCardFooter>
            </DemoCard>
          </ComponentCard>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-2xl border border-border bg-muted/30 p-10 lg:p-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Build a beautiful mobile app today.</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Set up NativeWind, drop in your first component, and ship. The whole flow takes about
            10 minutes.
          </p>
          <div className="mt-7">
            <Link
              to="/docs/installation"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Install NativeUI <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span>NativeUI</span>
          </div>
          <div>Built for React Native + NativeWind.</div>
        </div>
      </footer>
    </>
  );
}

function ComponentCard({
  to,
  name,
  description,
  children,
}: {
  to: string;
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-foreground/30 transition-colors"
    >
      <div className="flex min-h-[260px] items-center justify-center bg-muted/30 p-8 border-b border-border">
        {children}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold">{name}</div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{description}</div>
      </div>
    </Link>
  );
}

function PhoneFrame() {
  return (
    <div className="relative mx-auto w-[300px] h-[600px] rounded-[3rem] border-8 border-foreground/90 bg-background shadow-2xl">
      {/* Notch */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2 h-6 w-28 rounded-full bg-foreground/90 z-10" />
      <div className="absolute inset-0 rounded-[2.3rem] overflow-hidden p-5 pt-12 flex flex-col gap-4 bg-gradient-to-b from-background to-muted/40">
        <div className="text-xs font-medium text-muted-foreground">Inbox</div>
        <DemoCard>
          <DemoCardHeader>
            <DemoCardTitle>Notifications</DemoCardTitle>
            <DemoCardDescription>You have 3 unread messages.</DemoCardDescription>
          </DemoCardHeader>
          <DemoCardFooter>
            <DemoButton size="sm">Mark read</DemoButton>
          </DemoCardFooter>
        </DemoCard>
        <DemoCard>
          <DemoCardHeader>
            <DemoCardTitle>Deploy succeeded</DemoCardTitle>
            <DemoCardDescription>main → production · 12s</DemoCardDescription>
          </DemoCardHeader>
        </DemoCard>
        <div className="mt-auto flex flex-col gap-2">
          <DemoButton>Compose</DemoButton>
          <DemoButton variant="outline">Settings</DemoButton>
        </div>
      </div>
    </div>
  );
}

// Demo helper components to simulate Native UI components on the landing page
function DemoButton({ children, variant, size, className }: any) {
  return (
    <Button variant={variant} size={size} className={cn("rounded-full", className)}>
      {children}
    </Button>
  );
}

function DemoCard({ children, className }: any) {
  return <div className={cn("rounded-xl border border-border bg-card p-4", className)}>{children}</div>;
}

function DemoCardHeader({ children, className }: any) {
  return <div className={cn("flex flex-col space-y-1.5 pb-4", className)}>{children}</div>;
}

function DemoCardTitle({ children, className }: any) {
  return <div className={cn("text-lg font-semibold leading-tight", className)}>{children}</div>;
}

function DemoCardDescription({ children, className }: any) {
  return <div className={cn("text-sm text-muted-foreground", className)}>{children}</div>;
}

function DemoCardFooter({ children, className }: any) {
  return <div className={cn("flex items-center gap-2 pt-2", className)}>{children}</div>;
}
