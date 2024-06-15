import { Description } from "@headlessui/react";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ShortcutProps = Omit<
  ComponentPropsWithoutRef<typeof Description>,
  "children"
> & {
  keys: string;
};

const Shortcut = forwardRef<ComponentRef<typeof Description>, ShortcutProps>(
  ({ className, keys, ...otherProps }, ref) => (
    <Description
      ref={ref}
      as="kbd"
      className={cn(
        "col-start-5 row-start-1 flex justify-self-end text-neutral-500",
        className,
      )}
      {...otherProps}
    >
      {keys.split("").map((key, index) => {
        return (
          <kbd
            key={index}
            className="min-w-[2ch] text-center font-sans capitalize text-zinc-400 group-data-[focus]:text-white"
          >
            {key}
          </kbd>
        );
      })}
    </Description>
  ),
);

Shortcut.displayName = Description.displayName;

export { Shortcut };
