import { forwardRef } from "react";
import { ListboxButton, ListboxButtonProps } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { useListboxContext } from "@/components/listbox/context";

const Button = forwardRef<HTMLButtonElement, ListboxButtonProps<"button">>(
  (props, ref) => {
    const { className, ...otherProps } = props;
    const { setState } = useListboxContext();
    return (
      <ListboxButton
        ref={(_ref) => {
          if (typeof ref === "function") {
            ref(_ref);
          }
          setState({
            buttonRef: _ref,
          });
        }}
        className={cn("rounded-lg bg-blue-200 py-2 px-4 text-base lg:text-sm")}
        {...otherProps}
      />
    );
  },
);

Button.displayName = ListboxButton.displayName;

export { Button };
