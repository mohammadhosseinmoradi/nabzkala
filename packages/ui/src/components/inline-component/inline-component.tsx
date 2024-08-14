/**
 * This component accept a function as children and render it as component.
 */
export function InlineComponent({ children }: { children: () => any }) {
  return children();
}
