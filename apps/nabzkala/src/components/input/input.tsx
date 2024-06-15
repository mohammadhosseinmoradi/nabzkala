"use client";

import { Input as _Input, InputProps } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <_Input
        // @ts-ignore
        ref={ref}
        {...otherProps}
        className={cn(
          "relative",
          "rounded-lg border text-sm/6 font-medium text-neutral-600",
          "py-1.5 px-3",
          "bg-white",
          "focus:ring-2 focus:ring-blue-500 focus:ring-inset",
          className,
        )}
      />
    );
  },
);

Input.displayName = _Input.displayName;

export { Input };
