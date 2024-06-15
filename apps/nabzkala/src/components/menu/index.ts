import { MenuButton } from "@headlessui/react";
import { Menu as _Menu } from "./components/menu";
import { Items } from "src/components/menu/components/items";
import { Item } from "src/components/menu/components/item";
import { Label } from "@/components/menu/components/label";
import { Shortcut } from "src/components/menu/components/shortcut";
import { Description } from "src/components/menu/components/description";

const Menu = Object.assign(_Menu, {
  Button: MenuButton,
  Items,
  Item,
  Label,
  Shortcut,
  Description,
});

export { Menu };
