import { TabGroup as HeadlessTabGroup, TabGroupProps } from "@headlessui/react";
import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { TabContext } from "./context";
import { useControllable } from "@/hooks/use-controllable";

const Group = forwardRef<HTMLDivElement, TabGroupProps<"div">>((props, ref) => {
  const {
    className,
    selectedIndex,
    defaultIndex = 0,
    onChange,
    as = "div",
    ...otherProps
  } = props;

  const [selected, onSelectedChange] = useControllable(
    selectedIndex,
    onChange,
    defaultIndex,
  );

  const id = useId();

  return (
    <TabContext.Provider
      value={{
        id,
        selectedIndex: selected,
        onChange: onSelectedChange,
      }}
    >
      <HeadlessTabGroup
        as={as}
        ref={ref}
        className={cn("flex flex-col", className)}
        selectedIndex={selected}
        onChange={onSelectedChange}
        {...otherProps}
      />
    </TabContext.Provider>
  );
});

Group.displayName = HeadlessTabGroup.displayName;

export { Group };
