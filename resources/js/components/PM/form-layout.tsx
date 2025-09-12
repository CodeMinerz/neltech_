
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { ArrowLeft } from 'lucide-react';
import { FormEventHandler, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/PM/admin-layout/layout';
import { Toaster } from '@/components/PM/toast';

interface FormLayoutProps <TData > {

    children?: ReactNode
    rootRoute: string
    title: string
    
}

export function FormLayout<TData extends FormData>({
    children, 
    rootRoute,
    title,
} :  FormLayoutProps<TData>) {
const breadcrumbs: BreadcrumbItem[] = [
    {
      title: title,
      href: route(`${rootRoute}.index`),
    },
  ];

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
