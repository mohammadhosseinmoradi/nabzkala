import {
  Description as HeadlessDescription,
  DescriptionProps,
} from "@headlessui/react";
import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";
import { cva, VariantProps } from "cva";

const errorMessage = cva({
  base: "text-sm font-medium text-red-500",
});

export type ErrorMessageProps = DescriptionProps<"p"> &
  VariantProps<typeof errorMessage>;

const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  (props, ref) => {
    const { className, ...otherProps } = props;

    return (
      <HeadlessDescription
        ref={ref}
        data-slot="error"
        className={cn(errorMessage({}), className)}
        {...otherProps}
      />
    );
  },
);

ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };
