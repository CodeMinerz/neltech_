
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/PM/admin-layout/layout';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/PM/toast';
import useCheckbox from '@/hooks/use-checkbox';

export default function RoleForm({ ...props }) {

  const { record: role, isView, isEdit, permissions, rolePermissions } = props;
  const title = `${isView ? 'View' : (isEdit ? 'Edit' : 'Add')} | Role`
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: title,
      href: route('role.create'),
    },
  ];
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: role?.name  || "",
    permissions: rolePermissions || []
  });
   const { values: selectedPermissions, handleCheckboxChange: handlePermissionCheckboxChange } = useCheckbox(data.permissions);
   useEffect(() => {
        setData('permissions', selectedPermissions);
    }, [selectedPermissions, setData]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route('role.update', role.id));
    } else {
      post(route('role.store'), {
        onSuccess: () => reset(),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AdminLayout>
        <Toaster />
        <Head title={title} />
        <div className="lg:w-full m-3 lg:grid-cols-2">
          <div className="ml-auto">
            <Link className='btn-default m-2 flex items-center' as='button' href={route('role.index')} > <ArrowLeft className='mr-1' size={20} /> Back </Link>
          </div>
          <Card className='m-1 mt-0 flex flex-col'>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className='capitalize'>Role name</Label>
                    <Input
                      className='lg:w-100'
                      id="name"
                      type="text"
                      required
                      autoFocus
                      tabIndex={1}
                      autoComplete="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      disabled={processing || isView}
                      placeholder="Please enter the role name here"
                    />
                    <InputError message={errors.name} className="mt-2" />
                  </div>
                  <div className=' w-full'>

                    <h2 className='text-lg capitalize font-medium m-0 p-0 '>permissions list</h2>
                         <InputError message={errors.permissions} className="mt-2" />
                    <hr />
                  </div>
                  <div className=' flex grid lg:grid-cols-4  md:grid-cols-3 gap-2'>
                    {permissions.map((permission:any) =>
                      <Label 
                        key={permission} 
                        htmlFor={permission} 
                        className={
                          cn('flex mr-2 mb-0 hover:bg-gray-200 cursor-pointer py-2 px-1 transition duration-300 rounded-lg items-center text-sm capitalize',
                           !data.permissions.includes(permission) && isView ? 
                           'hidden' : '')}>
                        <input
                          type='checkbox'
                          className={cn('form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-2 mr-1', isView ? 'hidden' : '')}
                          value={permission}
                          checked={data.permissions.includes(permission)   && isEdit}
                          name="permissions"
                          disabled={data.permissions.includes(permission)  && isView}
                          onChange={(e) => handlePermissionCheckboxChange(permission, e.target.checked)}
                          id={permission}
                        />
                        {permission}

                      </Label>
                    )}

                  </div>
                </div>
                {!isView ? (
                  <Button type="submit" variant={'add'} className="mt-4 w-fit btn-add" tabIndex={5} disabled={processing || isView}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {processing ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Create'}
                  </Button>
                ) : (
                  <div></div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AppLayout>
  );
}
