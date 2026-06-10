import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Check, Copy, Layers, Terminal, Smartphone, Accessibility, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KibraLogo } from "@/components/site/KibraLogo"
import { CREATE_COMMAND } from "@/lib/constants"
import { useCopy } from "@/lib/use-copy"

const TECH_BADGES = ["React Native", "Expo", "NativeWind", "TypeScript", "Accessible"]

const FEATURES = [
  {
    icon: Code2,
    title: "Copy-paste ownership",
    description: "Components live in your repo. No black-box dependencies — customize every line.",
  },
  {
    icon: Smartphone,
    title: "Cross-platform",
    description: "One blueprint runs on iOS, Android, and web via React Native and NativeWind.",
  },
  {
    icon: Terminal,
    title: "CLI-powered",
    description: "Scaffold projects and add primitives with npx kibra — shadcn-style workflow for RN.",
  },
  {
    icon: Accessibility,
    title: "Accessible primitives",
    description: "Built on @rn-primitives with WAI-ARIA patterns and keyboard support out of the box.",
  },
]

const SHOWCASE_COMPONENTS = [
  { name: "Button", slug: "button", preview: "Primary action" },
  { name: "Card", slug: "card", preview: "Content container" },
  { name: "Dialog", slug: "dialog", preview: "Modal overlay" },
  { name: "Tabs", slug: "tabs", preview: "Section switcher" },
  { name: "Switch", slug: "switch", preview: "Toggle control" },
  { name: "Avatar", slug: "avatar", preview: "User profile" },
]

const STEPS = [
  { step: "1", command: "npx kibra create my-app", label: "Scaffold a new Expo project" },
  { step: "2", command: "npx kibra add button", label: "Add components to your codebase" },
  { step: "3", command: "// customize freely", label: "Own the code — tweak styles and behavior" },
]

export function LandingPage() {
  const { copiedText, handleCopy } = useCopy()

  React.useEffect(() => {
    document.title = "Kibra UI — Copy-paste React Native components"
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden section-gap pt-16 pb-20 md:pt-24 md:pb-28">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0, 216, 255, 0.15), transparent),
              linear-gradient(to bottom, #faf8ff, #eaedff33 50%, transparent)
            `,
          }}
        />
        <div
          className="absolute inset-0 -z-10 dark:opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d8ff' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <KibraLogo variant="vertical" className="justify-center" />
          </div>
          <h1 className="text-h1 text-slate-900 dark:text-slate-50 max-w-3xl mx-auto">
            Build native apps with copy-paste components
          </h1>
          <p className="text-body-lg text-muted-foreground mt-4 max-w-2xl mx-auto font-light">
            Kibra is a shadcn-style component system for React Native and Expo. Beautiful primitives,
            CLI tooling, and full source ownership.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Button size="lg" asChild className="gap-2">
              <Link to="/docs/getting-started">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 font-mono text-sm"
              onClick={() => handleCopy(CREATE_COMMAND, "hero-create")}
            >
              {copiedText === "hero-create" ? (
                <>
                  <Check className="size-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  {CREATE_COMMAND}
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-border/60 bg-muted/30 py-6">
        <div className="max-w-container mx-auto px-6 flex flex-wrap items-center justify-center gap-3">
          {TECH_BADGES.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-label-md px-3 py-1">
              {badge}
            </Badge>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section-gap py-20">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-slate-900 dark:text-slate-50">Why Kibra?</h2>
            <p className="text-body-lg text-muted-foreground mt-2 max-w-xl mx-auto">
              Everything you need to ship polished mobile UI, without sacrificing control.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="shadow-elevation-2 border-border/80">
                <CardHeader>
                  <div className="size-10 rounded-lg bg-kibra-primary/10 dark:bg-kibra-primary-dark/20 flex items-center justify-center mb-2">
                    <Icon className="size-5 text-kibra-primary-dark dark:text-kibra-primary" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Component preview grid */}
      <section className="section-gap py-20 bg-muted/20">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-slate-900 dark:text-slate-50">Universal Primitives</h2>
            <p className="text-body-lg text-muted-foreground mt-2">
              26+ components ready to drop into your Expo project.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHOWCASE_COMPONENTS.map((comp) => (
              <Link
                key={comp.slug}
                to={`/docs/${comp.slug}`}
                className="group rounded-xl border border-border bg-card p-5 shadow-elevation-2 hover:border-kibra-primary/40 hover:shadow-elevation-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground group-hover:text-kibra-primary-dark dark:group-hover:text-kibra-primary transition-colors">
                    {comp.name}
                  </span>
                  <Layers className="size-4 text-muted-foreground" />
                </div>
                <div className="h-16 rounded-lg bg-muted/50 border border-border/60 flex items-center justify-center text-body-sm text-muted-foreground">
                  {comp.preview}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-gap py-20">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-slate-900 dark:text-slate-50">How it works</h2>
            <p className="text-body-lg text-muted-foreground mt-2">Three steps to your first component.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {STEPS.map(({ step, command, label }) => (
              <div key={step} className="space-y-3">
                <div className="size-8 rounded-full bg-kibra-gradient text-[#005a6c] font-bold flex items-center justify-center text-sm">
                  {step}
                </div>
                <p className="text-body-sm text-muted-foreground">{label}</p>
                <div className="rounded-lg border border-border bg-slate-950 px-4 py-3 font-mono text-xs text-slate-200">
                  {command}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="section-gap py-20">
        <div className="max-w-container mx-auto px-6">
          <div className="relative rounded-2xl p-[1px] bg-kibra-gradient shadow-elevation-3">
            <div className="rounded-2xl bg-background px-8 py-12 md:py-16 text-center">
              <h2 className="text-h2 text-slate-900 dark:text-slate-50">Ready to explore?</h2>
              <p className="text-body-lg text-muted-foreground mt-2 max-w-lg mx-auto">
                Browse the interactive showroom, preview every primitive, and copy installation commands.
              </p>
              <Button size="lg" asChild className="mt-6 gap-2">
                <Link to="/docs/getting-started">
                  Browse the showroom
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
