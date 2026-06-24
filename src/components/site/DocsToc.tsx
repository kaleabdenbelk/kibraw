import { useEffect, useState } from "react";

export function DocsToc() {
  const [activeId, setActiveId] = useState<string>("");
  const [tocItems, setTocItems] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2[id], h3[id]"));
    const items = headings.map((h) => ({
      id: h.id,
      label: h.textContent || "",
    }));
    setTocItems(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (tocItems.length === 0) return null;

  return (
    <aside className="hidden w-64 shrink-0 xl:block">
      <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto p-6 text-sm scrollbar-none">
        <p className="mb-4 font-bold tracking-tight text-foreground/90 uppercase text-[11px]">
          On this page
        </p>
        <ul className="space-y-2.5 border-l border-border/60">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`-ml-px block border-l-2 pl-4 transition-all duration-200 ${
                  activeId === item.id
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
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
