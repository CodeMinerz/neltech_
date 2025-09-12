import { DataTable } from '@/components/PM/data-table';
import { type ColumnDef } from '@tanstack/react-table';

interface DataTablePageProps<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    searchBar: string;
    rootRoute: string;
    pagination: any[];
    current_page: number;
    from: number;
    to: number;
    total: number;
    filters: { search: string };
}

export function DataTablePage<TData, TValue>({
    data,
    columns,
    searchBar,
    rootRoute,
    pagination,
    current_page,
    from,
    to,
    total,
    filters
}: DataTablePageProps<TData, TValue>) {
    return (
        <div className="flex h-full flex-1 w-full m-0 flex-col rounded-xl overflow-x-auto">
            <div className="m-0 py-2 w-full">
                <DataTable<TData, TValue>
                    columns={columns}
                    data={data}
                    searchBar={searchBar}
                    rootRoute={rootRoute}
                    pagination={pagination}
                    current_page={current_page}
                    to={to ?? 0}
                    from={from}
                    total={total}
                    filters={filters}
                />
            </div>
        </div>
    );
}