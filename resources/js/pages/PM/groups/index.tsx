import { Groups, Props } from './props';
import { columns } from '@/pages/PM/groups/columns';
import { BreadcrumbItem } from '@/types';
import IndexPage from '@/pages/PM/index';
import { IndexLayout } from '@/components/PM/index-layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage | Groups',
    href: '/groups',
  },
];

export default function GroupIndex({ record, filters }: Props) {
  
  return (
    <IndexLayout<Groups>
          record={record}
          filters={filters}
          breadcrumbs={breadcrumbs}
          columns={columns}
          rootRoute="group"
        />
  );
}
