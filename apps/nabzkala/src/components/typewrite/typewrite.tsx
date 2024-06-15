import {
  ComponentProps,
  ElementType,
  ReactNode,
  useEffect,
  useRef,
} from "react";
// @ts-ignore
import Typewriter from "typewriter-effect/dist/core";

type OurProps<T extends ElementType = "p"> = {
  as?: T;
  children?: ReactNode;
  delay?: number;
  loop?: boolean;
};

type TypeWriteProps<T extends ElementType = "p"> = Omit<
  ComponentProps<T>,
  keyof OurProps
> &
  OurProps;

export default function TypeWrite<T extends ElementType = "p">({
  as,
  children,
  loop = false,
  delay = 1,
  ...otherProps
}: TypeWriteProps<T>) {
  const Tag = as || ("p" as any);
  const typeWriteRef = useRef();

  useEffect(() => {
    let typewriter = new Typewriter(typeWriteRef.current, {
      loop,
      delay,
    });
    typewriter.typeString(children).start();
  }, []);

  return (
    <Tag ref={typeWriteRef} {...otherProps}>
      {children}
    </Tag>
  );
}
