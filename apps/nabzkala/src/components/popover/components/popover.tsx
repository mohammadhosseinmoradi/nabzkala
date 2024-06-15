import {
  Popover as _Popover,
  PopoverProps as _PopoverProps,
} from "@headlessui/react";
import { PopoverContext } from "@/components/popover/context";

type PopoverProps = {
  snapPoint?: string;
} & _PopoverProps;

export function Popover({ snapPoint, ...otherProps }: PopoverProps) {
  return (
    <PopoverContext.Provider
      value={{
        snapPoint,
      }}
    >
      <_Popover {...otherProps} />
    </PopoverContext.Provider>
  );
}
