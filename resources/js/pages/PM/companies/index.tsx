import { Company, Props } from './props';
import { columns } from './columns';
import { BreadcrumbItem } from '@/types';
import { IndexLayout } from '@/components/PM/index-layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage | Companies',
    href: '/company',
  },
];

export default function CompanyIndex({ record, filters }: Props) {
  
  return (
    <IndexLayout<Company>
          record={record}
          filters={filters}
          breadcrumbs={breadcrumbs}
          columns={columns}
          rootRoute="company"
        />
  );
}
