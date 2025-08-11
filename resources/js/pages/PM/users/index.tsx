import AppLayout from '@/components/PM/admin-layout/app-layout';
import AdminLayout from '@/components/PM/admin-layout/layout';
import {DataTable} from '@/components/PM/data-table';
import { Users,Props } from './props';
import { useState } from 'react';
import { columns } from '@/pages/PM/users/column';

import { usePage } from '@inertiajs/react';
import DeleteUserModal from './delete';


export default function Index( {record, filters }: Props) {

    const {data, links, current_page, from ,to, total } = record;
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Users | null>(null);

    return (
        <AppLayout breadcrumbs={[{ title: 'Users', href: route('user.index') }]}>
           <AdminLayout>
                <div className="flex h-full flex-1 w-full m-0 flex-col rounded-xl overflow-x-auto">
                    <div className="m-0 py-2 w-full">
                        <DataTable<Users>
                            columns={columns(() => {},setEditModalOpen, setSelectedUser)}
                            data={data}
                            searchBar='username'
                            rootRoute='user'
                            pagination={links}
                            current_page={current_page}
                            to={to ?? 0}
                            from={from}
                            total={total}
                            filter={filters}
                        />
                    </div>
                </div>
                <DeleteUserModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} user={selectedUser} />
            </AdminLayout>
        </AppLayout>
    );
}