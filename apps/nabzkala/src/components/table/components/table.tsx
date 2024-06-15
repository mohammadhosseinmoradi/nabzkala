import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

type TableProps = ComponentProps<"table">;

const Table = forwardRef<HTMLTableElement, TableProps>(function (
  { className, ...otherProps },
  ref,
) {
  return (
    <table
      {...otherProps}
      ref={ref}
      className={cn("border-collapse overflow-hidden text-sm", className)}
    />
  );
});

Table.displayName = "Table";

export { Table };
