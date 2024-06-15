import { forwardRef } from "react";
import {
  Description as HeadlessDescription,
  DescriptionProps as HeadlessDescriptionProps,
} from "@headlessui/react";
import { cva, VariantProps } from "cva";
import { cn } from "@/lib/utils";

const description = cva({
  base: "",
});

export type DescriptionProps = HeadlessDescriptionProps<"p"> &
  VariantProps<typeof description>;

const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  (props, ref) => {
    const { className, ...otherProps } = props;

    return (
      <HeadlessDescription
        ref={ref}
        data-slot="description"
        className={cn(description({}), className)}
        {...otherProps}
      />
    );
  },
);

Description.displayName = HeadlessDescription.displayName;

export { Description };
