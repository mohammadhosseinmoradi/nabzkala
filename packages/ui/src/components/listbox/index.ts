import { Listbox as _Listbox } from "src/components/listbox/components/listbox";
import { Button } from "src/components/listbox/components/button";
import { Options } from "src/components/listbox/components/options";
import { Option } from "src/components/listbox/components/option";
import { Close } from "src/components/listbox/components/close";

const Listbox = Object.assign(_Listbox, {
  Button,
  Options,
  Option,
  Close,
});

export { Listbox };
