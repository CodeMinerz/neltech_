

export type Users = {
  id: string
  user_level: string
  l_name: string
  f_name: string
  mo_number: number
  b_date: string
  username: string
  br_code: string
  active: boolean
  roles: any
}

export interface Props {
    record: {
        data: Users[];
        links: any[];
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number | null;
        total: number;

    };
    filters: {
        search: string;
    };

}