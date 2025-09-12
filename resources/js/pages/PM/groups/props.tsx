


export type Groups = {
  id: string
  name: string
  code: string
  disabled: boolean
}

export interface Props {
    record: {
        data: Groups[];
    };
    filters: {
        search: string;
        placeholder?: string;
    };
}