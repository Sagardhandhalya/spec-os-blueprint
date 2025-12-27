export type OperationType = 'CREATE' | 'MODIFY' | 'DELETE';
export type PlanStatus = 'IDLE' | 'ANALYZING' | 'GENERATED';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface FileChange {
  id: string;
  path: string;
  operation: OperationType;
  description: string;
}

export interface PlanStep {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  language: string;
}

export interface VerificationItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface PlanData {
  title: string;
  riskLevel: RiskLevel;
  filesAffected: FileChange[];
  executionSteps: PlanStep[];
  verificationPlan: VerificationItem[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
