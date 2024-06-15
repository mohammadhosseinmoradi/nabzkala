"use client";

import { ListboxOption, ListboxOptionProps } from "@headlessui/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Option = forwardRef<HTMLButtonElement, ListboxOptionProps<"button">>(
  (props, ref) => {
    const { className, as = "button", children, ...otherProps } = props;
    return (
      <ListboxOption
        ref={ref}
        as={as}
        className={cn(
          "group/option cursor-default rounded-lg py-2.5 px-3.5 focus:outline-none",
          "text-left text-base/6 lg:py-1.5 lg:px-3",
          "text-zinc-950 lg:text-sm/6 dark:text-white",
          "data-[focus]:bg-blue-500 data-[focus]:text-white forced-colors:text-[CanvasText]",
          "col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] forced-color-adjust-none data-[disabled]:opacity-50",
          "items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
          "[&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1",
          "[&>[data-slot=icon]]:ml-2.5 [&>[data-slot=icon]]:size-5 lg:[&>[data-slot=icon]]:ml-2",
          "[&>[data-slot=icon]]:lg:size-4",
          "[&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focus]:text-white",
          className,
        )}
        {...otherProps}
      >
        {/* @ts-ignore */}
        {children}
      </ListboxOption>
    );
  },
);

Option.displayName = ListboxOption.displayName;

export { Option };
