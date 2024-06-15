import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Title = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"h3">>(
  ({ className, ...otherProps }, ref) => {
    return (
      <h3
        data-slot="title"
        ref={ref}
        className={cn("text-lg/6 font-bold lg:text-base", className)}
        {...otherProps}
      />
    );
  },
);

Title.displayName = "Title";

export { Title };
