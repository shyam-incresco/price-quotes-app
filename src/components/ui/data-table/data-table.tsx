import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@camped-ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableSkeleton } from "./data-table-skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  title: string;
  ctaLabel?: string;
  handleCta?: any;
  isLoading: boolean;
  canShowToolBar?: boolean;
  handleOnBlur?: any;
  totalItems: number;
  pageSize: number;
  page: number;
  handleDelete?: any;
  handleEdit?: any;
}

export function DataTable<TData, TValue>({
  columns,
  title,
  ctaLabel,
  data,
  handleCta,
  isLoading,
  canShowToolBar = true,
  totalItems,
  pageSize,
  page,
  handleDelete = () => {},
  handleEdit = () => {},
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const pageCount = Math.round(totalItems / pageSize);

  const table = useReactTable({
    data: data || [],
    columns,
    pageCount: pageCount > 0 ? pageCount : 1,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageSize: pageSize,
        pageIndex: page - 1,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className='space-y-4 w-full h-full bg-background flex flex-1 flex-col'>
      {canShowToolBar && (
        <DataTableToolbar
          table={table}
          title={title}
          ctaLabel={ctaLabel}
          handleCta={handleCta}
        />
      )}
      <div className='flex flex-col gap-6'>
        <div className='rounded-md border h-full bg-background'>
          {!isLoading ? (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup, index) => (
                  <TableRow key={index}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
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
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            onClick={() => {
                              if (cell.column.id === "delete") {
                                handleDelete(row);
                              } else if (cell.column.id === "edit") {
                                handleEdit(row);
                              }
                            }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <DataTableSkeleton columnCount={10} />
          )}
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
