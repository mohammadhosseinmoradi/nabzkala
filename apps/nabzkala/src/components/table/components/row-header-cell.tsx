import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

type RowHeaderCellProps = ComponentProps<"th">;

const RowHeaderCell = forwardRef<HTMLTableCellElement, RowHeaderCellProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <th {...otherProps} ref={ref} className={cn("py-2 px-4", className)} />
    );
  },
);

RowHeaderCell.displayName = "RowHeaderCell";

export { RowHeaderCell };
