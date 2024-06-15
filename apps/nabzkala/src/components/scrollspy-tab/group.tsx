import { ReactNode, useEffect, useId, useState } from "react";
import {
  initialStateValue,
  StateProps,
  TabContext,
} from "src/components/scrollspy-tab/context";

type GroupProps = {
  className?: string;
  children: ReactNode;
  /**
   * Number between 0 and 1 indicating the percentage that should be visible before triggering. Can also be an array of numbers, to create multiple trigger points.
   */
  threshold?: number;
  /**
   * Offset top from the root.
   */
  offsetTop?: number;
};

export default function Group({
  className,
  threshold,
  offsetTop,
  ...otherProps
}: GroupProps) {
  const [state, dispatch] = useState<StateProps>({
    ...initialStateValue,
    id: useId(),
    threshold: threshold ? threshold : initialStateValue.threshold,
    offsetTop: offsetTop ? offsetTop : initialStateValue.offsetTop,
  });

  useEffect(() => {
    dispatch((prevState) => ({
      ...prevState,
      threshold: threshold ? threshold : prevState.threshold,
      offsetTop: offsetTop ? offsetTop : prevState.offsetTop,
    }));
  }, [threshold, offsetTop]);

  return (
    <TabContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div
        {...otherProps}
        id="root"
        className={`flex max-h-96 flex-col overflow-auto bg-neutral-800 ${className}`}
      />
    </TabContext.Provider>
  );
}
