import type { MouseEvent, TouchEvent } from "react";
import {
  MouseSensor as DndKitMouseSensor,
  TouchSensor as DndKitTouchSensor,
} from "@dnd-kit/core";

function isInteractiveElement(element: Element | null) {
  const interactiveElements = [
    "button",
    "input",
    "textarea",
    "select",
    "option",
  ];
  return !!(
    element?.tagName &&
    interactiveElements.includes(element.tagName.toLowerCase())
  );
}

// Block DnD event propagation on interactive element.
const handler = ({ nativeEvent: event }: MouseEvent | TouchEvent) => {
  let element = event.target as HTMLElement;

  while (element) {
    if (isInteractiveElement(element)) return false;
    element = element.parentElement as HTMLElement;
  }

  return true;
};

/**
 * An extended MouseSensor that prevent some
 * interactive html element (button, input, textarea, select, option, ...) from dragging
 */
export class MouseSensor extends DndKitMouseSensor {
  static activators = [
    {
      eventName: "onMouseDown" as const,
      handler,
    },
  ];
}

/**
 * An extended TouchSensor that prevent some
 * interactive html element (button, input, textarea, select, option, ...) from dragging
 */
export class TouchSensor extends DndKitTouchSensor {
  static activators = [
    {
      eventName: "onTouchStart" as const,
      handler,
    },
  ];
}
