import { ColumnDef } from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"

export type ColumnData = {
    id: string,
    title: string,
    access: string,
    file: string,
    delete: JSX.Element
    link: string
}



export const columns: ColumnDef<ColumnData>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "locked",
        header: "Access",
        cell: ({ row }) => {
            const formatted = row.getValue("locked") ? 'Locked' : 'Unlocked'

            return <div className="">{formatted}</div>
        },
    },
    {
        accessorKey: "fileName",
        header: "File Name",
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
                        {/* <div className="">
                            <button className="">
                                <MoreHorizontal className="h-4 w-4" />

                            </button>
                        </div> */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(pdf.link)}
                        >
                            Copy PDF Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete ACP</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },

]