import clsx from "clsx";

type Color =
  | "primary"
  | "secondary"
  | "secondary-inverse"
  | "error"
  | "success";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "w-3 h-3",
  md: "w-[0.9rem] h-[0.9rem]",
  lg: "w-[1.1rem] h-[1.1rem]",
};

const colors: Record<Color, string> = {
  primary: "text-blue-600 dark:text-blue-500",
  secondary: "text-neutral-800 dark:text-neutral-200",
  error: "text-red-600 dark:text-red-500",
  success: "text-green-600 dark:text-green-500",
  "secondary-inverse": "text-neutral-200 dark:text-neutral-800",
};

type SpinnerLoadingProps = {
  size?: Size;
  color?: Color;
  className?: string;
};

export function SpinnerLoading({
  size = "sm",
  color,
  className,
}: SpinnerLoadingProps) {
  return (
    <svg
      className={clsx(
        "animate-spin duration-500",
        sizes[size],
        color && colors[color],
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
