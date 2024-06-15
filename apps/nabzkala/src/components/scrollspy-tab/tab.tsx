import { ReactNode } from "react";
import { useTabContext } from "@/components/scrollspy-tab/context";

type TabProps = {
  className?: string;
  children: ReactNode;
  index?: number;
};

export default function Tab({ className, index, ...otherProps }: TabProps) {
  const { state } = useTabContext();

  return (
    <button
      {...otherProps}
      onClick={() => {
        const id = state.id + index;
        const element = document.getElementById(id);
        if (!element) return;

        const root = document.getElementById("root");
        if (!root) return;

        const top = element.offsetTop - 200;
        root.scrollTo({ top, behavior: "smooth" });

        // const top = element.getBoundingClientRect().top + window.scrollY - state.offsetTop;
        // window.scrollTo({top, behavior: 'smooth'});
      }}
      className={`h-full w-full shrink-0 border-b py-2 px-4 ${className}`}
    />
  );
}
