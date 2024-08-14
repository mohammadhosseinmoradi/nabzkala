import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useDialogContext } from "@/components/dialog/context";
import { cn } from "@repo/hooks-and-utils";

const Header = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...otherProps }, ref) => {
    const {
      state: { bodyScrollState },
    } = useDialogContext();

    return (
      <div
        ref={ref}
        data-slot="header"
        className={cn(
          "relative z-20",
          "px-6 pb-4 pt-6",
          "transition [&>[data-slot=description]]:text-sm [&>[data-slot=title]+[data-slot=description]]:mt-1.5",
          {
            "shadow-lg":
              !!bodyScrollState?.isScrolled && !bodyScrollState?.isBeginning,
          },
          className,
        )}
        {...otherProps}
      >
        <div className="absolute left-1/2 top-2 h-1 w-6 -translate-x-1/2 rounded-full bg-neutral-400 lg:hidden" />
        {children}
      </div>
    );
  },
);

Header.displayName = "Header";

export { Header };
