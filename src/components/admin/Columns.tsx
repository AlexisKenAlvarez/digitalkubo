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
import React from "react";
import EditData from "./Edit-Data";

export type ActionPlan = {
  fileName: string;
  id: number;
  link: string;
  publicId: string;
  title: string;
  pricing: {
    id: number;
    pricing: string;
  }[];
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
    accessorFn: (row) => `${row.actionPlan.pricing[0].pricing}`,
    cell: ({ row }) => {
      const pdf = row.original;
      return <p className="capitalize">{pdf.actionPlan.pricing[0].pricing}</p>;
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

      const [isOpen, setOpen] = React.useState(false);
      const [isDeleteOpen, setDeleteOpen] = React.useState(false);
      const ref = React.useRef<HTMLDivElement>(null);

      const defaultValues = {
        id: parseInt(pdf.id),
        title: pdf.actionPlan.title,
        pricing: pdf.actionPlan.pricing[0].pricing,
        locked: pdf.locked,
        publicId
      }

      const toggleSheet = () => {
        setOpen((prevState) => !prevState);
      };

      const toggleDelete = () => {
        setDeleteOpen((prevState) => !prevState);
      };

      React.useEffect(() => {
        const handleClick = (event: { target: any }) => {
          if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
          }
        };

        document.addEventListener("click", handleClick, true);

        return () => {
          document.removeEventListener("click", handleClick, true);
        };
      }, [ref]);

      return (
        <>
          {/* Delete Action plan */}
          <DeleteButton
            publicId={publicId}
            locked={pdf.locked}
            open={isDeleteOpen}
            setDeleteOpen={setDeleteOpen}
          />

          <EditData isOpen={isOpen} toggleSheet={toggleSheet} customRef={ref} defaultValues={defaultValues} />

          {/* Dropdown Menu */}
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
                onClick={() =>
                  navigator.clipboard.writeText(pdf.actionPlan.link)
                }
              >
                Copy PDF Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleSheet}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={toggleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
