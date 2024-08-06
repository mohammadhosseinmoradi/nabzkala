type ButtonProps = {
  className?: string;
};

export function Button(props: ButtonProps) {
  const { className } = props;

  return <button className={className}>Button</button>;
}
