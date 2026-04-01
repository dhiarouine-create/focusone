import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

export interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg',
          'bg-surface text-text-primary border border-border',
          'hover:bg-surface/80 active:bg-surface/70',
          'transition-colors duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';
