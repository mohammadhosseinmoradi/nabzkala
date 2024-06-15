import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TabContextProps = {
  id: string;
  selectedIndex: number;
  onChange: Dispatch<SetStateAction<number>>;
};

export const TabContext = createContext<TabContextProps | null>(null);

export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) throw new Error("useTabContext must be used within TabContext");
  return context;
}
