import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type BodyProps = ComponentProps<"tbody">;

const Body = forwardRef<HTMLTableSectionElement, BodyProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <tbody
        {...otherProps}
        ref={ref}
        className={cn(
          "[&>tr]:border-b [&>tr:last-child]:border-b-0",
          "",
          className,
        )}
      />
    );
  },
);

Body.displayName = "Body";

export { Body };
