import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../ui/utils';

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
}

export interface BottomNavigationProps extends HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export function BottomNavigation({
  items,
  activeId,
  onItemClick,
  className,
  ...props
}: BottomNavigationProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 md:hidden',
        'bg-background border-t border-border',
        'safe-area-inset-bottom',
        className
      )}
      {...props}
    >
      <nav className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick?.(item.id)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg',
                'transition-colors duration-200',
                'min-w-[60px]',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              )}
            >
              <div className="w-6 h-6">
                {item.icon}
              </div>
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
