"use client"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Link, router, usePage } from "@inertiajs/react"
//import { can } from "@/lib/can"


import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,

} from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LucidePlusCircle, Search, UserPlus } from "lucide-react"

interface DataTableProps<TData, TValue> {

  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchBar: string,
  rootRoute: string
  pagination: any[]
  total: number
  from: number
  to: number
  current_page: number
  filters: { search: string }
}



export function DataTable<TData, TValue>({
  columns,
  data,
  searchBar,
  rootRoute,
  pagination = [] ,
  total = 0,
  from = 0,
  to = 0,
  current_page= 0,
  filters

}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const prevPage = current_page - 1;
  const nextViewPage = current_page + 2
  const lastPage = pagination.length - 1
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    }
  })

  // Function to handle page navigation
  const handlePageChange = (url: string | null) => {
    if (url) {
      // Extract the page number from the URL
      const urlParams = new URLSearchParams(new URL(url).search);
      const page = urlParams.get('page');

      // Construct the Inertia visit with the page number and any existing filters
      const visitOptions = {
        preserveState: true,
        preserveScroll: true,
        data: {
          page: page,
          search: filters?.search || '',
        },
      };
      router.visit(url, visitOptions);
    }
  };

  const [searchTerm, setSearchTerm] = React.useState(filters?.search || '');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState(searchTerm);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timerId);
    }
  }, [searchTerm]);

  
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (debouncedSearchTerm !== filters?.search) {
      timeoutId = setTimeout(() => {
        router.visit(route(`${rootRoute}.index`), {
          preserveState: true,
          preserveScroll: true,
          data: {
            search: debouncedSearchTerm || null,
          },
          replace: true,
        });
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [debouncedSearchTerm]);
  return (
    <div>
      <div className="flex items-center py-4">
        {/* Search Bar */}
        <Input
          placeholder={`Filter the ${searchBar}`}
          value={searchTerm}
          onChange={(event) => {
             setSearchTerm(event.target.value);
          }}
          className="max-w-sm"
        />
        {/* {can(`${rootRoute}.create`) && */}
        
        <Link className=" flex items-center  btn-luxury btn-luxury-add p-2 ml-1  rounded-full text-sm capitalize" as='button' href={route(`${rootRoute}.create`)}> <LucidePlusCircle className="mr-2 capitalize" size={20} /> Add {rootRoute}</Link>
        {/* } */}


        {/* Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-auto">
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* main section */}

      <div className="overflow-hidden rounded-md border bg-white shadow-sm flex flex-col">

        {/* Table */}
        <Table className="w-fill table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-gray-600 text-white text-center capitalize p-1 border md:text-md sm:text-sm">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border dark:text-black p-1 text-center  ">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* /table */}

      </div>
      {/* /main section */}

      {/* pagination */}


      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-gray-500">
          Showing {from} to {to} of {total} results
        </div>

        <div className="space-x-2 flex flex-wrap justify-center">
          {pagination.length > 3 ? (
            <>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination[0].url === null}
                onClick={() => handlePageChange(pagination[0].url)}
                className={pagination[0].active ? 'bg-blue-500 text-white' : ''}
              >
                Previous
              </Button>
              {

                pagination.map((link, key) => {

                  // Display the first 5 buttons and the active button
                  if (key >= prevPage && key <= nextViewPage && key !== 0 && key !== lastPage) {
                    return (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        disabled={link.url === null}
                        onClick={() => handlePageChange(link.url)}
                        className={link.active ? 'bg-blue-500 text-white hover:bg-opacity' : ''}
                      >
                        {link.label}
                      </Button>
                    );
                  }
                  return null;
                })}
              <Button
                variant="outline"
                size="sm"
                disabled={pagination[lastPage].url === null}
                onClick={() => handlePageChange(pagination[lastPage].url)}
                className={pagination[lastPage].active ? 'bg-blue-500 text-white' : ''}
              >
                Next
              </Button>
            </>
          ) : (
            pagination.map((link, key) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                disabled={link.url === null}
                onClick={() => handlePageChange(link.url)}
                className={link.active ? 'bg-blue-500 text-white' : ''}
              >
                {link.label === '&laquo; Previous' ? 'Previous' : (link.label === 'Next &raquo;' ? 'Next' : link.label)}
              </Button>
            ))
          )}
        </div>
      </div>
      {/* /pagination */}
    </div>
  )
}