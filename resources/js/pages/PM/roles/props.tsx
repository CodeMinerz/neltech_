
export type Roles = {

    id: string
    name: string
    guard_name: string
    permissions: [
        name: any
    ]
    disabled: boolean;
}

export type Props = {
    record: {
        data: Roles[];
        links: any[]
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number ;
        total: number;
        
    };
    filters: {
        search: string
    }

}