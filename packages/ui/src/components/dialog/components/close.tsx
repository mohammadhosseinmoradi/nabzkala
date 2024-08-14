import { Ref } from "react";
import { CloseButton, CloseButtonProps } from "@headlessui/react";
import { XIcon } from "lucide-react";
import { cn, forwardRefWithAs } from "@repo/hooks-and-utils";

type ButtonProps = CloseButtonProps<"button">;

function CloseFn(props: ButtonProps, ref: Ref<HTMLElement>) {
  const { className, children, type, ...otherProps } = props;

  return (
    <CloseButton
      ref={ref}
      className={cn("flex shrink-0 hover:text-neutral-800", className)}
      type={type ? type : "button"}
      {...otherProps}
    >
      <XIcon className="size-5" />
    </CloseButton>
  );
}

const Close = forwardRefWithAs(CloseFn);

export { Close };
