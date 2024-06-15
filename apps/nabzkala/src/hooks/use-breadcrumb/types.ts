import { ReactNode } from "react";

export interface Breadcrumb {
  label: string;
  href: string;
  icon?: ReactNode;
  image?: string;
}

export interface Params {
  [param: string]: any;
}
