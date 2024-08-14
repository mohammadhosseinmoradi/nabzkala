import { ReactNode, useEffect, useState } from "react";
import {
  DialogContext,
  DialogStateProps,
  DialogVariant,
} from "@/components/dialog/context";
import { useUpdateEffect } from "@repo/hooks-and-utils";

type DialogCommonProps = {
  children: ReactNode;
  snapPoint?: string;
  variant?: DialogVariant;
};

export type DialogProps =
  | ({
      open: boolean;
      onOpenChange: (open: boolean) => void;
    } & DialogCommonProps)
  | ({
      open?: never;
      onOpenChange?: never;
    } & DialogCommonProps);

export default function Dialog(props: DialogProps) {
  const { children, variant, ...otherProps } = props;

  const [state, setState] = useState<DialogStateProps>({
    open: otherProps.open !== undefined ? otherProps.open : false,
    variant: variant || DialogVariant.Center,
    onOpenChange: otherProps.onOpenChange
      ? otherProps.onOpenChange
      : (open) => {
          setState((prevState) => ({
            ...prevState,
            open,
          }));
        },
  });

  useUpdateEffect(() => {
    setState((prevState) => ({
      ...prevState,
      open: otherProps.open !== undefined ? otherProps.open : prevState.open,
      onOpenChange: otherProps.onOpenChange || prevState.onOpenChange,
      snapPoint: otherProps.snapPoint || prevState.snapPoint,
    }));
  }, [otherProps.open, otherProps.onOpenChange, otherProps.snapPoint]);

  useEffect(() => {
    if (!otherProps.open) return;
    setState((prevState) => ({
      ...prevState,
      bodyScrollState: undefined,
    }));
  }, [otherProps.open]);

  return (
    <DialogContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
