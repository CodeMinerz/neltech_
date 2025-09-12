import AppLayout from '@/components/PM/admin-layout/app-layout';
import AdminLayout from '@/components/PM/admin-layout/layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import DeleteModal from './PM/delete';


import { TriangleAlertIcon } from 'lucide-react';

interface PageWrapperProps {

    children?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    deleteTitle?: string;
    modalOpen: boolean;
    modalClose: (isClose:boolean) => void;
    selectedData:any;
    rootRoute:string;
    deleteDescription?: string;
    
}


/**
 * @template children for additional section (optional)
 * @template breadcrumbs has properties of title and url
 * @example breadcrumbs={title: 'Manage | user', url: 'route('user.index')'}
 * 
 * @template deleteTitle delete header title; 
 * @default "Are you sure want to delete this?"
 */

export function PageWrapper({ 
    children, 
    breadcrumbs = [],
    modalClose,
    modalOpen,
    deleteTitle,
    rootRoute,
    selectedData,
    deleteDescription,
       
}: PageWrapperProps) 
{

    return (    
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminLayout>
                <div className="flex h-full flex-1 w-full m-0 flex-col rounded-xl overflow-x-auto">
                    {children}
                </div>
            </AdminLayout>
            <DeleteModal isOpen={modalOpen} onClose={() => modalClose(false)} selectedData={selectedData} title={deleteTitle} rootRoute={rootRoute}>
                <div className="w-auto mr-2 mb-2">
                    <h1 className="flex flex-grid text-center font-semibold items-center">
                        Read this carefully<TriangleAlertIcon size={19} className="mr-2 flex "/>
                    </h1>
                </div>
                {deleteDescription}
                <br />
                <small className='text-gray-500'>Please type "confirm" to delete this</small>
            </DeleteModal>
        </AppLayout>
        
    );
 

}
