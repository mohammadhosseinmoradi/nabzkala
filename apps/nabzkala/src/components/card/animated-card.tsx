"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import useBreakpoint from "@/hooks/use-breakpoint";

type AnimatedCardProps = {
  children?: ReactNode;
  className?: string;
};

export default function AnimatedCard({
  children,
  className,
}: AnimatedCardProps) {
  // Reference to the card element
  const ref = useRef<HTMLDivElement | null>(null);
  // Width of the card
  const [width, setWidth] = useState(0);
  // Height of the card
  const [height, setHeight] = useState(0);
  // X-coordinate of the mouse
  const [x, setX] = useState(0);
  // Y-coordinate of the mouse
  const [y, setY] = useState(0);
  // Maximum dimension of the card
  const [maxSideSize, setMaxSideSize] = useState(0);
  // Determine if it's a desktop view
  const isDesktop = useBreakpoint("lg");
  // Track if the card is being hovered
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    // Add an event listener to track mouse movement
    const handleMouseEvent = (e: MouseEvent) => {
      const mouseX = e.x;
      const mouseY = e.y;

      const cardX = ref?.current?.getBoundingClientRect()?.x ?? 0;
      const cardY = ref?.current?.getBoundingClientRect()?.y ?? 0;

      let x = mouseX - cardX;
      setX(x);
      let y = mouseY - cardY;
      setY(y);

      const cardWidth = ref?.current?.getBoundingClientRect().width ?? 0;
      const cardHeight = ref?.current?.getBoundingClientRect().height ?? 0;

      setMaxSideSize(cardWidth > cardHeight ? cardWidth : cardHeight);
    };
    document.body.addEventListener("mousemove", handleMouseEvent);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseEvent);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={() => {
        const rect = ref?.current?.getBoundingClientRect();
        if (rect) {
          setWidth(rect.width);
          setHeight(rect.height);
        }
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "center",
      }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-xl p-px"
        animate={{
          ...(isDesktop && isHover
            ? {
                rotateX: (y / height - 0.5) * 20,
                rotateY: -(x / width - 0.5) * 20,
              }
            : {}),
        }}
        transition={{
          duration: isHover ? 0.08 : 0.1,
          delay: 0,
        }}
      >
        <div className="relative z-[1] h-full w-full overflow-hidden rounded-xl text-sm">
          {children}
        </div>
        <div
          className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 bg-blue-500 blur-xl lg:block"
          style={{
            top: y,
            left: x,
            width: `${maxSideSize / 4}px`,
            height: `${maxSideSize / 4}px`,
          }}
        />
        <div
          className="pointer-events-none absolute z-50 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl lg:block"
          style={{
            top: y,
            left: x,
            width: `${maxSideSize / 2}px`,
            height: `${maxSideSize / 2}px`,
          }}
        />
      </motion.div>
    </div>
  );
}
