import { Users, Props } from './props';
import { columns } from '@/pages/PM/users/column';
import { BreadcrumbItem } from '@/types';
import { IndexLayout } from '@/components/PM/index-layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage | Users',
    href: '/dashboard',
  },
];
const deleteDescription = 
  "Once your deleted this account, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently deleted this account.";

export default function UserIndex({ record, filters } : Props  ) {
  return (
    <IndexLayout<Users>
      record={record}
      filters={filters}
      breadcrumbs={breadcrumbs}
      columns={columns}
      rootRoute="user"
      deleteDescription={deleteDescription}
    />
  );
}
