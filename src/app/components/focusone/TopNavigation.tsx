import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../ui/utils';

export interface TopNavigationProps extends HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export function TopNavigation({
  logo,
  title,
  actions,
  className,
  ...props
}: TopNavigationProps) {
  return (
    <div
      className={cn(
        'hidden md:flex items-center justify-between',
        'bg-background border-b border-border',
        'px-6 py-4',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {logo && (
          <div className="flex items-center justify-center">
            {logo}
          </div>
        )}
        {title && (
          <h2 className="font-bold text-text-primary">{title}</h2>
        )}
      </div>
      
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}
