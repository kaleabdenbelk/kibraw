import { ArrowRight, Copy, Palette, Zap, Code2, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { InlineCommand } from "@/components/code-block";
import { Button } from "@/components/ui/button";
import { EditorMockup } from "@/components/site/EditorMockup";
import { StepsSection } from "@/components/site/StepsSection";
import { COMPONENT_DOCS } from "@/data/docs";
import { cn } from "@/lib/utils";

export function LandingPage() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Hero */}
      <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <h1 className="text-6xl sm:text-7xl font-bold tracking-tight leading-[0.95]">
              Premium UI.
              <br />
              In your <span className="text-muted-foreground/60">mobile app.</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed font-medium">
              Beautifully designed, accessible, open-code components for Expo and React Native.
              Built with NativeWind v4. Copy. Paste. Own your UI.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                to="/docs/installation"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm font-bold text-background transition-all hover:opacity-90 hover:scale-105 active:scale-95"
              >
                Get started
              </Link>
              <Link
                to="/docs/button"
                className="text-sm font-bold text-foreground/80 hover:text-foreground transition-colors"
              >
                Browse components
              </Link>
            </div>
            <div className="mt-12 max-w-md">
              <InlineCommand command="npx create-kibra-app my-app" />
            </div>
          </div>

          {/* Editor/Terminal mockup */}
          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
            <EditorMockup />
          </div>
        </div>
        
        {/* Bottom glowing mesh effect */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-mesh -z-0 opacity-40 dark:opacity-60" />
      </section>

      {/* Feature strip */}
      <section className="border-y border-border/40 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Copy, title: "Copy & paste", text: "No package. Components live in your repo." },
            { icon: Palette, title: "NativeWind v4", text: "Same utility classes you use on the web." },
            { icon: Zap, title: "RN primitives", text: "Pressable, View, Text. No magic." },
            { icon: Code2, title: "Themable", text: "Semantic tokens, light + dark out of the box." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-background border border-border shadow-sm">
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-3 font-semibold">{title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{text}</div>
            </div>
          ))}
        </div>
      </section>

      <StepsSection />

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-24 relative z-10 pt-24">
        <div className="rounded-2xl border border-border/40 bg-secondary/30 p-10 lg:p-14 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight">Build a beautiful mobile app today.</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
            Set up NativeWind, drop in your first component, and ship. The whole flow takes about
            10 minutes.
          </p>
          <div className="mt-7">
            <Link
              to="/docs/installation"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-all hover:opacity-90"
            >
              Install Kibra <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-between text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-foreground" />
            <span className="text-foreground font-bold tracking-tight">Kibra</span>
          </div>
          <div>Built for React Native + NativeWind.</div>
        </div>
      </footer>
    </div>
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
