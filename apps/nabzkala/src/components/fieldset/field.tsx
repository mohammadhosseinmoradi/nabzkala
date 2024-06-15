import { forwardRef } from "react";
import {
  Field as HeadlessField,
  FieldProps as HeadlessFieldProps,
} from "@headlessui/react";
import { cn } from "@/lib/utils/cn";
import { cva, VariantProps } from "cva";

const field = cva({
  base: "",
  variants: {
    type: {
      checkbox: "",
      switch: cn(
        "grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto] items-center gap-x-8 gap-y-1",
        "[&>[data-slot=control]]:col-start-2 [&>[data-slot=control]]:self-center",
        "[&>[data-slot=label]]:col-start-1 [&>[data-slot=label]]:row-start-1 [&>[data-slot=label]]:justify-self-start",
        "[&>[data-slot=description]]:col-start-1 [&>[data-slot=description]]:row-start-2",
        "[&_[data-slot=label]]:has-[[data-slot=description]]:font-medium",
      ),
      text: "",
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});

type FieldProps = HeadlessFieldProps<"div"> & VariantProps<typeof field>;

const Field = forwardRef<HTMLDivElement, FieldProps>((props, ref) => {
  const { className, type, ...otherProps } = props;

  return (
    <HeadlessField
      // @ts-ignore
      ref={ref}
      data-slot="field"
      className={cn(field({ type }), className)}
      {...otherProps}
    />
  );
});

Field.displayName = HeadlessField.displayName;

export { Field };
