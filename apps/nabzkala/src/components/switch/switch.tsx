import { Switch as HeadlessSwitch, SwitchProps } from "@headlessui/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    { className, as = "button", type = "button", checked, ...otherProps },
    ref,
  ) => (
    <HeadlessSwitch
      ref={ref}
      as={as}
      type={type}
      data-slot="control"
      checked={checked}
      className={cn(
        "flex w-10 shrink-0 cursor-pointer rounded-full p-1 transition-all focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black",
        {
          "bg-blue-500 focus:ring-blue-500": checked,
          "bg-neutral-200 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] hover:bg-neutral-300 focus:ring-neutral-200 dark:bg-neutral-950 dark:shadow-[inset_0_0_0px_1px_rgb(23_23_23)] dark:hover:bg-neutral-900/50 dark:focus:ring-neutral-800":
            !checked,
        },
        className,
      )}
      {...otherProps}
    >
      <span
        className={cn(
          "h-4 w-4 rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05)] transition-all duration-200 dark:bg-neutral-200",
          {
            "translate-x-4 rtl:-translate-x-4": checked,
          },
        )}
      />
    </HeadlessSwitch>
  ),
);

Switch.displayName = HeadlessSwitch.displayName;

export { Switch };
