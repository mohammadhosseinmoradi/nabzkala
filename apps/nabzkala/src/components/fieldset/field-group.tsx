import { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { cva, VariantProps } from "cva";

const fieldGroup = cva({
  base: "",
});

type FieldGroupProps = ComponentProps<"div"> & VariantProps<typeof fieldGroup>;

const FieldGroup = forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="control"
        className={cn(fieldGroup({}), className)}
        {...otherProps}
      />
    );
  },
);

FieldGroup.displayName = "FieldGroup";

export { FieldGroup };
