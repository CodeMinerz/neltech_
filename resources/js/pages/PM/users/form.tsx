
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';




import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast, ToastContainer, ToastContent } from 'react-toastify';
import AdminLayout from '@/components/PM/admin-layout/layout';
import { Roles } from '../roles/props';
import { cn } from '@/lib/utils';
import useCheckbox from '@/hooks/use-checkbox';

type UserForm = {
    username: string;
    f_name: string;
    l_name: string;
    b_date: any;
    phone_no: string;
    password: string;
    roles: Roles[]
};

export default function UserForm({ ...props }) {

    console.log(props)

    const { record, isView, isEdit, roles, userRoles } = props;

    const title = `${isView ? 'View' : (isEdit ? 'Edit' : 'Add')} | Users`
   
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: title,
            href: '/create',
        },
    ];
    const { data: userData, setData, post, put, processing, errors, reset } = useForm<Required<UserForm>>({
        username: record?.username || '',
        f_name: record?.f_name || '',
        l_name: record?.l_name || '',
        password: record?.password || '',
        b_date: record?.b_date || '',
        phone_no: record?.phone_no || '',
        roles: userRoles || []
    });

  const { values: selectedRoles, handleCheckboxChange: handleRoleCheckboxChange } = useCheckbox(userData.roles);
    
    useEffect(() => {
        setData('roles', selectedRoles);
    }, [selectedRoles, setData]);


    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('user.update', record.id));
        } else {
            post(route('user.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AdminLayout>
                <Head title={title} />
                <div className="ml-auto right-1">
                    <Link className='btn-default m-2 flex text-sm items-center' as='button' href={route('user.index')} >
                        <ArrowLeft className='mr-1' size={15} />
                        Back </Link>
                </div>
                <Card className='m-1 mt-1'>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="username"
                                        value={userData.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        disabled={processing || isView}
                                        placeholder="Username"
                                    />
                                    <InputError message={errors.username} className="mt-2" />
                                </div>
                                { (!isEdit && !isView &&
                                <div className="grid gap-2">
                                    
                                    
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={userData.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing || isView || isEdit}
                                        hidden={ isEdit || isView}
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="f_name">Firstname</Label>
                                    <Input
                                        id="f_name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="f_name"
                                        value={userData.f_name}
                                        onChange={(e) => setData('f_name', e.target.value)}
                                        disabled={processing || isView}
                                        placeholder="Firstname"
                                    />
                                    <InputError message={errors.f_name} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="l_name">Lastname</Label>
                                    <Input
                                        id="l_name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="l_name"
                                        value={userData.l_name}
                                        onChange={(e) => setData('l_name', e.target.value)}
                                        disabled={processing || isView}
                                        placeholder="Lastname"
                                    />
                                    <InputError message={errors.l_name} className="mt-2" />
                                </div>
                                <div className="grid gap-2 ">
                                    <Label htmlFor="b_date">Birthdate</Label>
                                    <Input
                                        id="b_date"
                                        type="date"
                                        required
                                        value={userData.b_date}
                                        onChange={(e) => setData('b_date', e.target.value)}
                                        disabled={processing || isView}
                                        placeholder="Birthdate"
                                    />
                                    <InputError message={errors.b_date} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone_no">Contact Number</Label>
                                    <Input
                                        id="phone_no"
                                        type="number"
                                        required
                                        tabIndex={2}
                                        autoComplete="phone_no"
                                        value={userData.phone_no}
                                        onChange={(e) => setData('phone_no', e.target.value)}
                                        disabled={processing || isView}
                                        placeholder="Contact Number"
                                    />
                                    <InputError message={errors.phone_no} />
                                </div>
                            </div>
                            <hr className='w-full' />
                            <Label className='text-lg font-medium'><h1>Roles</h1></Label>
                           <div className=' flex grid lg:grid-cols-4  md:grid-cols-3 gap-2'>
                            {roles.map((role:any) =>
                                <Label 
                                key={role} 
                                htmlFor={role} 
                                className={
                                    cn('flex mr-2 mb-0 hover:bg-gray-200 cursor-pointer py-2 px-1 transition duration-300 rounded-lg items-center text-sm capitalize',
                                    !selectedRoles.includes(role) && isView ? 
                                    'hidden' : '')}>
                                <input
                                    type='checkbox'
                                    className={cn('form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-2 mr-1', isView ? 'hidden' : '')}
                                    value={role}
                                    checked={selectedRoles.includes(role)  && isEdit}
                                    name="roles"
                                    disabled={userData.roles.includes(role)  && isView}
                                    onChange={(e) => handleRoleCheckboxChange(role, e.target.checked)}
                                    id={role}
                                />
                                {role}
                                </Label>
                            )}
                            </div>
                            {!isView ? (
                                <Button type="submit" variant={'luxury'} className="mt-4 w-fit btn-add" tabIndex={5} disabled={processing || isView}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    {processing ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update' : 'Create'} User
                                </Button>
                            ) : (
                                <div></div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </AdminLayout>
        </AppLayout>
    );
}
