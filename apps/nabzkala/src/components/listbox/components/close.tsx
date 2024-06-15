"use client";

import { ButtonProps as HeadlessButtonProps } from "@headlessui/react";
import { ComponentRef, ElementType, ReactNode, Ref } from "react";
import {
  forwardRefWithAs,
  HasDisplayName,
  RefProp,
  render,
} from "@/lib/utils/render";
import { useListboxContext } from "@/components/listbox/context";

const DEFAULT_BUTTON_TAG = "button";

export type ButtonProps<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG> =
  HeadlessButtonProps<TTag>;

function CloseFn<TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
  props: ButtonProps<TTag>,
  ref: Ref<ComponentRef<TTag>>,
) {
  const {
    type = "button",
    as = DEFAULT_BUTTON_TAG,
    ...otherProps
  } = props as ButtonProps<typeof DEFAULT_BUTTON_TAG>;

  const {
    state: { buttonRef },
  } = useListboxContext();

  return render({
    ourProps: {
      // @ts-ignore
      onClick: () => {
        buttonRef?.click();
      },
    },
    // @ts-ignore
    theirProps: otherProps,
    slot: {},
    name: "Close",
    defaultTag: as,
  });
}

interface _internal_ComponentClose extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_BUTTON_TAG>(
    props: ButtonProps<TTag> & RefProp<typeof CloseFn<TTag>>,
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
const Close = forwardRefWithAs(CloseFn) as unknown as _internal_ComponentClose;

export { Close };
