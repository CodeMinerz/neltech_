

"use client"

import { Link, router } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Users } from './props';
//import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { TableActions } from '@/components/PM/table-actions';
import { TableStatusCell } from '@/components/PM/table-actions';


const handleActive = (id: string) => {

  router.put(`/user/active/${id}`, {

    preserveScroll: true

  })
}
export const columns = (
  setDeleteModal: (open: boolean) => void,
  setSelectedUser: (user: Users | null) => void):
  ColumnDef<Users>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fullname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "user_level",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )

    },
    cell: ({ row }) => {

      
        const roles = row.original.roles
        return (
          <div className="flex flex-col gap-1 text-center">
            <div className="grid lg:grid-cols-7 mg:grid-cols-5 ">
              {roles?.map((role:any) =>
                < span className=' text-xs capitalize grid text-green-800 bg-green-100 px-2 py-1 rounded-lg w-full font-medium mr-1 '> {role.name}</span>
              )}
            </div>
          </div>

        )

      }
  },
    {
      accessorKey: "active",
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
        return <TableStatusCell isActive={row.original.active} activeText='Active' inactiveText='Diactivate' />;
      }
    },
    {
      id: "isActive",
      header: 'Options',
      cell: ({ row }) => {
        return (
          <TableActions
            row={row.original}
            routePrefix="user"
            handleActive={handleActive}
            setDeleteModal={setDeleteModal}
            setSelectedRow={setSelectedUser}
            statusAccessor="active"
            statusActiveText="Deactivate"
            statusInactiveText="Activate"
          />
        );
      },
    },
  ]