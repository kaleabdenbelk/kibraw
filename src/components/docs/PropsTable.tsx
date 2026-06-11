import type { ComponentProp } from "@/data/docs"

interface PropsTableProps {
  props: ComponentProp[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto border border-border rounded-xl bg-card shadow-sm">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50 transition-colors hover:bg-muted">
            <th className="h-12 px-4 py-3 font-semibold text-foreground uppercase tracking-wider text-xs">Prop</th>
            <th className="h-12 px-4 py-3 font-semibold text-foreground uppercase tracking-wider text-xs">Type</th>
            <th className="h-12 px-4 py-3 font-semibold text-foreground uppercase tracking-wider text-xs">Default</th>
            <th className="h-12 px-4 py-3 font-semibold text-foreground uppercase tracking-wider text-xs">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="transition-colors hover:bg-muted/30"
            >
              <td className="px-4 py-3 font-semibold text-foreground font-mono text-[13px]">{prop.name}</td>
              <td className="px-4 py-3 text-primary font-mono text-[12px] break-all">
                {prop.type}
              </td>
              <td className="px-4 py-3 text-muted-foreground font-mono text-[12px]">{prop.default}</td>
              <td className="px-4 py-3 text-foreground/80 leading-relaxed">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
