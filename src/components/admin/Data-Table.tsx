import * as React from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import axios from "axios";
import { ColumnData } from "./Columns";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize: number;
  tableName: string;
  access: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize,
  tableName,
  access,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [selected, setSelected] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const queryClient = useQueryClient();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    table.setPageSize(pageSize);
  }, []);

  useEffect(() => {
    if (table.getFilteredSelectedRowModel().rows.length > 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [table.getFilteredSelectedRowModel().rows]);

  const deleteMutate = useMutation({
    mutationFn: async () => {
      return await deleteQuery();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminData", { type: access }]);
      console.log(access);
    },
  });

  const deleteQuery = () => {
    var filteredRows = table.getFilteredSelectedRowModel().rows;
    var originalItems: ColumnData[] = [];

    for (var i = 0; i < filteredRows.length; i++) {
      originalItems.push(filteredRows[i].original as ColumnData);
    }

    const deleteQuery = originalItems.map(async (item) => {
      const data = await axios.post("/api/deletePdf", {
        public_id: item.actionPlan.publicId,
      });
      return data;
    });

    const myPromise = Promise.all(deleteQuery);

    toast.promise(myPromise, {
      pending:
        originalItems.length > 1
          ? `Deleting ${originalItems.length} action plans...`
          : "Deleting 1 file...",
      success: "Successfuly deleted!",
      error: "Something went wrong. Please try again later.",
    });

    return myPromise;
  };

  const handleDelete = () => {
    deleteMutate.mutate();
  };

  return (
    <>
      <div className="flex lg:items-center ml-auto w-full gap-3 lg:justify-between lg:flex-row flex-col justify-start items-start">
        <h1 className="font-primary text-2xl">{tableName}</h1>

        <Button
          disabled={!selected}
          className="lg:ml-auto ml-0"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder="Filter title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
      </div>
      <div className="border-[1px] border-black/10 rounded-lg overflow-hidden inline-block w-full">
        <Table className="w-full ">
          <TableHeader className="bg-black/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        width:
                          header.getSize() === Number.MAX_SAFE_INTEGER
                            ? "auto"
                            : header.getSize(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-visible">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center "
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center lg:justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          &lt;&lt;
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        <p className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          &gt;&gt;
        </Button>
      </div>
    </>
  );
}
function getCurrentDimension(): any {
  throw new Error("Function not implemented.");
}
