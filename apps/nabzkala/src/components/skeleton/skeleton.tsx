import styles from "./style.module.css";
import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
  style?: CSSProperties;
};

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-black/5 dark:bg-white/5",
        styles.animateSkeleton,
        className,
      )}
      style={style}
    />
  );
}
