import { forwardRef } from "react";
import {
  Label as HeadlessLabel,
  LabelProps as HeadlessLabelProps,
} from "@headlessui/react";
import { cn } from "@/lib/utils/cn";
import { cva, VariantProps } from "cva";

const label = cva({
  base: "",
});

type LabelProps = HeadlessLabelProps<"label"> & VariantProps<typeof label>;

const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { className, ...otherProps } = props;

  return (
    <HeadlessLabel
      ref={ref}
      data-slot="label"
      className={cn(label({}), className)}
      {...otherProps}
    />
  );
});

Label.displayName = HeadlessLabel.displayName;

export { Label };
