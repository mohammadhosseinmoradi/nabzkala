import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function Text({ className, ...otherProps }: ComponentProps<"p">) {
  return (
    <p
      data-slot="text"
      className={cn(
        "text-base/6 text-neutral-500 sm:text-sm/6 dark:text-neutral-400",
        className,
      )}
      {...otherProps}
    />
  );
}
