import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ScrollArea } from "@/components/scroll-area";
import { useDialogContext } from "@/components/dialog/context";
import { cn, syncRefs } from "@repo/hooks-and-utils";

const Body = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  (props, ref) => {
    const { className, ...otherProps } = props;

    const { setState } = useDialogContext();

    return (
      <ScrollArea
        onScroll={(data) => {
          setState((prevState) => ({
            ...prevState,
            bodyScrollState: data,
          }));
        }}
      >
        {({ setNodeRef }) => {
          return (
            <div
              ref={syncRefs(ref, setNodeRef)}
              data-slot="body"
              className={cn("grow overflow-y-auto px-4 py-4", className)}
              {...otherProps}
            />
          );
        }}
      </ScrollArea>
    );
  },
);

Body.displayName = "Dialog.Body";

export { Body };
