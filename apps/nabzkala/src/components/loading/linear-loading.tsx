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

const sizes: Record<Size, string> = {
  sm: "h-[0.2rem]",
  md: "h-[0.3rem]",
  lg: "h-[0.4rem]",
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

type LinearLoadingProps = {
  size?: Size;
  color?: Color;
  className?: string;
};

export function LinearLoading({
  size = "sm",
  color = "primary",
  className,
}: LinearLoadingProps) {
  return (
    <div
      className={clsx(
        "bg-opacity-25 dark:bg-opacity-25 flex overflow-hidden",
        colors[color],
        sizes[size],
        className,
      )}
    >
      <div
        className={clsx(
          "h-full w-full",
          "animate-in slide-in-from-right translate-x-[-100%]",
          "fill-mode-backwards repeat-infinite duration-1000",
          colors[color],
        )}
      />
    </div>
  );
}
