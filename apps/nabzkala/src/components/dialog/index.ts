import _Dialog from "src/components/dialog/components/dialog";
import { Panel } from "src/components/dialog/components/panel";
import { Header } from "src/components/dialog/components/header";
import { Body } from "src/components/dialog/components/body";
import { Actions } from "@/components/dialog/components/actions";
import { Button } from "src/components/dialog/components/button";
import { Title } from "src/components/dialog/components/title";
import { Description } from "@/components";

const Dialog = Object.assign(_Dialog, {
  Panel,
  Title,
  Description,
  Header,
  Body,
  Actions,
  Button,
});

export { Dialog };
