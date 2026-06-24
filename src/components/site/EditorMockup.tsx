import { Play, List, ChevronRight } from "lucide-react";

export function EditorMockup() {
  return (
    <div className="relative w-full max-w-[500px] lg:max-w-none mx-auto aspect-square lg:aspect-video group perspective-1000">
      {/* Editor Layer */}
      <div className="absolute left-0 top-0 w-full lg:w-[90%] rounded-xl border border-white/10 bg-[#161617]/80 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-700 group-hover:rotate-y-12 group-hover:translate-x-4 z-20">
        <div className="flex items-center justify-between px-4 h-10 border-b border-white/5 bg-white/5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-500/20" />
            <div className="size-2.5 rounded-full bg-amber-500/20" />
            <div className="size-2.5 rounded-full bg-emerald-500/20" />
          </div>
          <div className="text-[11px] font-medium text-white/30 font-mono">index.tsx</div>
        </div>
        <div className="p-4 lg:p-6 font-mono text-[12px] lg:text-[14px] leading-relaxed whitespace-nowrap overflow-x-auto">
          <div className="flex gap-4">
            <span className="text-white/20 select-none">1</span>
            <span className="text-pink-400">import</span>
            <span className="text-white">{" { "}</span>
            <span className="text-blue-400">Button</span>
            <span className="text-white">{" } "}</span>
            <span className="text-pink-400">from</span>
            <span className="text-emerald-400">"@/components/ui/button"</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/20 select-none">2</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/20 select-none">3</span>
            <span className="text-pink-400">export function</span>
            <span className="text-blue-400">App</span>
            <span className="text-white">() {"{"}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/20 select-none">4</span>
            <span className="text-pink-400 ml-4">return</span>
            <span className="text-white">(</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/20 select-none">5</span>
            <span className="text-white ml-8">{"<"}</span>
            <span className="text-blue-400">Button</span>
            <span className="text-emerald-400"> label</span>
            <span className="text-white">=</span>
            <span className="text-emerald-400">"Kibra"</span>
            <span className="text-white"> {"/>"}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/20 select-none">6</span>
            <span className="text-white ml-4">)</span>
          </div>
          <div className="flex gap-4">
            <span className="text-white/20 select-none">7</span>
            <span className="text-white">{"}"}</span>
          </div>
        </div>
      </div>

      {/* Terminal Layer */}
      <div className="absolute right-0 top-[55%] lg:top-[60%] w-full lg:w-[80%] rounded-xl border border-white/10 bg-[#0c0c0d]/90 backdrop-blur-2xl shadow-2xl overflow-hidden z-30 transition-all duration-700 group-hover:translate-y-2 group-hover:-translate-x-4">
        <div className="p-4 font-mono text-[11px] lg:text-[13px] leading-relaxed">
          <div className="text-emerald-400 font-bold mb-1 lg:mb-2">dependencies:</div>
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-emerald-400">+</span>
            <span>kibra-ui</span>
            <span className="text-white/40 text-[10px] lg:text-[11px]">v0.1.0</span>
          </div>
          <div className="mt-3 lg:mt-4 text-white/40">Done in 1.2s</div>
          <div className="mt-3 lg:mt-4 flex items-center gap-2">
            <span className="text-pink-400">~</span>
            <span className="text-white/90">npx kibra init</span>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <ChevronRight className="h-4 w-4 text-white/20" />
            <div className="h-4 w-2 bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Glowing Mesh Effect (Background) */}
      <div className="absolute -inset-10 -z-10 bg-mesh opacity-20 lg:opacity-40 blur-3xl" />
    </div>
  );
}
