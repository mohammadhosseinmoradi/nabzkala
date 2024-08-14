import { PopoverGroup, PopoverButton } from "@headlessui/react";
import { Popover as _Popover } from "src/components/popover/components/popover";
import { Panel } from "src/components/popover/components/panel";
import { Header } from "src/components/popover/components/header";
import { Title } from "src/components/popover/components/title";
import { Actions } from "src/components/popover/components/actions";
import { Body } from "src/components/popover/components/body";
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
