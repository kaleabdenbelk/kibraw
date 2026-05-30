import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion-native"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert-native"

export function App() {
  return (
    <div className="flex min-h-svh p-6 flex-col gap-8 justify-center items-center">
      <div className="flex w-full max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium text-lg mb-2">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>

      <div className="w-full max-w-md border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-950 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
          React Native Accordion (Web Preview)
        </h2>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes! It uses react-native-reanimated transitions for smooth expansion.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Does it run on Web?</AccordionTrigger>
            <AccordionContent>
              Absolutely. Through react-native-web aliasing, you can preview React Native primitives smoothly.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full max-w-md border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-950 shadow-sm flex flex-col gap-4">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          React Native Alert (Web Preview)
        </h2>
        
        <Alert variant="default">
          <AlertDescription>
            <AlertTitle>Heads up!</AlertTitle>
            You can add components and see them previewing on the web immediately.
          </AlertDescription>
        </Alert>

        <Alert variant="destructive">
          <AlertDescription>
            <AlertTitle>Error occurred!</AlertTitle>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}

export default App
