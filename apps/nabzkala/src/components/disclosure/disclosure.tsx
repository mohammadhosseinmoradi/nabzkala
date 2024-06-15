import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DropdownProps {
  open: boolean;
  className?: string;
  children: ReactNode;
  duration?: number;
}

export default function Disclosure({
  open,
  className = "",
  children,
  duration = 0.5,
}: DropdownProps) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={open ? "expand" : "collapse"}
      animate={open ? "expand" : "collapse"}
      variants={{
        expand: {
          height: "auto",
          opacity: 1,
        },
        collapse: {
          height: 0,
          opacity: 0,
        },
      }}
      transition={{
        type: "linear",
        duration,
      }}
    >
      <div className={`flex h-full w-full items-end`}>
        <div className="w-full">{children}</div>
      </div>
    </motion.div>
  );
}
