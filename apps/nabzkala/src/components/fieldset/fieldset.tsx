import {
  Fieldset as HeadlessFieldset,
  FieldsetProps as HeadlessFieldsetProps,
} from "@headlessui/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { cva, VariantProps } from "cva";

const fieldset = cva({
  base: "",
});

export type FieldsetProps = HeadlessFieldsetProps<"fieldset"> &
  VariantProps<typeof fieldset>;

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (props, ref) => {
    const { className, ...otherProps } = props;

    return (
      <HeadlessFieldset
        // @ts-ignore
        ref={ref}
        className={cn(fieldset({}), className)}
        {...otherProps}
      />
    );
  },
);

Fieldset.displayName = HeadlessFieldset.displayName;

export { Fieldset };
