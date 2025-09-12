# React Components Documentation

This documentation explains the reusable components and hooks created to reduce code duplication (WET code) and improve maintainability across the application.

## Table of Contents

1. [Page Wrapper Component](#page-wrapper-component)
2. [Data Table Page Component](#data-table-page-component)
3. [Delete Modal Component](#delete-modal-component)
4. [Data Table Hook](#data-table-hook)
5. [Breadcrumb Utilities](#breadcrumb-utilities)

## Page Wrapper Component

The `PageWrapper` component standardizes the layout structure for all pages, eliminating the need to manually import and configure `AppLayout` and `AdminLayout` components in each page.

### Usage

```tsx
import { PageWrapper } from '@/components/page-wrapper';
import { createUserBreadcrumb } from '@/lib/breadcrumbs';

const breadcrumbs = [createUserBreadcrumb()];

export default function MyPage() {
  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      <div>Your page content here</div>
    </PageWrapper>
  );
}
```

## Data Table Page Component

The `DataTablePage` component encapsulates the common patterns found in data table pages, handling state management, data table configuration, and UI elements.

### Usage

```tsx
import { DataTablePage } from '@/components/data-table-page';
import { columns } from '@/pages/PM/users/column';

export default function MyDataTablePage() {
  return (
    <DataTablePage
      data={data}
      columns={columns}
      searchBar='username'
      rootRoute='user'
      pagination={links}
      current_page={current_page}
      to={to ?? 0}
      from={from}
      total={total}
      filters={filters}
    />
  );
}
```

## Delete Modal Component

The `DeleteModal` component provides a standardized way to handle delete confirmations across the application.

### Usage

```tsx
import { DeleteModal } from '@/components/delete-modal';

export default function MyPage() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  return (
    <DeleteModal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      onConfirm={() => {
        // Handle delete logic here
        setIsDeleteModalOpen(false);
      }}
    >
      <div>Custom content for the delete modal</div>
    </DeleteModal>
  );
}
```

## Data Table Hook

The `useDataTable` hook provides standardized state management for data table pages, handling common patterns for edit modals and selected data.

### Usage

```tsx
import { useDataTable } from '@/hooks/use-data-table';

export default function MyPage() {
  const { 
    editModalOpen, 
    selectedData, 
    openEditModal, 
    closeEditModal, 
    setEditModalOpen, 
    setSelectedData 
  } = useDataTable<MyDataType>();
  
  return (
    // Use the hook values in your components
  );
}
```

## Breadcrumb Utilities

The breadcrumb utilities provide standardized ways to create breadcrumbs across the application.

### Usage

```tsx
import { createUserBreadcrumb, createRoleBreadcrumb } from '@/lib/breadcrumbs';

const userBreadcrumbs = [createUserBreadcrumb()];
const roleBreadcrumbs = [createRoleBreadcrumb()];
```

## Benefits of These Components

1. **Reduced Code Duplication**: Eliminates repetitive boilerplate code across pages
2. **Consistent UI**: Ensures a consistent look and feel across the application
3. **Easier Maintenance**: Changes to layout or common components only need to be made in one place
4. **Improved Developer Experience**: Simplifies creating new pages with standardized patterns
5. **Better Type Safety**: Provides clear TypeScript interfaces for all components and hooks

## Migration Guide

To migrate existing pages to use these new components:

1. Replace manual `AppLayout` and `AdminLayout` imports with `PageWrapper`
2. Replace direct `DataTable` usage with `DataTablePage`
3. Replace custom delete modal implementations with `DeleteModal`
4. Use `useDataTable` hook for state management
5. Use breadcrumb utilities for consistent breadcrumb creation

Example migration:

Before:
```tsx
import AppLayout from '@/components/PM/admin-layout/app-layout';
import AdminLayout from '@/components/PM/admin-layout/layout';
import { DataTable } from '@/components/PM/data-table';
import { useState } from 'react';

export default function UsersPage() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  return (
    <AppLayout breadcrumbs={[{ title: 'Users', href: route('user.index') }]}>
      <AdminLayout>
        <div className="flex h-full flex-1 w-full m-0 flex-col rounded-xl overflow-x-auto">
          <div className="m-0 py-2 w-full">
            <DataTable
              columns={columns}
              data={data}
              searchBar='username'
              rootRoute='user'
              pagination={links}
              current_page={current_page}
              to={to ?? 0}
              from={from}
              total={total}
              filters={filters}
            />
          </div>
        </div>
      </AdminLayout>
    </AppLayout>
  );
}
```

After:
```tsx
import { PageWrapper } from '@/components/page-wrapper';
import { DataTablePage } from '@/components/data-table-page';
import { useDataTable } from '@/hooks/use-data-table';
import { createUserBreadcrumb } from '@/lib/breadcrumbs';

const breadcrumbs = [createUserBreadcrumb()];

export default function UsersPage() {
  const { editModalOpen, selectedData: selectedUser, closeEditModal, setEditModalOpen, setSelectedData } = useDataTable<User>();
  
  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      <DataTablePage
        data={data}
        columns={columns(setEditModalOpen, closeEditModal, setSelectedData)}
        searchBar='username'
        rootRoute='user'
        pagination={links}
        current_page={current_page}
        to={to ?? 0}
        from={from}
        total={total}
        filters={filters}
      />
    </PageWrapper>
  );
}