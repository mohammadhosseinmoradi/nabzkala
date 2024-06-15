import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CellProps = ComponentProps<"td">;

const Cell = forwardRef<HTMLTableCellElement, CellProps>(
  ({ className, ...otherProps }, ref) => {
    return <td {...otherProps} ref={ref} className={cn("py-2 px-4")} />;
  },
);

Cell.displayName = "Cell";

export { Cell };
