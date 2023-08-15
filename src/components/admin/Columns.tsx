import { ColumnDef } from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AiFillDelete } from 'react-icons/ai'
import { MoreHorizontal } from "lucide-react"

export type ColumnData = {
    id: string,
    title: string,
    access: string,
    file: string,
    delete: JSX.Element
    link: string
}

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



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

            return (
                <button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <AiFillDelete className="text-xl hover:text-red-500" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this action plan anywhere in the website.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </button>
            )
        }
    }


]