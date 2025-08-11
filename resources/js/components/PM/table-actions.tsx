// resources/js/components/ui/table-actions.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
//import { can } from "@/lib/can";

interface TableActionsProps<T> {
  row: T;
  routePrefix: string;
  handleActive: (id: string) => void;
  setDeleteModal: (open: boolean) => void;
  setSelectedRow: (row: T | null) => void;
  statusAccessor: keyof T;
  statusActiveText?: string;
  statusInactiveText?: string;
}

export function TableActions<T extends { id: any }>({
  row,
  routePrefix,
  handleActive,
  setDeleteModal,
  setSelectedRow,
  statusAccessor,
  statusActiveText = 'Deactivate',
  statusInactiveText = 'Activate',
}: TableActionsProps<T>) {
  const item = row;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className='cursor-pointer'
          onClick={() => {
            setSelectedRow(item);
            setDeleteModal(true);
          }}
        >
          Delete
        </DropdownMenuItem>
         <DropdownMenuItem className='p-0'>
          <Link className='w-full flex p-2' href={route(`${routePrefix}.show`, item.id)}>View</Link>
        </DropdownMenuItem>
         <DropdownMenuItem className='p-0'>
          <Link className='w-full flex p-2' href={route(`${routePrefix}.edit`, item.id)}>Edit</Link>
        </DropdownMenuItem>
         
        <DropdownMenuItem className='cursor-pointer' onClick={() => handleActive(item.id)}>
          {(item[statusAccessor] as any) ? statusActiveText : statusInactiveText}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// resources/js/components/ui/table-status-cell.tsx

interface TableStatusCellProps<T> {
  isActive: boolean;
  activeText?: string;
  inactiveText?: string;
}

export function TableStatusCell({
  isActive,
  activeText = 'ACTIVE',
  inactiveText = 'DEACTIVATED',
}: TableStatusCellProps<any>) {
  return (
    <span className={cn(
      'rounded-md px-4 py-1 cursor-pointer text-bolder text-white ',
      isActive ? 'bg-green-500 hover:text-black hover:bg-800' : 'bg-rose-500 text-white'
    )}>
      {isActive ? activeText : inactiveText}
    </span>
  );
}