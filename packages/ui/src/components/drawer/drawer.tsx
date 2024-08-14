"use client";

import {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { cn, usePrevious } from "@repo/hooks-and-utils";
import { motion } from "framer-motion";
import { DrawerContext } from "./context";
import { Portal } from "@headlessui/react";

type AllowDragContextProps = {
  allowDrag: boolean;
  setAllowDrag: (allowDrag: boolean) => void;
};

const AllowDragContext = createContext<AllowDragContextProps | null>(null);

function useAllowDragContext() {
  const context = useContext(AllowDragContext);
  if (context === null)
    throw new Error("You must use useAllowDragContext in AllowDragContext");
  return context;
}

type DrawerStateProps = {
  drawerState: DrawerState;
  setDrawerState: (drawerState: DrawerState) => void;
};

const DrawerStateContext = createContext<DrawerStateProps | null>(null);

function useDrawerStateContext() {
  const context = useContext(DrawerStateContext);
  if (context === null)
    throw new Error("You must use useDrawerStateContext in DrawerStateContext");
  return context;
}

const modifiers = [restrictToVerticalAxis];

export enum DrawerState {
  Open = 1,
  Closed,
  Expended,
}

export type DrawerRenderArgs = {
  isFullscreen: boolean;
};

export type DrawerChildren =
  | ReactNode
  | ((args: DrawerRenderArgs) => ReactNode);

const Drawer = forwardRef<
  HTMLDivElement,
  {
    open: boolean;
    onClose: () => void;
    children?: DrawerChildren;
    className?: string;
    snapPoint?: string;
    overlay?: ReactNode;
  }
>(
  (
    { open, onClose, children, className, overlay, snapPoint, ...otherProps },
    ref,
  ) => {
    const [state, setState] = useState<DrawerState>(
      open ? DrawerState.Open : DrawerState.Closed,
    );
    const [allowDrag, setAllowDrag] = useState(false);

    useEffect(() => {
      setState(open ? DrawerState.Open : DrawerState.Closed);
    }, [open]);

    useEffect(() => {
      if (state === DrawerState.Closed) {
        onClose();
      }
    }, [state]);

    const tracked = useRef({
      distance: 0,
      timestamp: 0,
      velocity: 0,
    });

    const sensors = useSensors(
      useSensor(TouchSensor, {
        activationConstraint: {
          distance: 2,
        },
      }),
      useSensor(MouseSensor, {
        activationConstraint: {
          distance: 2,
        },
      }),
    );

    return (
      <Portal>
        <DndContext
          modifiers={modifiers}
          sensors={sensors}
          onDragMove={({ delta }) => {
            const timestamp = Date.now();
            const timeDelta = timestamp - tracked.current.timestamp;
            const distance = tracked.current.distance - delta.y;
            const velocity = Math.round((distance / timeDelta) * 1000);

            tracked.current = {
              timestamp,
              distance: delta.y,
              velocity,
            };
          }}
          onDragEnd={() => {
            const { velocity } = tracked.current;

            if (allowDrag) {
              if (velocity >= 200) {
                setState(DrawerState.Expended);
              } else if (velocity <= -200 && velocity > -2000) {
                setState(
                  state === DrawerState.Expended
                    ? DrawerState.Open
                    : DrawerState.Closed,
                );
              } else if (velocity <= -2000) {
                setState(DrawerState.Closed);
              }
            }

            tracked.current = {
              timestamp: 0,
              velocity: 0,
              distance: 0,
            };
          }}
        >
          <AllowDragContext.Provider
            value={{
              allowDrag,
              setAllowDrag,
            }}
          >
            <DrawerStateContext.Provider
              value={{
                drawerState: state,
                setDrawerState: setState,
              }}
            >
              <div
                ref={ref}
                className={cn(
                  "fixed inset-0 flex flex-col justify-end",
                  className,
                )}
                {...otherProps}
              >
                <Sheet value={state} snapPoint={snapPoint}>
                  {children}
                </Sheet>
                {overlay}
              </div>
            </DrawerStateContext.Provider>
          </AllowDragContext.Provider>
        </DndContext>
      </Portal>
    );
  },
);

Drawer.displayName = "Drawer";

export { Drawer };

const Sheet = forwardRef<
  HTMLDivElement,
  {
    value: DrawerState;
    children?: DrawerChildren;
    snapPoint?: string;
  }
>(({ value, children, snapPoint }, forwardRef) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    setNodeRef,
    attributes,
    isDragging,
    listeners,
    transform,
    activatorEvent,
  } = useDraggable({
    id: "header",
  });
  const oldY = usePrevious(transform?.y);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const handleResize = () => {
      const divElement = ref.current;
      if (divElement) {
        const { height } = divElement.getBoundingClientRect();
        setIsFullscreen(Math.floor(height) === window.innerHeight);
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);
    return () => {
      if (ref?.current) resizeObserver.unobserve(ref.current);
    };
  }, []);

  const direction: null | "up" | "down" = useMemo(() => {
    if (!transform) return null;
    if (!oldY && oldY !== 0) return null;
    if (oldY < transform.y) {
      return "down";
    }
    return "up";
  }, [oldY, transform]);

  const { allowDrag, setAllowDrag } = useAllowDragContext();

  useEffect(() => {
    if (isDragging) return;
    setAllowDrag(false);
  }, [isDragging]);

  useEffect(() => {
    let element = activatorEvent?.target as Element;

    function isInteractiveElement(element: Element) {
      if (element.scrollHeight > element.clientHeight) {
        if (
          element?.scrollTop >= 0 &&
          Math.ceil(element?.scrollTop + element?.clientHeight) <
            element.scrollHeight &&
          direction === "up"
        ) {
          return true;
        } else if (
          element?.scrollTop > 0 &&
          Math.ceil(element?.scrollTop + element?.clientHeight) <=
            element.scrollHeight &&
          direction === "down"
        ) {
          return true;
        }
      }
      return false;
    }

    while (element && !allowDrag) {
      if (
        element.attributes.getNamedItem("data-slot")?.value === "scrollable"
      ) {
        setAllowDrag(false);
        break;
      }
      if (isInteractiveElement(element)) {
        setAllowDrag(false);
        break;
      }
      if (element.attributes.getNamedItem("data-slot")?.value === "sheet") {
        setAllowDrag(true);
        break;
      }
      element = element.parentElement as HTMLElement;
    }
  }, [direction, allowDrag]);

  return (
    <DrawerContext.Provider
      value={{
        dragHandler: {
          setNodeRef,
          listeners,
          attributes,
        },
      }}
    >
      <motion.div
        ref={ref}
        className="pointer-events-auto relative z-50 flex max-h-dvh flex-col"
        initial={{
          height: snapPoint || "auto",
        }}
        animate={{
          height:
            value === DrawerState.Expended
              ? "auto"
              : value === DrawerState.Open
                ? snapPoint || "auto"
                : "0",
          y: allowDrag ? transform?.y : undefined,
        }}
        transition={{
          ease: "easeOut",
          duration: isDragging ? 0 : 0.2,
        }}
      >
        <div
          ref={forwardRef}
          className="z-20 overflow-hidden"
          data-slot="sheet"
        >
          {typeof children === "function"
            ? children({
                isFullscreen,
              })
            : children}
        </div>
        {value !== DrawerState.Closed && (
          <div className="absolute top-full z-10 h-dvh w-full bg-white" />
        )}
      </motion.div>
    </DrawerContext.Provider>
  );
});

Sheet.displayName = "Sheet";
