import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type StateProps = {
  activeIndex: number;
  id: string;
  /**
   * Number between 0 and 1 indicating the percentage that should be visible before triggering. Can also be an array of numbers, to create multiple trigger points.
   */
  threshold: number;
  /**
   * Offset top from the root.
   */
  offsetTop: number;
};

export type ContextProps = {
  state: StateProps;
  dispatch: Dispatch<SetStateAction<StateProps>>;
};

export const initialStateValue: StateProps = {
  activeIndex: 0,
  id: "",
  threshold: 0,
  offsetTop: 0,
};

export const TabContext = createContext<ContextProps>({
  state: initialStateValue,
  dispatch: () => {},
});

export function useTabContext() {
  return useContext(TabContext);
}
