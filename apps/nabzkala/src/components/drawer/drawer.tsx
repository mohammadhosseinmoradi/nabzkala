"use client";

import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { DrawerContext } from "@/components/drawer/context";

const modifiers = [restrictToVerticalAxis];

export enum DrawerState {
  Expended = 1,
  Opened,
  Closed,
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
      open ? DrawerState.Opened : DrawerState.Closed,
    );

    useEffect(() => {
      setState(open ? DrawerState.Opened : DrawerState.Closed);
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

    const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

    return (
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
        onDragEnd={({ over }) => {
          const { velocity } = tracked.current;

          if (Math.abs(velocity) > 1000) {
            if (velocity > 0) {
              setState(DrawerState.Expended);
            } else if (velocity > -2000) {
              setState(DrawerState.Opened);
            } else {
              setState(DrawerState.Closed);
            }
          } else if (over) {
            if (velocity >= 0 && over.id !== DrawerState.Closed) {
              setState(over.id as DrawerState);
            } else if (velocity < 0 && over.id !== DrawerState.Expended) {
              setState(over.id as DrawerState);
            }
          }

          tracked.current = {
            timestamp: 0,
            velocity: 0,
            distance: 0,
          };
        }}
      >
        <div
          ref={ref}
          className={cn("fixed inset-0 flex flex-col justify-end", className)}
          {...otherProps}
        >
          <Sheet value={state} snapPoint={snapPoint}>
            {children}
          </Sheet>
          <DropRegions />
          {overlay}
        </div>
      </DndContext>
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
  const { setNodeRef, attributes, isDragging, listeners, transform } =
    useDraggable({
      id: "header",
    });
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
              : value === DrawerState.Opened
                ? snapPoint || "auto"
                : "0",
          y: transform?.y,
        }}
        transition={{
          ease: "easeOut",
          duration: isDragging ? 0 : 0.2,
        }}
      >
        <div ref={forwardRef} className="z-20 overflow-hidden">
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

export function DropRegions() {
  const { active, setNodeRef: setExpendRegionNodeRef } = useDroppable({
    id: DrawerState.Expended,
  });
  const { setNodeRef: setOpenRegionRef } = useDroppable({
    id: DrawerState.Opened,
  });
  const { setNodeRef: setCloseRegionRef } = useDroppable({
    id: DrawerState.Closed,
  });

  if (!active) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 grid grid-rows-3">
      <div ref={setExpendRegionNodeRef} />
      <div ref={setOpenRegionRef} />
      <div ref={setCloseRegionRef} />
    </div>
  );
}
