import { HTMLAttributes } from 'react';
import { cn } from '../ui/utils';

export type BadgeStatus = 'locked' | 'pending' | 'passed' | 'failed';

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  label?: string;
}

const badgeConfig: Record<BadgeStatus, { 
  bgColor: string; 
  textColor: string; 
  label: string;
}> = {
  locked: {
    bgColor: 'bg-text-secondary/10',
    textColor: 'text-text-secondary',
    label: 'Locked',
  },
  pending: {
    bgColor: 'bg-warning/10',
    textColor: 'text-warning',
    label: 'Pending',
  },
  passed: {
    bgColor: 'bg-success/10',
    textColor: 'text-success',
    label: 'Passed',
  },
  failed: {
    bgColor: 'bg-danger/10',
    textColor: 'text-danger',
    label: 'Failed',
  },
};

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  const config = badgeConfig[status];
  const displayLabel = label || config.label;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
        config.bgColor,
        config.textColor,
        className
      )}
      {...props}
    >
      {displayLabel}
    </span>
  );
}
