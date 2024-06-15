import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Actions = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...otherProps }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="actions"
        className={cn(
          "shrink-0",
          "flex flex-col gap-3 lg:flex-row-reverse lg:justify-start",
          className,
        )}
        {...otherProps}
      />
    );
  },
);

Actions.displayName = "Actions";

export { Actions };
