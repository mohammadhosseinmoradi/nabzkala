import clsx from "clsx";

type Color =
  | "primary"
  | "secondary"
  | "secondary-inverse"
  | "error"
  | "success"
  | "white"
  | "black";

type Size = "sm" | "md" | "lg";

type LoadingProps = {
  size?: Size;
  color?: Color;
  className?: string;
};

const sizes: Record<Size, string> = {
  sm: "w-[0.25rem] h-[0.25rem]",
  md: "w-[0.3rem] h-[0.3rem]",
  lg: "w-[0.35rem] h-[0.35rem]",
};

const gaps: Record<Size, string> = {
  sm: "gap-[0.12rem]",
  md: "gap-[0.15rem]",
  lg: "gap-[0.2rem]",
};

const colors: Record<Color, string> = {
  primary: "bg-blue-600 dark:bg-blue-500",
  secondary: "bg-neutral-800 dark:bg-neutral-200",
  error: "bg-red-600 dark:bg-red-500",
  success: "bg-green-600 dark:bg-green-500",
  "secondary-inverse": "bg-neutral-200 dark:bg-neutral-800",
  white: "bg-neutral-200",
  black: "bg-neutral-800",
};

/**
 *
 * @param size
 * @param color background-color class for change dot color.
 * @param className
 * @constructor
 */
export function ThreeDotLoading({
  size = "md",
  color = "primary",
  className,
}: LoadingProps) {
  const renderDot = ({ className }: { className?: string }) => (
    <span
      className={clsx(
        "animate-in direction-alternate fill-mode-backwards repeat-infinite rounded-full duration-500",
        sizes[size],
        colors[color],
        className,
      )}
    />
  );
  return (
    <div className={`${className}`}>
      <div className={clsx("flex", gaps[size])}>
        {renderDot({ className: "fade-in-25" })}
        {renderDot({ className: "fade-in-25 delay-100" })}
        {renderDot({ className: "fade-in-25 delay-200" })}
      </div>
    </div>
  );
}
