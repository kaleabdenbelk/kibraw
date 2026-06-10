import { Text } from "react-native"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion-native"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert-native"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import type { ComponentPreviewState } from "./useComponentPreviewState"

interface PreviewProps {
  slug: string
  state: ComponentPreviewState
  copiedText: string | null
  onCopy: (text: string, id: string) => void
}


export function BasicComponentPreviews({ slug, state }: PreviewProps) {
  const s = state
  return (
    <>
{/* BUTTON PREVIEW */}
{slug === "button" && (
  <div className="flex flex-col items-center gap-4">
    <Button
      variant={s.btnVariant}
      size={s.btnSize}
      onClick={() => s.setBtnClicks(c => c + 1)}
    >
      {s.btnSize === "icon" || s.btnSize === "icon-xs" || s.btnSize === "icon-sm" || s.btnSize === "icon-lg" ? (
        <Sparkles className="size-4" />
      ) : (
        s.btnLabel
      )}
    </Button>
    <div className="text-[11px] text-muted-foreground font-mono bg-white dark:bg-slate-900 border border-border px-2 py-0.5 rounded-md">
      Clicks: {s.btnClicks}
    </div>
  </div>
)}

{/* ACCORDION PREVIEW */}
{slug === "accordion" && (
  <div className="w-full bg-white dark:bg-slate-900 border border-border/60 rounded-xl p-5 shadow-sm">
    <Accordion type={s.accType} collapsible={s.accCollapsible} defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and is fully screen-reader compatible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it universal?</AccordionTrigger>
        <AccordionContent>
          Yes! It renders flawlessly as a React Native list on iOS/Android, and mirrors as a lightweight compliant accordion on Web.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
)}

{/* ALERT PREVIEW */}
{slug === "alert" && (
  <div className="w-full">
    <Alert variant={s.alVariant}>
      <AlertDescription>
        <AlertTitle>{s.alTitle}</AlertTitle>
        {s.alDescription}
      </AlertDescription>
    </Alert>
  </div>
)}

{/* BADGE PREVIEW */}
{slug === "badge" && (
  <Badge variant={s.badgeVariant}>
    {s.badgeLabel}
  </Badge>
)}

{/* CARD PREVIEW */}
{slug === "card" && (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{s.cardTitle}</CardTitle>
      <CardDescription>{s.cardDescription}</CardDescription>
    </CardHeader>
    <CardContent>
      <Text className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {s.cardContentText}
      </Text>
    </CardContent>
    <CardFooter className="justify-end gap-2 flex-row">
      <Button size="sm" variant="outline">Dismiss</Button>
      <Button size="sm">Get Started</Button>
    </CardFooter>
  </Card>
)}

{/* INPUT PREVIEW */}
{slug === "input" && (
  <div className="w-full">
    <Input
      label={s.inputLabel}
      error={s.inputError || undefined}
      value={s.inputValue}
      onChangeText={s.setInputValue}
      placeholder="Type something here..."
    />
  </div>
)}

{/* TEXTAREA PREVIEW */}
{slug === "textarea" && (
  <div className="w-full">
    <Textarea
      value={s.textareaValue}
      onChangeText={s.setTextareaValue}
      placeholder="Type some description..."
    />
  </div>
)}

{/* SKELETON PREVIEW */}
{slug === "skeleton" && (
  <div className="w-full space-y-4">
    <div className="flex items-center gap-3 flex-row">
      {s.skeletonLoading ? (
        <Skeleton className="size-10 rounded-full shrink-0" />
      ) : (
        <div className="size-10 rounded-full bg-kibra-primary flex items-center justify-center text-[#005a6c] text-xs font-bold font-sans shrink-0">
          KB
        </div>
      )}
      <div className="space-y-2 flex-1">
        {s.skeletonLoading ? (
          <>
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </>
        ) : (
          <>
            <Text className="text-sm font-semibold text-slate-900 dark:text-slate-100">Kibra Dev</Text>
            <Text className="text-xs text-slate-500">Core Developer</Text>
          </>
        )}
      </div>
    </div>
    <div className="space-y-2">
      {s.skeletonLoading ? (
        <>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </>
      ) : (
        <Text className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
          Kibra handles NativeWind setup, Lucide-icons, and component imports automatically. Build gorgeous apps in minutes!
        </Text>
      )}
    </div>
  </div>
)}

    </>
  )
}
