import {
  ListboxOptions,
  Transition,
  ListboxOptionsProps,
} from "@headlessui/react";
import { forwardRef, Fragment, ReactNode } from "react";
import { cn } from "@/lib/utils";

const Options = forwardRef<HTMLDivElement, ListboxOptionsProps<"div">>(
  (props, ref) => {
    const { anchor, className, children, ...otherProps } = props;

    return (
      <Transition>
        <ListboxOptions
          ref={ref}
          anchor={{
            gap: "1rem",
            to: "selection",
            padding: "1.5rem",
            ...anchor,
          }}
          modal
          as={Fragment}
          {...otherProps}
        >
          <Transition.Child
            ref={ref}
            as="div"
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-100 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={cn(
              "p-1",
              "min-w-[calc(var(--button-width)+1.75rem)] bg-red-500",
              "[--anchor-offset:-10rem] [--anchor-padding:4rem] sm:[--anchor-offset:-10.375rem]",
              "z-50 flex flex-col overflow-hidden rounded-xl border bg-white shadow",
              className,
            )}
          >
            {children as ReactNode}
          </Transition.Child>
        </ListboxOptions>
      </Transition>
    );
  },
);

Options.displayName = ListboxOptions.displayName;

export { Options };
