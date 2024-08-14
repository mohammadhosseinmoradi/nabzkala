import { ComponentProps, forwardRef } from "react";
import { cn } from "@repo/hooks-and-utils";

export type BodyProps = ComponentProps<"tbody">;

const Body = forwardRef<HTMLTableSectionElement, BodyProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          "[&>tr]:border-b [&>tr:last-child]:border-b-0",
          "",
          className,
        )}
        {...otherProps}
      />
    );
  },
);

Body.displayName = "Body";

export { Body };
