import type { ComponentProp } from "@/data/docs"

interface PropsTableProps {
  props: ComponentProp[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto border border-border/80 rounded-xl bg-white dark:bg-slate-950/10 shadow-elevation-2">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-border bg-slate-50/50 dark:bg-slate-950/40">
            <th className="p-3 font-semibold text-slate-900 dark:text-slate-50">Prop</th>
            <th className="p-3 font-semibold text-slate-900 dark:text-slate-50">Type</th>
            <th className="p-3 font-semibold text-slate-900 dark:text-slate-50">Default</th>
            <th className="p-3 font-semibold text-slate-900 dark:text-slate-50">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => (
            <tr
              key={prop.name}
              className={`border-b border-border/50 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 last:border-b-0 ${
                index % 2 === 1 ? "bg-muted/20" : ""
              }`}
            >
              <td className="p-3 font-semibold text-slate-900 dark:text-slate-200 font-mono">{prop.name}</td>
              <td className="p-3 text-kibra-primary-dark dark:text-kibra-primary font-mono break-all">
                {prop.type}
              </td>
              <td className="p-3 text-muted-foreground font-mono">{prop.default}</td>
              <td className="p-3 text-slate-600 dark:text-slate-300">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
