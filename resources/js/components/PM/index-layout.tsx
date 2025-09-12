import { useState } from 'react';
import { PageWrapper } from '@/components/page-wrapper';
import { DataTable } from '@/components/PM/data-table';
import { BreadcrumbItem } from '@/types';
interface GenericIndexProps<T> {
    breadcrumbs: BreadcrumbItem[];
    record: { data?: T[] };
    filters: {
        search: string,
        placeholder?: string
    };
    columns: (setEditModalOpen: (open: boolean) => void, setSelectedData: (data: T | null) => void) => any;
    rootRoute: string;
    deleteDescription?: string;
}


export function IndexLayout<T>({
    breadcrumbs,
    record,
    filters ,
    columns,
    rootRoute,
    deleteDescription = 'Once you delete this record, all of its resources and \
    data will also be permanently deleted.\
     Please confirm you would like to permanently delete this record.',
}: GenericIndexProps<T>) {
    const { data } = record;
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<T | null>(null);

    return (
        <PageWrapper
            breadcrumbs={breadcrumbs}
            modalOpen={editModalOpen}
            modalClose={setEditModalOpen}
            selectedData={selectedData}
            rootRoute={rootRoute}
            deleteDescription={deleteDescription}
        >
        <DataTable
            data={data}
            columns={columns(setEditModalOpen, setSelectedData)}
            filters={filters}
            rootRoute={rootRoute}
        />
        </PageWrapper>
    );
}