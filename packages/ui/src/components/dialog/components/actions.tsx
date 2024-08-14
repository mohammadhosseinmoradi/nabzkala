import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@repo/hooks-and-utils";

const Actions = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...otherProps }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="actions"
        className={cn(
          "shrink-0 bg-white",
          "flex flex-col gap-3 lg:flex-row-reverse lg:justify-start",
          "px-6 pb-6 pt-6",
          className,
        )}
        {...otherProps}
      />
    );
  },
);

Actions.displayName = "Actions";

export { Actions };
