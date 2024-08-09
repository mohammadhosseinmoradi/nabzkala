type ButtonProps = {
  className?: string;
};

export function Button(props: ButtonProps) {
  const { className } = props;

  return <button className={'bg-red-500 rounded-full px-20 border border-blue-500 py-6'}>Button</button>;
}
