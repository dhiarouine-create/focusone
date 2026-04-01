import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../ui/utils';

export interface IdeaCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: ReactNode;
  footer?: ReactNode;
}

export function IdeaCard({ 
  title, 
  description, 
  icon, 
  footer, 
  className, 
  ...props 
}: IdeaCardProps) {
  return (
    <div
      className={cn(
        'bg-background border border-border rounded-lg p-5',
        'hover:shadow-sm transition-shadow duration-200',
        'cursor-pointer',
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-semibold text-text-primary">{title}</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        </div>
        {footer && (
          <div className="mt-2 pt-3 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
