import { useState, useEffect } from "react";
import { ChevronRight, Terminal, BookOpen, Copy, Ship } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "init",
    title: "Initialize your project.",
    description: "Run our CLI to set up a new Expo project with NativeWind v4 pre-configured.",
    icon: Terminal,
    code: `npx kibra init my-new-app\n\n# Installing dependencies...\n# Configuring NativeWind...\n# Done!`,
  },
  {
    id: "browse",
    title: "Explore and copy installation command",
    description: "Browse our documentation to find the components you need for your app.",
    icon: BookOpen,
    code: `// components/ui/index.ts\nexport * from './button';\nexport * from './card';\nexport * from './accordion';\nexport * from './tabs';`,
  },
  {
    id: "copy",
    title: "Copy & paste the code.",
    description: "No complex installs. Just copy the code and drop it into your project.",
    icon: Copy,
    code: `import { Button } from "@/components/ui/button";\n\nexport default function App() {\n  return <Button label="Get Started" />;\n}`,
  },
  {
    id: "run",
    title: "Ship your mobile app.",
    description: "See your premium UI in action on iOS, Android, and Web.",
    icon: Ship,
    code: `npx expo start\n\n> Local: http://localhost:8081\n> Android: press a\n> iOS: press i`,
  },
];

function CodeHighlighter({ code, type }: { code: string; type: 'terminal' | 'editor' }) {
  if (type === 'terminal') {
    return (
      <div className="flex flex-col font-mono text-[13px]">
        {code.split('\n').map((line, i) => {
          if (line.startsWith('#')) return <span key={i} className="text-white/40 italic">{line}</span>;
          if (line.startsWith('npx')) {
            const parts = line.split(' ');
            return (
              <span key={i}>
                <span className="text-pink-400">{parts[0]}</span>{' '}
                <span className="text-blue-400">{parts[1]}</span>{' '}
                <span className="text-white">{parts.slice(2).join(' ')}</span>
              </span>
            );
          }
          if (line.startsWith('>')) return <span key={i} className="text-emerald-400">{line}</span>;
          return <span key={i} className="text-white/90">{line}</span>;
        })}
      </div>
    );
  }

  // Simple Editor Highlighting - Preserving spaces
  const highlightLine = (line: string) => {
    // Regex that captures keywords and maintains delimiters (spaces, punctuation)
    const tokens = line.split(/(\s+|[{}()[\];.,<>=!"'+*/:])/g);
    return tokens.map((token, i) => {
      if (!token) return null;
      if (/\s+/.test(token)) return <span key={i}>{token}</span>;
      if (/import|export|default|function|return|from|const/.test(token)) {
        return <span key={i} className="text-pink-400">{token}</span>;
      }
      if (token === '"' || token === "'" || token === ';') {
        return <span key={i} className="text-white/40">{token}</span>;
      }
      if (/\.\/|@\//.test(token) || token.startsWith('"') || token.endsWith('"')) {
        return <span key={i} className="text-emerald-400">{token}</span>;
      }
      if (/Button|App|Card|Accordion|Tabs/.test(token)) {
        return <span key={i} className="text-blue-400">{token}</span>;
      }
      if (/[{}()[\]<>=]/.test(token)) {
        return <span key={i} className="text-white/60">{token}</span>;
      }
      if (/\/\/|button|card|accordion|tabs/.test(token) && !token.includes('Button')) {
        return <span key={i} className="text-white/40">{token}</span>;
      }
      return <span key={i} className="text-white/90">{token}</span>;
    });
  };

  return (
    <div className="font-mono text-[13px] leading-relaxed select-all whitespace-pre">
      {code.split('\n').map((line, i) => (
        <div key={i}>{highlightLine(line)}</div>
      ))}
    </div>
  );
}

export function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentStep = STEPS[activeStep];
  const isTerminal = currentStep.id === 'init' || currentStep.id === 'run';

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight">Set up in only a few steps</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: Steps List */}
        <div className="space-y-8">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={cn(
                "group relative flex items-start gap-6 text-left transition-all duration-300",
                activeStep === index ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70 scale-100"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                activeStep === index
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                  : "border-border text-muted-foreground"
              )}>
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              {activeStep === index && (
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-primary rounded-full animate-in fade-in zoom-in-y duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Right: Mockup Window (Always Dark) */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[420px]">
          <div className="h-full w-full rounded-2xl border border-white/5 bg-[#000] shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 h-10 border-b border-white/5 bg-white/5">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-400/20" />
                <div className="size-2.5 rounded-full bg-amber-400/20" />
                <div className="size-2.5 rounded-full bg-emerald-400/20" />
              </div>
              <div className="text-[11px] font-mono text-white/30 flex items-center gap-2">
                {isTerminal ? (
                  <Terminal className="h-3 w-3" />
                ) : (
                  <BookOpen className="h-3 w-3" />
                )}
                {isTerminal ? 'terminal' : 'editor'}
              </div>
            </div>
            <div className="flex-1 p-8 font-mono text-[13px] leading-relaxed overflow-hidden bg-[#0a0a0a]/50">
              <div key={activeStep} className="animate-in fade-in slide-in-from-right-4 duration-500">
                <CodeHighlighter code={currentStep.code} type={isTerminal ? 'terminal' : 'editor'} />
              </div>
            </div>
          </div>


          {/* Subtle glow behind the window */}
          <div className="absolute -inset-4 -z-10 bg-primary/10 blur-3xl rounded-3xl" />
        </div>
      </div>

      {/* Bottom callout */}
      <div className="mt-20 mx-auto max-w-2xl rounded-xl border border-border/40 bg-secondary/30 p-4 flex items-center justify-center gap-4 text-sm font-medium transition-all hover:bg-secondary/50 cursor-pointer">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
          <BookOpen className="h-4 w-4" />
        </div>
        <span>
          Read more about <span className="text-foreground">Kibra</span> in our documentation.
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </section>
  );
}

