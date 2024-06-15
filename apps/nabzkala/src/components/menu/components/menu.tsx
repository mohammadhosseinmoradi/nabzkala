import { Menu as _Menu, MenuProps as _MenuProps } from "@headlessui/react";
import { MenuContext } from "@/components/menu/context";

type PopoverProps = {
  snapPoint?: string;
} & _MenuProps;

export function Menu({ snapPoint, children, ...otherProps }: PopoverProps) {
  return (
    <_Menu {...otherProps}>
      {({ close }) => (
        <MenuContext.Provider
          value={{
            snapPoint,
            close,
          }}
        >
          {/* @ts-ignore */}
          {children}
        </MenuContext.Provider>
      )}
    </_Menu>
  );
}
