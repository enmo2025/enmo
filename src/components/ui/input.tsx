import { cva, VariantProps } from 'class-variance-authority';
import { CheckCircleIcon, Info } from 'lucide-react';
import * as React from 'react';

import { cn } from '~/lib/utils';
import { Label } from './label';

const inputVariants = cva(
  'flex min-h-12 w-full bg-white py-2 pl-4 pr-2 gap-2 text-body-lg placeholder:text-grey-300 focus:outline-none focus:text-grey-800  hover:border-grey-500 focus:border-grey-600 disabled:bg-grey-700 disabled:text-black disabled:placeholder:text-black disabled:opacity-15 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border border-grey-200',
        warning: 'border border-warning',
        success: 'border border-success',
        outline: 'border border-brown-900',
      },
      typeStyle: {
        pill: 'rounded-full',
        round: 'rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      typeStyle: 'round',
    },
  }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  asChild?: boolean;
  label?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  orientation?: 'vertical' | 'horizontal';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, variant, typeStyle, helperText, leadingIcon, trailingIcon, orientation, ...props },
    ref
  ) => {
    const getTrailingIcon = () => {
      if (variant === 'warning') return <Info className="h-5 w-5 text-warning" />;
      if (variant === 'success') return <CheckCircleIcon className="h-5 w-5 text-success" />;
      return null;
    };

    const getHelperTextColor = () => {
      if (variant === 'warning') return 'text-warning';
      if (variant === 'success') return 'text-success text-body-sm';
      if (props.disabled) return 'text-grey-400';
      return 'text-grey-600';
    };

    return (
      <div
        className={cn(
          'flex items-start gap-1',
          orientation === 'horizontal' ? 'flex-row items-center gap-5' : 'flex-col'
        )}
      >
        <Label htmlFor={props.id} disabled={props.disabled}>
          {label}
        </Label>
        <div className="flex w-full flex-col gap-1">
          <div className="relative w-full">
            {leadingIcon && <span className="absolute inset-y-0 left-2 flex items-center gap-2">{leadingIcon}</span>}
            <input
              type={type}
              className={cn(
                inputVariants({ variant, typeStyle, className }),
                trailingIcon || variant !== 'default' ? 'pr-10' : '',
                leadingIcon ? 'pl-10' : '',
                className
              )}
              ref={ref}
              {...props}
            />
            {(trailingIcon || variant === 'warning' || variant === 'success') && (
              <span
                className={`pointer-events-none absolute inset-y-0 right-2 flex items-center gap-2 ${props.disabled ? 'opacity-15' : ''}`}
              >
                {getTrailingIcon()}
                {trailingIcon && trailingIcon}
              </span>
            )}
          </div>
          {helperText && <p className={`text-body-md ${getHelperTextColor()}`}>{helperText}</p>}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
