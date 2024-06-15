import { ReactNode } from "react";

/**
 * Accept a function and render it as component.
 * @param children
 * @constructor
 */
export default function InlineComponent({
  children,
}: {
  children: () => ReactNode;
}) {
  return children();
}
