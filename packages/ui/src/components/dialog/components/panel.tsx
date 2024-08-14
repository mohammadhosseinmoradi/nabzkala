import {
  DialogPanelProps,
  DialogBackdrop,
  DialogPanel,
  Dialog,
} from "@headlessui/react";
import { ElementType, ReactNode, Ref } from "react";
import { DialogVariant, useDialogContext } from "@/components/dialog/context";
import { Drawer, DrawerChildren } from "@/components/drawer/drawer";
import { cva } from "cva";
import { useDrawerContext } from "@/components/drawer";
import {
  cn,
  forwardRefWithAs,
  HasDisplayName,
  RefProp,
  syncRefs,
  useBreakpoint,
} from "@repo/hooks-and-utils";
import { InlineComponent } from "@/components/inline-component";

const conditionDrawer = cva({
  base: "fixed inset-0 start-[calc(100%-100vw)] z-20 flex max-h-full flex-col justify-end overflow-hidden lg:p-6",
  variants: {
    variant: {
      [DialogVariant.Center]: "lg:items-center lg:justify-center",
      [DialogVariant.Drawer]: "lg:items-end lg:justify-start lg:p-0",
    },
  },
});

const panel = cva({
  base: "transition-all duration-300 data-[closed]:opacity-0 h-full max-h-full max-lg:data-[closed]:translate-y-10 overflow-hidden lg:h-auto mt-auto lg:my-auto z-50 flex shrink-0 flex-col bg-white lg:shadow",
  variants: {
    variant: {
      [DialogVariant.Center]: "lg:data-[closed]:scale-95",
      [DialogVariant.Drawer]: "lg:h-full lg:data-[closed]:-translate-x-full",
    },
    fullscreen: {
      false: "max-lg:rounded-t-xl lg:rounded-xl",
    },
  },
  compoundVariants: [
    {
      variant: DialogVariant.Drawer,
      className: "lg:rounded-none",
    },
  ],
});

const DEFAULT_PANEL_TAG = "div";

function PanelFn<TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
  props: DialogPanelProps<TTag>,
  ref: Ref<HTMLDivElement> | null,
) {
  const {
    className,
    as = DEFAULT_PANEL_TAG,
    ...otherProps
  } = props as DialogPanelProps<typeof DEFAULT_PANEL_TAG>;

  const { state } = useDialogContext();
  const isMobile = useBreakpoint("max-lg");

  return (
    <Dialog
      open={state.open}
      onClose={() => {
        state.onOpenChange(false);
      }}
      className="relative z-50"
    >
      <DialogBackdrop
        transition
        as="div"
        className="pointer-events-none fixed inset-0 z-10 bg-black/25 transition duration-300 data-[closed]:opacity-0"
      />
      <ConditionDrawer
        open={state.open}
        onClose={() => {
          state.onOpenChange(false);
        }}
        isDrawer={isMobile}
        snapPoint={state.snapPoint}
        className={cn(
          conditionDrawer({
            variant: state.variant,
          }),
        )}
      >
        {({ isFullscreen }) => (
          <InlineComponent>
            {() => {
              const drawer = useDrawerContext();

              return (
                <DialogPanel
                  transition
                  ref={syncRefs(ref, drawer?.dragHandler.setNodeRef!)}
                  as={as}
                  className={cn(
                    panel({
                      variant: state.variant,
                      fullscreen: isFullscreen,
                    }),
                    className,
                  )}
                  {...otherProps}
                  {...drawer?.dragHandler?.listeners}
                  {...drawer?.dragHandler?.attributes}
                />
              );
            }}
          </InlineComponent>
        )}
      </ConditionDrawer>
    </Dialog>
  );
}

interface _internal_ComponentPanel extends HasDisplayName {
  <TTag extends ElementType = typeof DEFAULT_PANEL_TAG>(
    props: DialogPanelProps<TTag> & RefProp<typeof PanelFn<TTag>>,
  ): ReactNode;
}

const Panel = forwardRefWithAs(PanelFn) as unknown as _internal_ComponentPanel;

export { Panel };

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
