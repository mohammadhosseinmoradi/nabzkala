import { ComponentProps, ElementType, ReactNode } from "react";
import { render } from "@/lib/utils/render";
import { useDialogContext } from "@/components/dialog/context";

export type ButtonRenderArgs = {
  open: boolean;
};

type OurProps<T extends ElementType = "button"> = {
  as?: T;
  children?: ReactNode | ((args: ButtonRenderArgs) => ReactNode);
};

export type ButtonProps<T extends ElementType = "button"> = Omit<
  ComponentProps<T>,
  keyof OurProps<T>
> &
  OurProps<T>;

export function Button<T extends ElementType = "button">({
  as,
  ...otherProps
}: ButtonProps<T>) {
  const Component = as || "button";

  const {
    state: { open, onOpenChange },
  } = useDialogContext();

  return render({
    ourProps: {
      onClick: () => {
        onOpenChange(!open);
      },
    } as any,
    theirProps: otherProps,
    defaultTag: Component,
    slot: {
      open,
    },
    name: "Button",
  });
}
