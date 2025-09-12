"use client"

import {router } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Company } from './props';
import { Button } from "@/components/ui/button"
import { TableActions } from '@/components/PM/table-actions';
import { TableStatusCell } from '@/components/PM/table-actions';


const handleActive = (id: string) => {
  router.put(`/companies/active/${id}`, {
    preserveScroll: true

  })
}



export const columns = (
  setDeleteModal: (open: boolean) => void,
  setSelectedRecord: (company: Company | null) => void):
  ColumnDef<Company>[] => [

    {
      accessorKey: "id",
      header: "ID",

    },

    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "code",
      header: ({ column }) => {
        return (
          <Button
          className='capitalize'
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Code
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return (
          <Button
          className='capitalize'
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Address
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <TableStatusCell isActive={!row.original.disabled} />;
      }
    },
    {
      id: "actions",
      header: 'Options',
      cell: ({ row }) => {
        return (
          <TableActions
            row={row.original}
            routePrefix="company"
            handleActive={handleActive}
            setDeleteModal={setDeleteModal}
            setSelectedRow={setSelectedRecord}
            statusAccessor="disabled"
            statusActiveText="Deactivate"
            statusInactiveText="Activate"
          />
        );
      },
    },
  ]