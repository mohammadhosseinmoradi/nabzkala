import _Dialog from "@/components/dialog/components/dialog";
import { Panel } from "@/components/dialog/components/panel";
import { Header } from "@/components/dialog/components/header";
import { Body } from "@/components/dialog/components/body";
import { Actions } from "@/components/dialog/components/actions";
import { Button } from "@/components/dialog/components/button";
import { Title } from "@/components/dialog/components/title";
import { Close } from "@/components/dialog/components/close";
import { DialogVariant } from "@/components/dialog/context";

const Dialog = Object.assign(_Dialog, {
  Panel,
  Title,
  Header,
  Body,
  Actions,
  Button,
  Close,
});

export { Dialog, DialogVariant };
