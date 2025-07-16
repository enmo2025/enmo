'use client';

import { cva, VariantProps } from 'class-variance-authority';
import { CheckCircleIcon, ChevronDown, Info } from 'lucide-react';
import * as React from 'react';

import { cn } from '~/lib/utils';

const selectVariants = cva(
  'flex min-h-12 w-full bg-white py-2 pl-4 pr-20 gap-2 text-body-lg placeholder:text-grey-300 focus:outline-none focus:text-grey-800 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border border-grey-200 hover:border-grey-500 focus:border-grey-600 disabled:bg-grey-700 disabled:text-black disabled:placeholder:text-black disabled:opacity-15 disabled:pointer-events-none',
        warning: 'border border-warning',
        success: 'border border-success',
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

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  asChild?: boolean;
  label?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, variant, typeStyle, helperText, leadingIcon, placeholder, children, ...props }, ref) => {
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
      <div className="flex flex-col items-start gap-1">
        <label
          htmlFor={props.id}
          className={`text-title-md font-bold text-black ${props.disabled ? 'pointer-events-none opacity-15' : ''}`}
        >
          {label}
        </label>
        <div className="relative w-full">
          {leadingIcon && <span className="absolute inset-y-0 left-2 flex items-center gap-2">{leadingIcon}</span>}
          <select
            className={cn(selectVariants({ variant, typeStyle, className }), leadingIcon ? 'pl-10' : '', className)}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="text-grey-300">
                {placeholder}
              </option>
            )}
            {children}
          </select>

          <span
            className={`pointer-events-none absolute inset-y-0 right-4 flex items-center gap-2 ${props.disabled ? 'opacity-15' : ''}`}
          >
            {getTrailingIcon()}
            <ChevronDown className="h-5 w-5 text-grey-700" />
          </span>
        </div>
        {helperText && <p className={`text-body-md ${getHelperTextColor()}`}>{helperText}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export { Select };
