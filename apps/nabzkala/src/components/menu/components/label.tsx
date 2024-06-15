import { Label as _Label, LabelProps } from "@headlessui/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...otherProps }, ref) => (
    <_Label
      ref={ref}
      className={cn("col-start-2 row-start-1 text-start", className)}
      {...otherProps}
    />
  ),
);

Label.displayName = _Label.displayName;

export { Label };
