'use client';

import * as React from 'react';

import { cn } from '~/lib/utils';
import { Label } from './label';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & {
    label?: string;
  }
>(({ className, onChange, value, ...props }, ref) => {
  const [length, setLength] = React.useState(0);

  React.useEffect(() => {
    if (typeof value === 'string') {
      setLength(value.length);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-start gap-1">
      <Label htmlFor={props.id} disabled={props.disabled}>
        {props.label}
      </Label>
      <textarea
        className={cn(
          'flex min-h-12 w-full resize-none gap-2 rounded border border-brown-900 bg-white py-2 pl-4 pr-2 text-body-lg placeholder:text-grey-300 hover:border-grey-500 focus:border-grey-600 focus:text-grey-800 focus:outline-none disabled:pointer-events-none disabled:bg-grey-700 disabled:text-black disabled:opacity-15 disabled:placeholder:text-black',
          className
        )}
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
      <div
        className={cn(
          'flex w-full justify-end text-label-sm font-medium',
          props.maxLength && length === props.maxLength && 'text-warning'
        )}
      >
        {length}/{props.maxLength}
      </div>
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
