
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Groups } from './props';
import { FormLayout } from '@/components/PM/form-layout';
import { useForm } from '@/hooks/use-form';
import { Button } from '@/components/ui/button';

export default function Form({
  record,
  isView = false,
  isEdit = false,
  rootPrefix
}: {
  record?: Groups;
  isView?: boolean;
  isEdit?: boolean;
  rootPrefix: string;
}) {

  
  const title = `${isView ? 'View' : (isEdit ? 'Edit' : 'Add')} | ${rootPrefix}`
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: title,
      href: route(`${rootPrefix}.index`),
    },
  ];
  const { data, setData, post, put, processing, errors, reset } = useForm<Groups>({
    initialData: {
      id: record?.id || '',
      name: record?.name || '',
      code: record?.code || '',
      disabled: record?.disabled || false,
    }
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(route(`${rootPrefix}.update`, record?.id));
    } else {
      post(route(`${rootPrefix}.store`));
    }
  };

  return (
    <FormLayout
      rootRoute={rootPrefix}
      title={title}
    >
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name || record?.name || ''}
              onChange={(e) => setData('name', e.target.value)}
              disabled={isView}
            />
            <InputError message={errors.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Code</Label>
            <Input
              id="code"
              value={data.code || record?.code || ''}
              onChange={(e) => setData('code', e.target.value)}
              disabled={isView}
            />
            <InputError message={errors.code} />
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
        </div>
        {!isView && (
          <Button type="submit" variant={'add'} className="mt-4 w-fit" tabIndex={5}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        )}
      </form>
    </FormLayout>
  );
}
