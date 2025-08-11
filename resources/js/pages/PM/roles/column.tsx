
"use client"

import { Link, router } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Roles } from './props';
//import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"

import { TableActions } from '@/components/PM/table-actions';
import { TableStatusCell } from '@/components/PM/table-actions';


const handleActive = (id: string) => {

  router.put(`/role/active/${id}`, {

    preserveSroll: true

  })
}



export const columns = (
  setDeleteModal: (open: boolean) => void,
  setSelectedRole: (roles: Roles | null) => void):
  ColumnDef<Roles>[] => [

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
      accessorKey: "permissions",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Permissions
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {

        const permissions = row.original.permissions
        return (
          <div className="flex flex-col gap-1 text-center items-center">
            <div className="grid lg:grid-cols-7 mg:grid-cols-5 ">
              {permissions.map((permission) =>

                < span className='bg-green-100 grid text-green-800 text-xs font-medium mr-1 '> {permission.name}</span>

              )}
            </div>
          </div>

        )

      }
    },
    {
      accessorKey: "disabled",
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
            routePrefix="role"
            handleActive={handleActive}
            setDeleteModal={setDeleteModal}
            setSelectedRow={setSelectedRole}
            statusAccessor="disabled"
            statusActiveText="Deactivate"
            statusInactiveText="Activate"
          />
        );
      },
    },
  ]