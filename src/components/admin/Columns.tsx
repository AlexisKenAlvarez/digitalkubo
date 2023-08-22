import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { Button } from "../ui/button";
import React from "react";
import EditData from "./Edit-Data";
import AdminDropDown from "./AdminDropDown";

export type ActionPlan = {
  fileName: string;
  id: number;
  link: string;
  publicId: string;
  title: string;
  createdAt: Date
  pricing: {
    id: number;
    pricing: string;
  };
};

export type ColumnData = {
  id: string;
  locked: boolean;
  actionPlan: ActionPlan;
};

export const Columns: ColumnDef<ColumnData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            return column.toggleSorting(column.getIsSorted() === "asc");
          }}
          className=" pl-0"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorFn: (row) => `${row.actionPlan.title}`,
    size: 400,
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
    accessorKey: "pricing",
    header: "Pricing",
    accessorFn: (row) => `${row.actionPlan.pricing.pricing}`,
    cell: ({ row }) => {
      const pdf = row.original;
      return <p className="capitalize">{pdf.actionPlan.pricing.pricing}</p>;
    },
  },
  {
    accessorKey: "locked",
    header: "Locked",
    cell: ({ row }) => {
      const pdf = row.original;
      return <p className="capitalize">{pdf.locked.toString()}</p>;
    },
  },
  {
    header: "Actions",
    id: "actions",

    cell: ({ row }) => {
      const pdf = row.original;
      const publicId = pdf.actionPlan.publicId;

      const defaultValues = {
        id: parseInt(pdf.id),
        title: pdf.actionPlan.title,
        pricing: pdf.actionPlan.pricing.pricing,
        locked: pdf.locked,
        publicId,
      };

      return (
        <>
          <AdminDropDown
            link={pdf.actionPlan.link}
            publicId={publicId}
            locked={pdf.locked}
            defaultValues={defaultValues}
          />
        </>
      );
    },
  },
];
