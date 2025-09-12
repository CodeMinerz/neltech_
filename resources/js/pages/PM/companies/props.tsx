


export interface Company {
    id: string
    name: string
    code: string
    address: string
    tin?: string;
    sss_number?:string;
    pagibig_number?:string;
    disabled: boolean;
}


export interface Props {
    record: {
        data: Company[];
    };
    filters: {
        search: string;
        placeholder?: string;
    };
}
export interface FormProps {
    record: {
        data: Company;
    };
    isEdit?:boolean,
    isView?:boolean,
    routePrefix: string
}
