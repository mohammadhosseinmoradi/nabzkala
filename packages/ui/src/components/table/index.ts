import { Table as _Table } from "./components/table";
import { Body } from "./components/body";
import { Cell } from "./components/cell";
import { ColumnHeaderCell } from "./components/column-header-cell";
import { Header } from "./components/header";
import { Row } from "./components/row";
import { RowHeaderCell } from "./components/row-header-cell";

const Table = Object.assign(_Table, {
  Body,
  Cell,
  ColumnHeaderCell,
  Header,
  Row,
  RowHeaderCell,
});

export { Table };
