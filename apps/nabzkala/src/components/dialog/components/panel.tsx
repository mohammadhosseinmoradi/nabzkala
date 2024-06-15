import {
  Dialog as _Dialog,
  Transition,
  DialogPanelProps,
} from "@headlessui/react";
import { ElementType, forwardRef, Fragment, Ref } from "react";
import { cn } from "@/lib/utils";
import { useDialog } from "@/components/dialog/hooks/useDialog";
import useBreakpoint from "@/hooks/use-breakpoint";
import { Drawer, DrawerChildren } from "@/components/drawer/drawer";

type PanelProps<T extends ElementType = "div"> = {
  className?: string;
} & DialogPanelProps<T>;

function _Panel<T extends ElementType = "div">(
  { className, ...otherProps }: PanelProps<T>,
  ref: Ref<HTMLDivElement> | undefined,
) {
  const { state } = useDialog();
  const isMobile = useBreakpoint("max-lg");

  return (
    <Transition show={state.open} as={Fragment}>
      <_Dialog
        onClose={() => {
          state.onOpenChange(false);
        }}
        className="relative z-50"
      >
        <Transition.Child
          as={Fragment}
          enter="transition duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <_Dialog.Overlay
            as="div"
            className="pointer-events-none fixed inset-0 z-10 bg-black/50"
          />
        </Transition.Child>
        <ConditionDrawer
          open={state.open}
          onClose={() => {
            state.onOpenChange(false);
          }}
          isDrawer={isMobile}
          snapPoint={state.snapPoint}
          className="fixed inset-0 start-[calc(100%-100vw)] z-20 flex max-h-full flex-col justify-end overflow-hidden lg:items-center lg:justify-center lg:p-6"
        >
          {({ isFullscreen }) => (
            <Transition.Child
              as={Fragment}
              enter="transition duration-300 ease-out"
              enterFrom="lg:opacity-0 lg:scale-95 translate-y-full lg:translate-y-0"
              enterTo="lg:opacity-100 lg:scale-100 translate-y-0"
              leave="transition duration-200 ease-in"
              leaveFrom="lg:opacity-100 lg:scale-100 translate-y-0"
              leaveTo="lg:opacity-0 lg:scale-95 translate-y-full lg:translate-y-0"
            >
              <_Dialog.Panel
                ref={ref}
                className={cn(
                  "h-full max-h-full overflow-hidden lg:h-auto",
                  "mt-auto lg:my-auto",
                  "z-50 flex shrink-0 flex-col bg-white lg:shadow",
                  {
                    "max-lg:rounded-t-xl lg:rounded-xl": !isFullscreen,
                  },
                  className,
                )}
                {...otherProps}
              />
            </Transition.Child>
          )}
        </ConditionDrawer>
      </_Dialog>
    </Transition>
  );
}

const Panel = (<T extends typeof _Panel>(): T => {
  return forwardRef(_Panel as any) as any;
})();

function ConditionDrawer({
  isDrawer,
  children,
  snapPoint,
  ...otherProps
}: {
  open: boolean;
  onClose: () => void;
  children?: DrawerChildren;
  className?: string;
  isDrawer?: boolean;
  snapPoint?: string;
}) {
  return isDrawer ? (
    <Drawer snapPoint={snapPoint} {...otherProps}>
      {children}
    </Drawer>
  ) : (
    <div {...otherProps}>
      {typeof children === "function"
        ? children({ isFullscreen: false })
        : children}
    </div>
  );
}

export { Panel };
