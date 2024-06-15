import { PopoverGroup, PopoverButton } from "@headlessui/react";
import { Popover as _Popover } from "./components/popover";
import { Panel } from "./components/panel";
import { Header } from "./components/header";
import { Title } from "./components/title";
import { Actions } from "./components/actions";
import { Body } from "./components/body";
import { Description } from "@/components";

const Popover = Object.assign(_Popover, {
  Group: PopoverGroup,
  Button: PopoverButton,
  Panel,
  Description,
  Header,
  Title,
  Actions,
  Body,
});

export { Popover };
