import {
  Button as HeadlessButton,
  ButtonProps as HeadlessButtonProps,
} from "@headlessui/react";
import { ComponentRef, ElementType, ReactNode, Ref } from "react";
import { cva, VariantProps } from "cva";
import {
  cn,
  forwardRefWithAs,
  HasDisplayName,
  RefProp,
} from "@repo/hooks-and-utils";

const button = cva({
  base: cn(
    "relative flex gap-2 justify-center items-center rounded-lg",
    "transition-colors data-[focus]:ring-2 focus:ring-offset-2 select-none",

    // If loading indicator is child
    "[&>*[data-slot=loading]]:flex",
    "[&>*[data-slot=loading]]:items-center [&>*[data-slot=loading]]:justify-center",
    "[&>*[data-slot=loading]]:absolute",
    "[&>*[data-slot=loading]]:inset-0",
    // Hidden all button content expect loading indicator
    "has-[[data-slot=loading]]:[text-indent:-1000vw]",
    "[&:has([data-slot=loading])>*]:hidden",
  ),
  variants: {
    filledTonal: {
      true: "",
      false: "",
    },
    outlined: {
      true: "",
      false: "",
    },
    plain: {
      true: "",
      false: "",
    },
    disabled: {
      true: "bg-neutral-400 text-white",
      false: "",
    },
    color: {
      primary: "",
      secondary: "",
      complementary: "",
      complementary2: "",
      error: "",
      warning: "",
      neutral: "",
    },
    size: {
      sm: "px-3 py-2 text-xs [&>[data-slot=icon]]:size-5",
      md: "px-4 py-3 text-sm",
      lg: "px-5 py-4 text-base",
    },
  },
  compoundVariants: [
    {
      filledTonal: false,
      outlined: false,
      plain: false,
      disabled: false,
      color: "primary",
      className: "bg-primary text-white focus:ring-primary",
    },
    {
      filledTonal: false,
      outlined: false,
      plain: false,
      disabled: false,
      color: "secondary",
      className: "bg-secondary-500 text-white focus:ring-secondary",
    },
    {
      filledTonal: false,
      outlined: false,
      plain: false,
      disabled: false,
      color: "warning",
      className: "bg-yellow text-white focus:ring-warning",
    },
    {
      filledTonal: false,
      outlined: false,
      plain: false,
      disabled: false,
      color: "complementary2",
      className: "bg-complementary2-200 text-neutral-700 focus:ring-warning",
    },
    {
      filledTonal: false,
      outlined: false,
      plain: false,
      disabled: false,
      color: "complementary",
      className: "bg-complementary text-neutral-700 focus:ring-warning",
    },
    {
      filledTonal: false,
      outlined: false,
      plain: false,
      disabled: false,
      color: "neutral",
      className: "bg-neutral-50 text-black-1 focus:ring-warning shadow-sm",
    },

    // filledTonal
    {
      filledTonal: true,
      outlined: false,
      plain: false,
      disabled: false,
      color: "primary",
      className:
        "bg-primary/10 hover:bg-primary/20 text-primary focus:ring-primary",
    },
    {
      filledTonal: true,
      outlined: false,
      plain: false,
      disabled: false,
      color: "secondary",
      className:
        "bg-secondary/10 hover:bg-secondary/20 text-secondary focus:ring-secondary",
    },
    {
      filledTonal: true,
      outlined: false,
      plain: false,
      disabled: false,
      color: "secondary",
      className:
        "bg-secondary/10 hover:bg-secondary/20 text-accent focus:ring-secondary",
    },

    // outlined
    {
      filledTonal: false,
      outlined: true,
      plain: false,
      disabled: false,
      color: "primary",
      className:
        "bg-white hover:bg-neutral-50 text-primary border border-primary focus:ring-primary",
    },

    {
      filledTonal: false,
      outlined: true,
      plain: false,
      disabled: false,
      color: "secondary",
      className:
        "bg-white hover:bg-neutral-50 text-secondary border border-secondary focus:ring-secondary",
    },
    {
      filledTonal: false,
      outlined: true,
      plain: false,
      disabled: false,
      color: "primary",
      className:
        "bg-white hover:bg-primary-50 text-primary border border-primary focus:ring-primary",
    },
    {
      filledTonal: false,
      outlined: true,
      plain: false,
      disabled: true,
      className:
        "bg-white text-neutral-300 border border-neutral-300 focus:ring-primary cursor-not-allowed",
    },

    // plain
    {
      filledTonal: false,
      outlined: false,
      plain: true,
      disabled: false,
      color: "warning",
      className: "hover:bg-warning-50 text-warning-500 focus:ring-warning",
    },
    {
      filledTonal: false,
      outlined: false,
      plain: true,
      disabled: false,
      color: "secondary",
      className:
        "hover:bg-secondary-50 text-secondary-500 focus:ring-secondary",
    },

    {
      filledTonal: false,
      outlined: false,
      plain: true,
      disabled: true,
      className: "text-secondary-300",
    },
  ],
  defaultVariants: {
    filledTonal: false,
    outlined: false,
    plain: false,
    color: "primary",
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
    filledTonal,
    outlined,
    plain,
    disabled = false,
    color = "primary",
    size = "md",
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
          filledTonal,
          outlined,
          plain,
          disabled,
          color,
          size,
        }),
        className,
      )}
      disabled={disabled}
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
 * @param {number} props.outlined - Whether to use the outline button style.
 * @param {number} props.plain - Whether to use the outline button style.
 * @param {number} props.color - The color variant the button should use.
 * @param {number} props.size - The size variant the button should use.
 */
const Button = forwardRefWithAs(
  ButtonFn,
) as unknown as _internal_ComponentButton;

export { Button };
