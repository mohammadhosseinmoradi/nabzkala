import { useMemo, useState } from "react";

export type UseFormChange<T> = {
  values: T;
};

/**
 * A hook that tracks changes in form values.
 * @template T - The type of form values.
 * @param {UseFormChange<T>} props - The input properties containing form values.
 */
export function useFormChange<T>(props: UseFormChange<T>) {
  const { values } = props;

  const [initialValues, setInitialValues] = useState<T>(values);

  const changed = useMemo(() => {
    return JSON.stringify(initialValues) !== JSON.stringify(values);
  }, [values]);

  return { changed, setInitialValues };
}
