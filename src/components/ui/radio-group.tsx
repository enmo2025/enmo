'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '~/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    title?: string;
  }
>(({ className, title, ...props }, ref) => {
  const baseClasses =
    'aspect-square h-5 w-5 rounded-full border-2 focus:outline-none border-red-600 bg-red-50 hover:ring-2 hover:ring-red-100 hover:bg-radio-default';

  const checkedClasses =
    'data-[state=checked]:bg-radio-default data-[state=checked]:border-red-600 data-[state=checked]:border-[1px]';

  const disabledClasses = `disabled:bg-grey-100 disabled:border-grey-200 disabled:border-[1px] disabled:pointer-events-none disabled:cursor-not-allowed
                           disabled:data-[state=checked]:bg-grey-100 disabled:data-[state=checked]:border-grey-200 disabled:data-[state=checked]:border-[1px]`;

  return (
    <div className="flex items-center gap-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(baseClasses, checkedClasses, disabledClasses, className)}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle
            className={`h-3 w-3 ${props.disabled ? 'fill-grey-200 text-grey-200' : 'fill-red-600 text-red-600'}`}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <label
        className={`text-body-lg text-black hover:cursor-pointer hover:text-red-600 ${props.disabled ? 'text-grey-200' : ''}`}
        htmlFor={props.id}
      >
        {title}
      </label>
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
