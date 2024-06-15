import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ColumnHeaderCell = ComponentProps<"th">;

const ColumnHeaderCell = forwardRef<HTMLTableCellElement, ColumnHeaderCell>(
  ({ className, ...otherProps }, ref) => {
    return (
      <th
        {...otherProps}
        ref={ref}
        className={cn("py-2 px-4 font-normal text-neutral-500", className)}
      />
    );
  },
);

ColumnHeaderCell.displayName = "ColumnHeaderCell";

export { ColumnHeaderCell };
