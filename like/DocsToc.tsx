const tocItems = [
  { id: "key-features", label: "Key features" },
  { id: "vs-cloud-vm", label: "WebContainers versus cloud VM approach" },
  { id: "whos-using", label: "Who's using WebContainers?" },
  { id: "get-started", label: "Get started" },
  { id: "community", label: "Community" },
];

export function DocsToc() {
  return (
    <aside className="hidden w-60 shrink-0 xl:block">
      <nav className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto p-6 text-sm">
        <p className="mb-3 font-semibold text-foreground">On this page</p>
        <ul className="space-y-2 border-l">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
