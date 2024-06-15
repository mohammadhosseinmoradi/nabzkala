import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Body = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...otherProps }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="body"
        className={cn("overflow-y-auto py-4 px-6", className)}
        {...otherProps}
      />
    );
  },
);

Body.displayName = "Body";

export { Body };
