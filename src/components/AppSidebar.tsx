import { History, Settings, LayoutTemplate, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { icon: Sparkles, label: 'New Plan', active: true },
  { icon: History, label: 'History' },
  { icon: LayoutTemplate, label: 'Templates' },
  { icon: Settings, label: 'Settings' },
];

export function AppSidebar() {
  return (
    <aside className="w-14 flex flex-col items-center py-4 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Tooltip key={item.label} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={item.active ? 'secondary' : 'ghost'}
                size="icon"
                className={`w-10 h-10 ${
                  item.active
                    ? 'bg-sidebar-accent text-primary'
                    : 'text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent'
                }`}
              >
                <item.icon className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-popover text-popover-foreground">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </aside>
  );
}
