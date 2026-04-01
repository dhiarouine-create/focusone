import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
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
          'bg-primary text-primary-foreground',
          'hover:opacity-90 active:opacity-80',
          'transition-opacity duration-200',
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

PrimaryButton.displayName = 'PrimaryButton';