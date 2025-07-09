import { cva, VariantProps } from "class-variance-authority";
import { CheckCircleIcon, Info } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";

const inputVariants = cva(
  "flex min-h-12 w-full bg-white py-2 pl-4 pr-2 gap-2 text-body-lg placeholder:text-grey-300 focus:outline-none focus:text-grey-800",
  {
    variants: {
      variant: {
        default: "border border-grey-200 hover:border-grey-500 focus:border-grey-600 disabled:bg-grey-700 disabled:text-black disabled:placeholder:text-black disabled:opacity-15 disabled:pointer-events-none",
        warning: "border border-warning",
        success: "border border-success",
      },
      typeStyle: {
        pill: "rounded-full",
        round: "rounded",
      }
    },
    defaultVariants: {
      variant: "default",
      typeStyle: "round",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  asChild?: boolean;
  label?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, variant, typeStyle, helperText, leadingIcon, trailingIcon, ...props }, ref) => {

    const getTrailingIcon = () => {
      if (variant === "warning") return <Info className="w-5 h-5 text-warning" />;
      if (variant === "success") return <CheckCircleIcon className="w-5 h-5 text-success" />;
      return null;
    };

    const getHelperTextColor = () => {
      if (variant === "warning") return "text-warning";
      if (variant === "success") return "text-success text-body-sm";
      if (props.disabled) return "text-grey-400";
      return "text-grey-600";
    };

    return (
      <div className="flex flex-col gap-1 items-start">
        <label htmlFor={props.id} className={`text-title-md text-black font-bold ${props.disabled ? "opacity-15 pointer-events-none" : ""}`}>{label}</label>
        <div className="relative w-full">
          {leadingIcon && <span className="absolute inset-y-0 left-2 flex gap-2 items-center">{leadingIcon}</span>}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, typeStyle, className }),
              trailingIcon || variant !== "default" ? "pr-10" : "",
              leadingIcon ? "pl-10" : "",
              className,
            )}
            ref={ref}
            {...props}
          />
          {(trailingIcon || variant === "warning" || variant === "success") && (
            <span className={`absolute inset-y-0 right-2 flex gap-2 items-center ${props.disabled ? "opacity-15 pointer-events-none" : ""}`}>
              {getTrailingIcon()}
              {trailingIcon && trailingIcon}
            </span>
          )}  
        </div>
        {helperText && <p className={`text-body-md ${getHelperTextColor()}`}>{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
