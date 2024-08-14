import { ReactNode } from "react";

export type Breadcrumb = {
  label: string;
  href: string;
  icon?: ReactNode;
  image?: string;
};

export type Params = {
  [param: string]: any;
};
