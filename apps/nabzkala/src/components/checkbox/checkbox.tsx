import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type CheckboxProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Checkbox({ className, ...otherProps }: CheckboxProps) {
  return (
    <input
      {...otherProps}
      type="checkbox"
      className={`form-checkbox rounded-md border-white/10 bg-neutral-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-800 ${className}`}
    />
  );
}
