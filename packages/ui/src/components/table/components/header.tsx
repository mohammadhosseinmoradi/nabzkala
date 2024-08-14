import { ComponentProps, forwardRef } from "react";
import { cn } from "@repo/hooks-and-utils";

type HeaderProps = ComponentProps<"thead">;

const Header = forwardRef<HTMLTableSectionElement, HeaderProps>(
  ({ className, ...otherProps }, ref) => {
    return <thead {...otherProps} ref={ref} className={cn("", className)} />;
  },
);

Header.displayName = "Header";

export { Header };
