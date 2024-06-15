import {
  PopoverPanel,
  PopoverOverlay,
  Transition,
  PopoverPanelProps,
} from "@headlessui/react";
import {
  ForwardedRef,
  forwardRef,
  Fragment,
  MouseEventHandler,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import useBreakpoint from "@/hooks/use-breakpoint";
import {
  Drawer,
  DrawerChildren,
  DrawerRenderArgs,
} from "@/components/drawer/drawer";
import { usePopover } from "@/components/popover/context";

const Panel = forwardRef<HTMLDivElement, PopoverPanelProps>(
  ({ anchor, className, children, ...otherProps }, ref) => {
    const isMobile = useBreakpoint("max-lg");
    const { snapPoint } = usePopover();

    return (
      <Transition>
        <PopoverPanel
          ref={ref}
          anchor={
            isMobile
              ? undefined
              : {
                  gap: "1rem",
                  to: "bottom",
                  padding: "1.5rem",
                  ...anchor,
                }
          }
          modal
          as={Fragment}
          {...otherProps}
        >
          {({ open, close }) => (
            <ConditionDrawer
              snapPoint={snapPoint}
              open={open}
              onClose={close}
              isDrawer={isMobile}
              // Only on small screens
              className="z-50 flex !h-dvh flex-col"
              overlay={
                isMobile ? (
                  <Transition.Child
                    as={Fragment}
                    enter="transition duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition duration-200 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <PopoverOverlay className="fixed inset-0 z-10 bg-black/50" />
                  </Transition.Child>
                ) : undefined
              }
            >
              {({ isFullscreen, ref, forwardedProps }) => (
                <>
                  <Transition.Child
                    ref={ref}
                    as="div"
                    enter="transition duration-300 lg:duration-200 ease-out"
                    enterFrom="lg:opacity-0 lg:scale-95 translate-y-full lg:translate-y-0"
                    enterTo="lg:opacity-100 lg:scale-100 translate-y-0"
                    leave="transition duration-200 lg:duration-100 ease-in"
                    leaveFrom="lg:opacity-100 lg:scale-100 translate-y-0"
                    leaveTo="lg:opacity-0 lg:scale-95 translate-y-full lg:translate-y-0"
                    className={cn(
                      // Top
                      "data-[anchor~=top]:data-[anchor~=center]:origin-bottom",
                      "data-[anchor~=top]:data-[anchor~=start]:origin-bottom-right",
                      "data-[anchor~=top]:data-[anchor~=end]:origin-bottom-left",
                      // Right
                      "data-[anchor~=right]:data-[anchor~=center]:origin-left",
                      "data-[anchor~=right]:data-[anchor~=start]:origin-top-left",
                      "data-[anchor~=right]:data-[anchor~=end]:origin-bottom-left",
                      // Bottom
                      "data-[anchor~=bottom]:data-[anchor~=center]:origin-top",
                      "data-[anchor~=bottom]:data-[anchor~=start]:origin-top-right",
                      "data-[anchor~=bottom]:data-[anchor~=end]:origin-top-left",
                      // Left
                      "data-[anchor~=left]:data-[anchor~=center]:origin-right",
                      "data-[anchor~=left]:data-[anchor~=start]:origin-top-right",
                      "data-[anchor~=left]:data-[anchor~=end]:origin-bottom-right",

                      "z-50 flex flex-col overflow-hidden bg-white max-lg:!max-h-dvh",
                      "pointer-events-auto border lg:shadow",
                      {
                        "max-lg:rounded-t-xl lg:rounded-xl": !isFullscreen,
                      },
                      className,
                    )}
                    {...forwardedProps}
                  >
                    {/* @ts-ignore */}
                    {children}
                  </Transition.Child>
                </>
              )}
            </ConditionDrawer>
          )}
        </PopoverPanel>
      </Transition>
    );
  },
);

Panel.displayName = PopoverPanel.displayName;

const ConditionDrawer = forwardRef<
  HTMLDivElement,
  {
    open: boolean;
    onClose: () => void;
    children?: (
      args: DrawerRenderArgs & {
        ref: ForwardedRef<HTMLDivElement>;
        forwardedProps: any;
      },
    ) => ReactNode;
    className?: string;
    isDrawer?: boolean;
    snapPoint?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    overlay?: ReactNode;
  }
>(
  (
    { isDrawer, children, open, onClose, snapPoint, className, ...otherProps },
    ref,
  ) => {
    return isDrawer ? (
      <Drawer
        ref={ref}
        snapPoint={snapPoint}
        open={open}
        onClose={onClose}
        className={className}
        {...otherProps}
      >
        {children as DrawerChildren}
      </Drawer>
    ) : typeof children === "function" ? (
      children({ isFullscreen: false, ref, forwardedProps: otherProps })
    ) : (
      children
    );
  },
);

ConditionDrawer.displayName = "ConditionDrawer";

export { Panel };
