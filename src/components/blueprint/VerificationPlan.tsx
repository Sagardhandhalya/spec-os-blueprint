import { ShieldCheck, CheckCircle2, Circle } from 'lucide-react';
import { VerificationItem } from '@/types/plan';
import { useState } from 'react';

interface VerificationPlanProps {
  items: VerificationItem[];
}

export function VerificationPlan({ items: initialItems }: VerificationPlanProps) {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const completedCount = items.filter((item) => item.checked).length;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Guardrails & Verification
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{items.length} complete
        </span>
      </div>

      <div className="glass-panel rounded-lg p-4 space-y-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-center gap-3 group animate-fade-in text-left"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex-shrink-0">
              {item.checked ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </div>
            <span
              className={`text-sm transition-colors ${
                item.checked
                  ? 'text-muted-foreground line-through'
                  : 'text-foreground group-hover:text-primary'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
