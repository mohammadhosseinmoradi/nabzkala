import { createContext, Dispatch, SetStateAction } from "react";

export type DialogStateProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snapPoint?: string;
};

export type DialogContextProps = {
  state: DialogStateProps;
  setState: Dispatch<SetStateAction<DialogStateProps>>;
};

export const DialogContext = createContext<DialogContextProps | null>(null);
