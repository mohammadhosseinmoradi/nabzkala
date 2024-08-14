import { forwardRef } from "react";
import { Checkbox as HeadlessCheckbox, CheckboxProps } from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import { cva } from "cva";
import { cn } from "@repo/hooks-and-utils";

const checkbox = cva({
  base: "flex justify-center items-center border-2 rounded size-4 cursor-pointer",
  variants: {
    color: {
      primary: "",
    },
    disabled: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      disabled: false,
      className: cn(
        "border-primary-500",
        "data-[checked]:bg-primary-500 data-[checked]:text-white",
        // data-slot=check
        "[&>[data-slot=check]]:hidden",
        "[&>[data-slot=check]]:text-primary-300",
        "[&:hover>[data-slot=check]]:flex",
        "[&[data-checked]>[data-slot=check]]:flex",
        "[&[data-checked]>[data-slot=check]]:text-white",
      ),
    },
    {
      disabled: true,
      className: cn(
        "border-neutral-400 cursor-not-allowed",
        "data-[checked]:bg-neutral-400 data-[checked]:text-white",
        // data-slot=check
        "[&>[data-slot=check]]:hidden",
        "[&[data-checked]>[data-slot=check]]:flex",
        "[&[data-checked]>[data-slot=check]]:text-white",
      ),
    },
  ],
  defaultVariants: {
    color: "primary",
    disabled: false,
  },
});

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps<"button">>(
  (props, ref) => {
    const { className, disabled, as = "button", ...otherProps } = props;

    return (
      <HeadlessCheckbox
        ref={ref}
        as={as}
        className={cn(
          checkbox({
            disabled,
          }),
          className,
        )}
        disabled={disabled}
        {...otherProps}
      >
        <CheckIcon data-slot="check" className="size-3.5 stroke-[2.5px]" />
      </HeadlessCheckbox>
    );
  },
);

Checkbox.displayName = HeadlessCheckbox.displayName;

export { Checkbox };
