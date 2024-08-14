import { forwardRef } from "react";
import {
  Legend as HeadlessLegend,
  LegendProps as HeadlessLegendProps,
} from "@headlessui/react";
import { cva, VariantProps } from "cva";

const legend = cva({
  base: "",
});

type LegendProps = HeadlessLegendProps<"legend"> & VariantProps<typeof legend>;

const Legend = forwardRef<HTMLLegendElement, LegendProps>((props, ref) => {
  const { className, ...otherProps } = props;

  return (
    <HeadlessLegend
      // @ts-ignore
      ref={ref}
      data-slot="legend"
      {...otherProps}
    />
  );
});

Legend.displayName = HeadlessLegend.displayName;

export { Legend };
