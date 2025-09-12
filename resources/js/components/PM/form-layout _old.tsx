
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/PM/admin-layout/layout';
import { Toaster } from '@/components/PM/toast';

interface FormLayoutProps <TData> {

    children?: ReactNode
    breadcrumbs?: BreadcrumbItem[]
    rootRoute: string
    props: {
        record?: TData[],
        isView: boolean,
        isEdit: boolean,
    }
}

export function FormLayoutProps<TData>({
    children, 
    breadcrumbs,
    rootRoute,
    props
} :  FormLayoutProps<TData>) {
  const { record: group, isView, isEdit} = props;
  const title = `${isView ? 'View' : (isEdit ? 'Edit' : 'Add')} | ${rootRoute.charAt(0).toUpperCase() + rootRoute.slice(1)}`
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AdminLayout>
        <Toaster />
        <Head title={title} />
        <div className="lg:w-full m-3 lg:grid-cols-2">
          <div className="ml-auto">
            <Link className='btn-default m-2 flex items-center' as='button' href={route(`${rootRoute}.index`)} > <ArrowLeft className='mr-1' size={20} /> Back </Link>
          </div>
          <Card className='m-1 mt-0 flex flex-col'>
            <CardHeader>
              <CardTitle className='capitalize'>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AppLayout>
  );
}
