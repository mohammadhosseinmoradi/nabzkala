import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

type RowProps = ComponentProps<"tr">;

const Row = forwardRef<HTMLTableRowElement, RowProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <tr
        {...otherProps}
        ref={ref}
        className={cn("border-neutral-200", className)}
      />
    );
  },
);

Row.displayName = "Row";

export { Row };
