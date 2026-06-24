import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const guideLinks = [
  { label: "Introduction", active: true },
  { label: "Quickstart" },
  { label: "Working with the File System" },
  { label: "Running Processes" },
  { label: "Configuring Headers" },
  { label: "Troubleshooting" },
  { label: "Runtime Test Cases for AI Agents" },
  { label: "Browser Support" },
  { label: "API Versioning and Support" },
  { label: "Browser Configuration" },
];

const expandableSections: Record<
  string,
  { label: string; links: string[] }
> = {
  Tutorial: {
    label: "Tutorial",
    links: ["Getting started", "Building your app", "Next steps"],
  },
  "API Reference": {
    label: "API Reference",
    links: ["WebContainer", "FileSystemAPI", "ShellAPI"],
  },
  "Community Projects": {
    label: "Community Projects",
    links: ["Showcase", "Submit a project"],
  },
};

const staticSections = [
  { label: "Changelog" },
  { label: "Commercial Usage" },
  { label: "Contact" },
];

export function DocsSidebar({ open }: { open: boolean }) {
  const [guidesOpen, setGuidesOpen] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleSection = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={`${
        open ? "block" : "hidden"
      } w-full shrink-0 border-r bg-secondary/30 lg:block lg:w-64`}
    >
      <nav className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-4 text-sm">
        {/* Guides — collapsible */}
        <Collapsible open={guidesOpen} onOpenChange={setGuidesOpen}>
          <CollapsibleTrigger asChild>
            <button className="mb-2 flex w-full items-center justify-between rounded-md px-2 py-1 font-semibold transition-colors hover:bg-accent/60">
              <span>Guides</span>
              <ChevronRight
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                  guidesOpen ? "rotate-90" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="space-y-0.5">
              {guideLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href="#"
                    className={`block rounded-md px-3 py-1.5 transition-colors ${
                      l.active
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>

        {/* Other sections */}
        <ul className="mt-4 space-y-0.5 border-t pt-4">
          {Object.values(expandableSections).map((section) => (
            <li key={section.label}>
              <Collapsible
                open={expanded[section.label]}
                onOpenChange={() => toggleSection(section.label)}
              >
                <CollapsibleTrigger asChild>
                  <button className="flex w-full items-center justify-between rounded-md px-3 py-1.5 font-medium text-foreground/90 transition-colors hover:bg-accent/60">
                    <span>{section.label}</span>
                    <ChevronRight
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                        expanded[section.label] ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="mb-1 ml-4 mt-0.5 space-y-0.5 border-l pl-3">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="block rounded-md px-3 py-1 text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </li>
          ))}

          {staticSections.map((s) => (
            <li key={s.label}>
              <a
                href="#"
                className="flex items-center justify-between rounded-md px-3 py-1.5 font-medium text-foreground/90 transition-colors hover:bg-accent/60"
              >
                <span>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
