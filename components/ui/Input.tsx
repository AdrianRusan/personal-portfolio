import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | undefined;
  isRequired?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, isRequired, type = 'text', id, ...props }, ref) => {
    // Use provided id or generate a stable one based on name prop
    const inputId = id || (props.name ? `input-${props.name}` : undefined);
    
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white-100"
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-black-200 text-white placeholder-white-200/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple",
            error 
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
              : "border-white/10 hover:border-white/20",
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error && inputId ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && inputId && (
          <p 
            id={`${inputId}-error`}
            className="text-sm text-red-500 mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input }; 