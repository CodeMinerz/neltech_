import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/components/PM/admin-layout/app-layout';
import { type BreadcrumbItem } from '@/types';
import { columns } from '@/pages/PM/roles/column';

import { DataTable, } from '@/components/PM/data-table';
import { useState } from 'react';
import AdminLayout from '@/components/PM/admin-layout/layout';

import { Roles, Props } from './props';
import { TriangleAlertIcon } from 'lucide-react';
import DeleteModal from '@/components/PM/delete-prompt';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage | Roles',
        href: '/roles',
    },
];

export default function Index({ record, filters }: Props) {

    const { data, links, current_page, from, to, total } = record;
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedRole, setSeletedRole] = useState<Roles | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminLayout>
                <div className="flex h-full flex-1 w-full m-0 flex-col rounded-xl  overflow-x-auto">
                    <div className="container m-0 py-2 w-full">
                        <DataTable
                            columns={columns(
                                setEditModalOpen, 
                                setSeletedRole)}
                            data={data}
                            searchBar='name'
                            pagination={links}
                            from={from}
                            to={to}
                            current_page={current_page}
                            total={total}
                            filters={filters}
                            rootRoute='role'
                        />
                    </div>
                </div>
                {
                    <DeleteModal isOpen={editModalOpen} onClose={() =>setEditModalOpen(false)} selectedData={selectedRole} >
                        <div className="w-auto mr-2 mb-2">
                        <h1 className="flex flex-grid text-center font-semibold items-center">
                            Read this carefully<TriangleAlertIcon size={19} className="mr-2 flex "/>
                        </h1>
                        </div>
                        <p className="text-justify"> Once your deleted this role, it would affect to all users who asigned on this role and also this role will be permanently deleted. Please type "confirm" you would like to permanently deleted this role.</p>
                    </DeleteModal>
                }
            </AdminLayout>
        </AppLayout>
    )
}