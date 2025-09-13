import { FormEventHandler, useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormLayout } from '@/components/PM/form-layout';
import { useForm } from '@/hooks/use-form';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

export default function CompanyForm({  ...props }) {
  const { record: company, isView, isEdit, rootPrefix, groups } = props;  
  const title = `${isView ? 'View' : (isEdit ? 'Edit' : 'Add')} | Company`;

  const { data, setData, post, put, processing, errors, reset } = useForm({
    initialData : {
      id: company?.id || '',
      name: company?.name || '',
      code: company?.code || '',
      address_line: company?.address_line || '',
      region_code: company?.region_code || '',
      province_code: company?.province_code || '',
      city_municipality_code: company?.city_municipality_code || '',
      barangay_code: company?.barangay_code || '',
      disabled: company?.disabled || false,
      group : groups || []
    }
  });
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route('company.update', company.id));
    } else {
      post(route('company.store'), {
        onSuccess: () => reset(),
      });
    }
  };
  useEffect(() => {
    return () => {
      reset();
    };
  } , []);
  
  return (
    <FormLayout rootRoute={rootPrefix} title = {title}>
      <form className="flex flex-col gap-6 " onSubmit={submit}>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name || ''}
              onChange={(e) => setData('name', e.target.value)}
              disabled={isView}
            />
            <InputError message={errors.name} />
          </div>
          {/* code */}
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={data.code || data?.code || ''}
              onChange={(e) => setData('code', e.target.value)}
              disabled={isView}
            />
            <InputError message={errors.code} />
          </div>
        </div>
        <div className="grid  lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="group">From Group</Label>
            
            <select
              id="group"
              value={data.group}
              onChange={(e) => setData('group', e.target.value)}
              disabled={isView}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a group</option>
              {groups.map((group: any) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="disabled">Status</Label>
            <select
              id="disabled"
              value={data.disabled ? '1' : '0'}
              onChange={(e) => setData('disabled', e.target.value === '1')}
              disabled={isView}
              className="w-full p-2 border rounded"
            >
              <option value="0">Active</option>
              <option value="1">Disabled</option>
            </select>
          </div>
          <div className="space-y-2 lg:col-span-2">
            <section className='font-medium text-lg'>
              <h1>Other Information</h1>
              <Label htmlFor="address_line"><h1 className='font-medium'>Address: </h1></Label>
            </section>
            <div className="grid lg:grid-cols-3">
             <select
                id="region_code"
                value={data.region_code || ''}
                onChange={(e) => setData('region_code', e.target.value)}
                disabled={isView}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">Select a region</option>
                {/* Options should be populated dynamically */}
              </select>
            </div>
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
    </FormLayout>
  );
}
