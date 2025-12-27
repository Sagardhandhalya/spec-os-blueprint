import { Download, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { PlanData } from '@/types/plan';

interface AppHeaderProps {
  plan?: PlanData | null;
}

export function AppHeader({ plan }: AppHeaderProps) {
  const handleExport = async () => {
    if (!plan) {
      toast.error('No plan to export', {
        description: 'Generate a plan first by chatting with the Architect',
      });
      return;
    }

    // Format the plan for Cursor/IDE
    const formattedPlan = `# Engineering Plan: ${plan.title}

## Risk Level: ${plan.riskLevel}

## Files Affected
${plan.filesAffected.map(f => `- [${f.operation}] ${f.path}: ${f.description}`).join('\n')}

## Execution Steps
${plan.executionSteps.map((step, i) => `
### Step ${i + 1}: ${step.title}
${step.description}

\`\`\`${step.language}
${step.codeSnippet}
\`\`\`
`).join('\n')}

## Verification Plan
${plan.verificationPlan.map(v => `- [ ] ${v.label}`).join('\n')}
`;

    try {
      await navigator.clipboard.writeText(formattedPlan);
      toast.success('Plan copied to clipboard', {
        description: 'Ready to paste into Cursor or your IDE',
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy to clipboard', {
        description: 'Please try again',
      });
    }
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Spec-OS</span>
        </div>
        <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
          v0.1.0
        </span>
      </div>

      <Button
        onClick={handleExport}
        disabled={!plan}
        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        Export to Cursor
      </Button>
    </header>
  );
}
