import React from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | undefined;
  isRequired?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, isRequired, ...props }, ref) => {
    const textareaId = React.useId();
    
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-white-100"
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-lg border bg-black-200 text-white placeholder-white-200/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple/50 focus:border-purple resize-y min-h-[120px]",
            error 
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" 
              : "border-white/10 hover:border-white/20",
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <p 
            id={`${textareaId}-error`}
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

TextArea.displayName = 'TextArea';

export { TextArea }; 