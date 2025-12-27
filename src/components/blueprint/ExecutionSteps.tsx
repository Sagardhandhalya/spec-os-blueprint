import { ListOrdered, ChevronDown } from 'lucide-react';
import { PlanStep } from '@/types/plan';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ExecutionStepsProps {
  steps: PlanStep[];
}

export function ExecutionSteps({ steps }: ExecutionStepsProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <ListOrdered className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Execution Steps
        </h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {steps.length}
        </span>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {steps.map((step, index) => (
          <AccordionItem
            key={step.id}
            value={step.id}
            className="glass-panel rounded-lg border-0 overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 [&[data-state=open]]:bg-muted/30">
              <div className="flex items-center gap-3 text-left">
                <span className="w-7 h-7 rounded-lg bg-primary/20 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <div>
                  <span className="font-medium text-sm">{step.title}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="mt-2 rounded-lg bg-background/80 border border-border overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {step.language}
                  </span>
                </div>
                <pre className="p-4 overflow-x-auto scrollbar-thin">
                  <code className="text-xs font-mono text-foreground/90 leading-relaxed">
                    {step.codeSnippet}
                  </code>
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
