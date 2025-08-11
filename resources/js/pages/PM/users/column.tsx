"use client"

import { Link, router } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
//import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';



export type Users = {
  id: string
  user_level: string
  l_name: string
  f_name: string
  mo_number: number
  b_date: string
  username: string
  br_code: string
  active: boolean
  roles: any
}
/* 

const handleDelete = (id: string) => {
  router.delete(`/user/${id}`,{
    preserveScroll:true
  })
} *//* 

const handleEdit = (id: string) => {
  route('user.edit', id)
}

 */

const handleActive = (id: string) => {

  router.put(`/user/active/${id}`, {

    preserveSroll:true

  })
} 


export const columns = (setIsModalOpen:(open:boolean)=>void, 
  setDeleteModal:(open:boolean)=>void,
  setSelectedUser:(user:Users | null) => void ): 
  ColumnDef<Users>[] => [
  /* {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }, */
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
              {roles.map((role:any) =>
                < span className=' text-xs capitalize grid text-green-800 px-2 py-1 rounded-lg w-full font-medium mr-1 '> {role.name}</span>
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
    },cell: ({row}) => {

        return <span  className={cn('rounded-md px-4 py-1 font-bolder text-white ', 
          row.original.active 
          ? 'text-green-500 ' 
          : 'text-rose-500')}>
            { row.original.active ? 'ACTIVE' : "DEACTIVATED"}
          </span>

    }
  },
  {
    id: "actions",
    header: 'Action',
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className='cursor-pointer'
              onClick={() => {
             setSelectedUser(user); setDeleteModal(true) 
            }}
            >
             Delete
            </DropdownMenuItem >
            <DropdownMenuItem className='p-0'>
              <Link className='w-full flex p-2' href={route('user.show', user.id)}>View User</Link> 
            </DropdownMenuItem>
            <DropdownMenuItem className='p-0'
            /* onClick={() => {
            
             setSelectedUser(user); setEditModalOpen(true) 
            }} */
            ><Link className='w-full flex p-2' href={route('user.edit', user.id)}>Edit User</Link> 
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={ () => {
              handleActive(user.id)
            }
            }
            >{ user.active ? 'Deactivate' : 'Activate'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }, 
  },
]