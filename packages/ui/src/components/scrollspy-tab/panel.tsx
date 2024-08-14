import { forwardRef, ReactNode } from "react";
import { useTabContext } from "@/components/scrollspy-tab/context";

type PanelProps = {
  className?: string;
  children: ReactNode;
  index?: number;
};

function Panel({ className, index, ...otherProps }: PanelProps, ref: any) {
  const { state } = useTabContext();
  return (
    <div
      id={state.id + index}
      ref={ref}
      {...otherProps}
      className={`flex flex-col ${className}`}
    />
  );
}

export default (<T extends typeof Panel>(): T => {
  return forwardRef(Panel as any) as any;
})();
