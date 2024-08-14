import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@repo/hooks-and-utils";

const Title = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"h3">>(
  ({ className, ...otherProps }, ref) => {
    return (
      <h3
        data-slot="title"
        ref={ref}
        className={cn("text-base/6 font-bold", className)}
        {...otherProps}
      />
    );
  },
);

Title.displayName = "Title";

export { Title };
