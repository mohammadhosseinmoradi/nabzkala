import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
} from "react";

export type ListboxStateProps = {
  buttonRef?: HTMLButtonElement | null;
};

export type ListboxContextProps = {
  state: ListboxStateProps;
  setState: Dispatch<SetStateAction<ListboxStateProps>>;
};

export const ListboxContext = createContext<ListboxContextProps | null>(null);

export function useListboxContext() {
  const context = useContext(ListboxContext);
  if (!context)
    throw new Error("useListboxContext must be used within ListboxContext");
  return context;
}
