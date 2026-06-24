import { useEffect, useState } from "react";
import { Search, FileText, BookOpen, Code2, Sparkles } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type SearchEntry = {
  label: string;
  hint?: string;
  href: string;
  icon: typeof FileText;
};

const guides: SearchEntry[] = [
  { label: "Introduction", href: "#introduction", icon: FileText },
  { label: "Quickstart", href: "#", icon: FileText },
  { label: "Working with the File System", href: "#", icon: FileText },
  { label: "Running Processes", href: "#", icon: FileText },
  { label: "Configuring Headers", href: "#", icon: FileText },
  { label: "Troubleshooting", href: "#", icon: FileText },
  { label: "Browser Support", href: "#", icon: FileText },
];

const sections: SearchEntry[] = [
  { label: "Tutorial", href: "#", icon: BookOpen },
  { label: "API Reference", href: "#", icon: Code2 },
  { label: "AI", href: "#", icon: Sparkles },
  { label: "Changelog", href: "#", icon: BookOpen },
  { label: "Commercial Usage", href: "#", icon: BookOpen },
  { label: "Contact", href: "#", icon: BookOpen },
];

const onThisPage: SearchEntry[] = [
  { label: "Key features", href: "#key-features", icon: FileText },
  { label: "WebContainers versus cloud VM", href: "#vs-cloud-vm", icon: FileText },
  { label: "Who's using WebContainers?", href: "#whos-using", icon: FileText },
  { label: "Get started", href: "#get-started", icon: FileText },
  { label: "Community", href: "#community", icon: FileText },
];

export function SearchButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("#") && href.length > 1) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderGroup = (heading: string, items: SearchEntry[]) => (
    <CommandGroup heading={heading}>
      {items.map((item) => (
        <CommandItem
          key={heading + item.label}
          value={`${heading} ${item.label}`}
          onSelect={() => go(item.href)}
        >
          <item.icon className="text-muted-foreground" />
          <span>{item.label}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted md:w-56"
      >
        <Search className="h-4 w-4" />
        <span>Search</span>
        <kbd className="ml-auto rounded border bg-background px-1.5 py-0.5 text-[10px] font-medium">
          Ctrl K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {renderGroup("Guides", guides)}
          <CommandSeparator />
          {renderGroup("Sections", sections)}
          <CommandSeparator />
          {renderGroup("On this page", onThisPage)}
        </CommandList>
      </CommandDialog>
    </>
  );
}
