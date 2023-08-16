import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { Button } from "../ui/button";

export type ActionPlan = {
  fileName: string;
  id: number;
  link: string;
  publicId: string;
  title: string;
};

export type ColumnData = {
  id: string;
  locked: boolean;
  actionPlan: ActionPlan;
};

export const columns: ColumnDef<ColumnData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            return column.toggleSorting(column.getIsSorted() === 'asc');
          }}
          className=" pl-0"
        >
          File Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: row => `${row.actionPlan.title}`,
    size: 400,
    // cell: ({ row }) => {
    //   const pdf = row.original;
    //   return pdf.actionPlan.title;
    // },
  },
  {
    accessorKey: "fileName",
    header: "File Name",
    size: 400,
    cell: ({ row }) => {
      const pdf = row.original;
      return <p className="">{pdf.actionPlan.fileName}</p>;
    },
  },
  {
    accessorKey: "locked",
    header: "Locked",
  },
  {
    header: "Actions",
    id: "actions",

    cell: ({ row }) => {
      const pdf = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 p-0 ">
              {/* <span className="sr-only">Open menu</span> */}
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(pdf.actionPlan.link)}
            >
              Copy PDF Link
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    header: "Delete",
    id: "delete",
    cell: ({ row }) => {
      const pdf = row.original;
      const publicId = pdf.actionPlan.publicId;

      return <DeleteButton publicId={publicId} locked={pdf.locked} />;
    },
  },
];
