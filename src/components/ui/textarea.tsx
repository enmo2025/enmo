'use client';

import * as React from 'react';

import { cn } from '~/lib/utils';
import { Label } from './label';
import { cva } from 'class-variance-authority';

const textareaVariants = cva(
  'flex min-h-12 w-full gap-2 rounded bg-white py-2 pl-4 pr-2 text-body-lg placeholder:text-grey-300 hover:border-grey-500 focus:border-grey-600 focus:text-grey-800 focus:outline-none disabled:pointer-events-none disabled:bg-grey-700 disabled:text-black disabled:opacity-15 disabled:placeholder:text-black',
  {
    variants: {
      variant: {
        default: 'border border-brown-900',
        warning: 'border border-warning',
        success: 'border border-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & {
    label?: string;
    helperText?: string;
    variant?: 'default' | 'warning' | 'success';
  }
>(({ className, onChange, value, helperText, variant, ...props }, ref) => {
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    if (typeof value === 'string') {
      setLength(value.length);
    }
  }, [value]);

  const getHelperTextColor = () => {
    if (variant === 'warning') return 'text-warning';
    if (variant === 'success') return 'text-success text-body-sm';
    if (props.disabled) return 'text-grey-400';
    return 'text-grey-600';
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <Label htmlFor={props.id} disabled={props.disabled}>
        {props.label}
      </Label>
      <textarea
        className={cn(textareaVariants({ variant }), className)}
        ref={ref}
        onChange={(e) => {
          setLength(e.target.value.length);
          if (props.maxLength && e.target.value.length > props.maxLength) {
            e.target.value = e.target.value.slice(0, props.maxLength);
          }
          if (onChange) onChange(e);
        }}
        value={value}
        {...props}
      />
      <div className={cn('flex w-full items-center', helperText ? 'justify-between' : 'justify-end')}>
        {helperText && <p className={cn('text-body-md', getHelperTextColor())}>{helperText}</p>}
        {props.maxLength && (
          <div className={cn('text-label-sm font-medium', length === props.maxLength && 'text-warning')}>
            {length}/{props.maxLength}
          </div>
        )}
      </div>
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
