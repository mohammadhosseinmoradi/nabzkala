import { Listbox as HeadlessListbox, ListboxProps } from "@headlessui/react";
import {
  ListboxContext,
  ListboxStateProps,
} from "@/components/listbox/context";
import { useState } from "react";

export function Listbox(props: ListboxProps) {
  const [state, setState] = useState<ListboxStateProps>({});

  return (
    <ListboxContext.Provider
      value={{
        state,
        setState,
      }}
    >
      <HeadlessListbox {...props} />
    </ListboxContext.Provider>
  );
}
