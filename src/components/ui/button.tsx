import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex w-fit items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-red-500 text-red-900 hover:bg-red-300 hover:text-red-700 disabled:bg-grey-100 disabled:text-grey-500 focus:bg-red-900 focus:text-red-200",
        outline: "border border-brown-700 text-brown-700 hover:bg-yellow-200 hover:text-yellow-700 hover:border-brown-500 disabled:text-grey-400 disabled:border-grey-200",
        ghost: "bg-transparent text-brown-700 hover:bg-yellow-100 hover:text-brown-600 disabled:text-grey-400",
        link: "bg-transparent text-brown-700 hover:text-brown-600 hover:underline disabled:text-grey-400",
      },
      typeStyle: {
        pill: "rounded-full",
        round: "",
      },
      size: {
        sm: "px-4 py-[3px] text-body-sm [&_svg]:w-4 [&_svg]:h-4",
        md: "px-5 py-[5.5px] text-body-md [&_svg]:w-[18px] [&_svg]:h-[18px]",
        lg: "px-6 py-2 text-body-lg [&_svg]:w-5 [&_svg]:h-5",
        xl: "px-10 py-4 text-title-lg font-bold [&_svg]:w-6 [&_svg]:h-6",
      },
    },
    compoundVariants: [
      {
        typeStyle: "round",
        size: ["sm", "md"],
        class: "rounded", 
      },
      {
        typeStyle: "round",
        size: ["lg", "xl"],
        class: "rounded-lg",
      },
    ],
    defaultVariants: {
      variant: "solid",
      size: "md",
      typeStyle: "pill",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      typeStyle,
      asChild = false,
      leadingIcon,
      trailingIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, typeStyle, className }))}
        ref={ref}
        {...props}
      >
        {leadingIcon && (
          <span className="mr-2 flex items-center">{leadingIcon}</span>
        )}
        {children}
        {trailingIcon && (
          <span className="ml-2 flex items-center">{trailingIcon}</span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
