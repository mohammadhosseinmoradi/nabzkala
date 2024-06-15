//TData
import { useState } from "react";
import {
  ColumnDef,
  ColumnOrderState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components";
import { faker } from "@faker-js/faker";
import { Table } from "@/components";

type User = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

const columnHelper = createColumnHelper<User>();

const defaultColumns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: (info) => info.column.id,
  }),
];

export default function DateGrid() {
  const [data, setData] = useState<User[]>(getUsers());
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const table = useReactTable({
    data,
    columns: defaultColumns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  const randomizeColumn = () => {
    const columns = table.getAllLeafColumns().map((item) => item.id);
    table.setColumnOrder(faker.helpers.shuffle(columns));
  };

  return (
    <div>
      <Button onClick={randomizeColumn}>Shuffle columns</Button>
      <div className="mt-6">
        <Table className="">
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.ColumnHeaderCell
                    key={header.id}
                    className=""
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} className="">
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

function getUsers(): User[] {
  return [
    {
      firstName: "John",
      lastName: "Doe",
      age: 25,
      visits: 5,
      progress: 80,
      status: "Active",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      age: 30,
      visits: 10,
      progress: 95,
      status: "Active",
    },
    {
      firstName: "Alex",
      lastName: "Johnson",
      age: 28,
      visits: 8,
      progress: 75,
      status: "Inactive",
    },
    {
      firstName: "Emily",
      lastName: "Davis",
      age: 22,
      visits: 3,
      progress: 60,
      status: "Active",
    },
    {
      firstName: "Michael",
      lastName: "Williams",
      age: 35,
      visits: 15,
      progress: 85,
      status: "Active",
    },
    {
      firstName: "Olivia",
      lastName: "Miller",
      age: 27,
      visits: 7,
      progress: 70,
      status: "Inactive",
    },
    {
      firstName: "Daniel",
      lastName: "Brown",
      age: 32,
      visits: 12,
      progress: 90,
      status: "Active",
    },
    {
      firstName: "Sophia",
      lastName: "Taylor",
      age: 26,
      visits: 6,
      progress: 78,
      status: "Active",
    },
    {
      firstName: "Christopher",
      lastName: "Moore",
      age: 29,
      visits: 9,
      progress: 88,
      status: "Inactive",
    },
    {
      firstName: "Emma",
      lastName: "Anderson",
      age: 23,
      visits: 4,
      progress: 65,
      status: "Active",
    },
    {
      firstName: "Matthew",
      lastName: "White",
      age: 31,
      visits: 11,
      progress: 92,
      status: "Active",
    },
    {
      firstName: "Ava",
      lastName: "Martin",
      age: 24,
      visits: 5,
      progress: 82,
      status: "Inactive",
    },
    {
      firstName: "William",
      lastName: "Harris",
      age: 28,
      visits: 8,
      progress: 75,
      status: "Active",
    },
    {
      firstName: "Mia",
      lastName: "Clark",
      age: 30,
      visits: 10,
      progress: 94,
      status: "Active",
    },
    {
      firstName: "Ethan",
      lastName: "Carter",
      age: 33,
      visits: 13,
      progress: 87,
      status: "Inactive",
    },
    {
      firstName: "Isabella",
      lastName: "Baker",
      age: 25,
      visits: 6,
      progress: 79,
      status: "Active",
    },
    {
      firstName: "Liam",
      lastName: "Ward",
      age: 29,
      visits: 9,
      progress: 86,
      status: "Active",
    },
    {
      firstName: "Abigail",
      lastName: "Fisher",
      age: 26,
      visits: 7,
      progress: 71,
      status: "Inactive",
    },
    {
      firstName: "James",
      lastName: "Cooper",
      age: 34,
      visits: 14,
      progress: 91,
      status: "Active",
    },
    {
      firstName: "Ella",
      lastName: "Evans",
      age: 22,
      visits: 3,
      progress: 68,
      status: "Active",
    },
  ];
}
