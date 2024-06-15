"use client";

import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import { ComponentRef, ElementType, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "cva";
import { forwardRefWithAs, HasDisplayName, RefProp } from "@/lib/utils/render";

const button = cva({
  base: "rounded-xl",
  variants: {
    outlined: {
      true: "",
      false: "",
    },
    plain: {
      true: "",
      false: "",
    },
    color: {
      primary: "",
      secondary: "",
      accent: "",
      error: "",
      warning: "",
    },
    size: {
      sm: "",
      md: "px-4 py-2 text-sm",
      lg: "",
    },
  },
  compoundVariants: [
    {
      outlined: false,
      plain: false,
      color: "primary",
      className: "bg-blue-500 text-white",
    },

    {
      outlined: true,
      plain: false,
      color: "secondary",
      className: "bg-white border border-neutral-200 text-neutral-800",
    },
  ],
  defaultVariants: {
    outlined: false,
    plain: false,
    color: "primary",
    size: "md",
  },
});

type DEFAULT_BUTTON_TAG = "button";

export type ButtonProps<TTag extends ElementType = DEFAULT_BUTTON_TAG> =
  HeadlessButtonProps<TTag> & VariantProps<typeof button>;

function ButtonFn<TTag extends ElementType = DEFAULT_BUTTON_TAG>(
  props: ButtonProps<TTag>,
  ref: Ref<ComponentRef<TTag>>,
) {
  const {
    outlined,
    plain,
    color,
    size,
    className,
    type = "button",
    ...otherProps
  } = props as ButtonProps<"button">;

  return (
    <HeadlessButton
      ref={ref as Ref<HTMLButtonElement>}
      data-slot="button"
      className={cn(
        button({
          outlined,
          plain,
          color,
          size,
        }),
        className,
      )}
      type={type}
      {...otherProps}
    />
  );
}

interface _internal_ComponentButton extends HasDisplayName {
  <TTag extends ElementType = DEFAULT_BUTTON_TAG>(
    props: ButtonProps<TTag> & RefProp<typeof ButtonFn<TTag>>,
  ): ReactNode;
}

/**
 * Button component.
 *
 * @example
 * // Example usage of Button component
 * <Button>Button</Button>
 * // or, render Button as Link component
 * <Button as={Link}>Button</Button>
 *
 * @param {ButtonProps} props The props of the component.
 * @param {number} props.outlined - The second number.
 */
const Button = forwardRefWithAs(
  ButtonFn,
) as unknown as _internal_ComponentButton;

export { Button };
