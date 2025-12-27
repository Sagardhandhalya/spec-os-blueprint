import { Code2, AlertTriangle, Shield, Zap } from 'lucide-react';
import { PlanData, PlanStatus, RiskLevel } from '@/types/plan';
import { FilesAffected } from './FilesAffected';
import { ExecutionSteps } from './ExecutionSteps';
import { VerificationPlan } from './VerificationPlan';
import { BlueprintSkeleton } from './BlueprintSkeleton';

interface BlueprintPanelProps {
  status: PlanStatus;
  plan: PlanData | null;
}

const riskConfig: Record<RiskLevel, { icon: React.ElementType; className: string }> = {
  Low: { icon: Shield, className: 'bg-success/20 text-success border-success/30' },
  Medium: { icon: Zap, className: 'bg-warning/20 text-warning border-warning/30' },
  High: { icon: AlertTriangle, className: 'bg-destructive/20 text-destructive border-destructive/30' },
};

export function BlueprintPanel({ status, plan }: BlueprintPanelProps) {
  if (status === 'ANALYZING') {
    return <BlueprintSkeleton />;
  }

  if (status === 'IDLE' || !plan) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto">
            <Code2 className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-muted-foreground">
              Live Engineering Spec
            </h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Start a conversation to generate a structured plan
            </p>
          </div>
        </div>
      </div>
    );
  }

  const RiskIcon = riskConfig[plan.riskLevel].icon;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Live Engineering Spec
          </h2>
          <p className="text-base font-medium mt-1">{plan.title}</p>
        </div>
        <div
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${
            riskConfig[plan.riskLevel].className
          }`}
        >
          <RiskIcon className="w-3.5 h-3.5" />
          Risk: {plan.riskLevel}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
        <FilesAffected files={plan.filesAffected} />
        <ExecutionSteps steps={plan.executionSteps} />
        <VerificationPlan items={plan.verificationPlan} />
      </div>
    </div>
  );
}
