import { HTMLAttributes } from 'react';
import { cn } from '../ui/utils';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ 
  value, 
  showLabel = false, 
  size = 'md', 
  className, 
  ...props 
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Progress</span>
          <span className="text-sm font-semibold text-text-primary">{clampedValue}%</span>
        </div>
      )}
      <div className={cn('w-full bg-surface rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
