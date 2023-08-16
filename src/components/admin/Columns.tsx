import { ColumnDef } from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"
import DeleteButton from "./DeleteButton"

export type ActionPlan = {
    fileName: string,
    id: number,
    link: string,
    publicId: string,
    title: string
}

export type ColumnData = {
    id: string,
    locked: boolean,
    actionPlan: ActionPlan,
}

export const columns: ColumnDef<ColumnData>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const pdf = row.original

            return (
                <p className="">{pdf.actionPlan.title}</p>
            )
        }
    },
    {
        accessorKey: "fileName",
        header: "File Name",
        cell: ({ row }) => {
            const pdf = row.original

            return (
                <p className="">{pdf.actionPlan.fileName}</p>
            )
        }
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const pdf = row.original

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
                            onClick={() => navigator.clipboard.writeText(pdf.actionPlan.publicId)}
                        >
                            Copy PDF Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },

    },
    {
        header: "Delete",
        id: "delete",
        cell: ({ row }) => {
            const pdf = row.original

            const publicId = pdf.actionPlan.publicId

            console.log(publicId)

            return (
                <DeleteButton publicId={publicId} />
            )
        }
    }
]