import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ScrollStateProps } from "@/components/scroll-area";

export enum DialogVariant {
  Center,
  Drawer,
}

export type DialogStateProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snapPoint?: string;
  bodyScrollState?: ScrollStateProps;
  variant: DialogVariant;
};

export type DialogContextProps = {
  state: DialogStateProps;
  setState: Dispatch<SetStateAction<DialogStateProps>>;
};

export const DialogContext = createContext<DialogContextProps | null>(null);

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("Not found dialog context provider.");
  return context;
}
