"use client";

import { MenuItem, MenuProps } from "@headlessui/react";
import { Ref } from "react";
import { cn } from "@/lib/utils";
import { forwardRefWithAs } from "@/lib/utils/render/forward-ref-with-as";

type ItemProps = MenuProps & {
  className?: string;
};

function ItemFn(
  { as = "button" as any, className, children, ...otherProps }: ItemProps,
  ref: Ref<HTMLElement> | undefined,
) {
  return (
    <MenuItem
      ref={ref}
      as={as}
      className={cn(
        "group col-span-full grid cursor-default grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center rounded-lg py-2.5 px-3.5 text-left text-base/6 text-zinc-950 forced-color-adjust-none focus:outline-none data-[focus]:bg-blue-500 data-[focus]:text-white data-[disabled]:opacity-50 supports-[grid-template-columns:subgrid]:grid-cols-subgrid lg:py-1.5 lg:px-3 lg:text-sm/6 dark:text-white forced-colors:text-[CanvasText] [&>[data-slot=icon]]:col-start-1 [&>[data-slot=icon]]:row-start-1 [&>[data-slot=icon]]:ml-2.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:text-zinc-500 [&>[data-slot=icon]]:data-[focus]:text-white lg:[&>[data-slot=icon]]:ml-2 [&>[data-slot=icon]]:lg:size-4",
        className,
      )}
      {...otherProps}
    >
      {/* @ts-ignore */}
      {children}
    </MenuItem>
  );
}

const Item = forwardRefWithAs(ItemFn);

export { Item };
