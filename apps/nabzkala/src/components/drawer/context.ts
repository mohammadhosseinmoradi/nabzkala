import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { createContext, useContext } from "react";
import { DraggableAttributes } from "@dnd-kit/core";

export type DrawerContextProps = {
  dragHandler: {
    setNodeRef: (element: HTMLElement | null) => void;
    listeners?: SyntheticListenerMap;
    attributes?: DraggableAttributes;
  };
};

export const DrawerContext = createContext<DrawerContextProps | null>(null);

export function useDrawerContext() {
  return useContext(DrawerContext) ?? undefined;
}
