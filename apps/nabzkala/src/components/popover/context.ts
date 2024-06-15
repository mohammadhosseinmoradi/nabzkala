import { createContext, useContext } from "react";

export type PopoverContextProps = {
  snapPoint?: string;
};

export const PopoverContext = createContext<PopoverContextProps | null>(null);

export function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("Not found parent Popover");
  return context;
}
