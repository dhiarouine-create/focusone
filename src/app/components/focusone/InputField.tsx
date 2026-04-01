import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'bg-background border border-border',
            'text-text-primary placeholder:text-text-secondary',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-danger focus:ring-danger',
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-danger">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-xs text-text-secondary">{helperText}</span>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
