import { ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useDrawerContext } from "@/components/drawer";

const Header = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...otherProps }, ref) => {
    const drawer = useDrawerContext();

    return (
      <div
        ref={(_ref) => {
          if (drawer?.dragHandler) {
            drawer.dragHandler.setNodeRef(_ref);
          }
          if (typeof ref === "function") ref && ref(_ref);
        }}
        data-slot="header"
        className={cn(
          "relative",
          "[&>[data-slot=description]]:text-sm [&>[data-slot=title]+[data-slot=description]]:mt-1.5",
          className,
        )}
        {...drawer?.dragHandler?.listeners}
        {...drawer?.dragHandler?.attributes}
        {...otherProps}
      >
        <div className="absolute top-2 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-neutral-400 lg:hidden" />
        {children}
      </div>
    );
  },
);

Header.displayName = "Header";

export { Header };
