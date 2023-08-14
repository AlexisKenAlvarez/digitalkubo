import { ColumnDef } from "@tanstack/react-table"

interface ColumnData {

}

export const columns: ColumnDef<ColumnData>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "access",
        header: "Access",
    },
    {
        accessorKey: "fileName",
        header: "File Name",
    },
    {
        accessorKey: "delete",
        header: "Delete",
    },

]