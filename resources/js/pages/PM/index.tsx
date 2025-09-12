import { useState } from 'react';
import { BreadcrumbItem } from '../../types';
import { PageWrapper } from '../../components/page-wrapper';
import { DataTable } from '../../components/PM/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface IndexProps<T> {
  record: {
    data: T[];
  };
  filters: {
    search: string;
    placeholder?: string;
  };
  breadcrumbs: BreadcrumbItem[];
  columns: (...args: any[]) => ColumnDef<T, any>[];
  rootRoute: string;
  deleteDescription?: string;
  entityName: string;
}

export default function IndexPage<T>({
  record,
  filters,
  breadcrumbs,
  columns,
  rootRoute,
  deleteDescription,
  entityName
}: IndexProps<T>) {
  const { data } = record;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<T | null>(null);

  // Generate columns with the required parameters
  let generatedColumns: ColumnDef<T, any>[];
  try {
    // Try with two parameters first
    generatedColumns = columns(setEditModalOpen, setSelectedRecord);
  } catch (error) {
    try {
      // If that fails, try with three parameters
      generatedColumns = columns(() => {}, setEditModalOpen, setSelectedRecord);
    } catch (error2) {
      // If both fail, use columns directly
      generatedColumns = columns as unknown as ColumnDef<T, any>[];
    }
  }

  return (
    <PageWrapper
      breadcrumbs={breadcrumbs}
      modalOpen={editModalOpen}
      modalClose={setEditModalOpen}
      deleteDescription={deleteDescription}
      selectedData={selectedRecord}
      rootRoute={rootRoute}
    >
      <DataTable
        data={data}
        columns={generatedColumns}
        filters={filters}
        rootRoute={rootRoute}
      />
    </PageWrapper>
  );
}