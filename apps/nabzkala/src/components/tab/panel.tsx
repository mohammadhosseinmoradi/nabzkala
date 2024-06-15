import { TabPanel as HeadlessTabPanel, TabPanelProps } from "@headlessui/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Panel = forwardRef<HTMLDivElement, TabPanelProps<"div">>((props, ref) => {
  const { className, unmount, ...otherProps } = props;

  return (
    <HeadlessTabPanel
      static
      ref={ref}
      className={cn("w-full", className)}
      {...otherProps}
    />
  );
});

Panel.displayName = HeadlessTabPanel.displayName;

export { Panel };
