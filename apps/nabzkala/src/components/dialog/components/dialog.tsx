import { ReactNode, useState } from "react";
import useUpdateEffect from "@/hooks/use-update-effect";
import { DialogContext, DialogStateProps } from "@/components/dialog/context";

type DialogCommonProps = {
  children: ReactNode;
  snapPoint?: string;
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

export default function Dialog({ children, ...otherProps }: DialogProps) {
  const [state, setState] = useState<DialogStateProps>({
    open: otherProps.open !== undefined ? otherProps.open : false,
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
