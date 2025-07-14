"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";
import { Button } from "./button";

const ToggleGroupContext = React.createContext<{
  bgActive?: string;
  colorActive?: string;
}>({});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    bgActive?: string;
    colorActive?: string;
  }
>(({ className, children, bgActive, colorActive, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ bgActive, colorActive }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
  }
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "rounded-lg flex items-center justify-center gap-2 py-4 pl-6 pr-10 !text-title-lg font-bold bg-white text-brown-900",
        context.bgActive && `data-[state=on]:bg-${context.bgActive}`,
        context.colorActive && `data-[state=on]:text-${context.colorActive}`,
        className
      )}
      {...props}
    >
       {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
