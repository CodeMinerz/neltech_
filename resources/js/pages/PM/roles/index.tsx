import { Roles } from './props';
import { columns } from '@/pages/PM/roles/column';
import { BreadcrumbItem } from '@/types';
import GenericIndex from '@/pages/PM/index';
import { IndexLayout } from '@/components/PM/index-layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage | Roles',
    href: '/roles',
  },
];

const deleteDescription = 
  "Deleting this role, would be affect to all users has connected on this user.";

export default function RoleIndex({ record, filters }: { 
  record: { data: Roles[] }; 
  filters: { search: string; placeholder?: string } 
}) {
  return (
    <IndexLayout<Roles>
      record={record}
      filters={filters}
      breadcrumbs={breadcrumbs}
      columns={columns}
      rootRoute="role"
      deleteDescription={deleteDescription}
    />
  );
}