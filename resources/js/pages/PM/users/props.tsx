
import { useState } from "react"
import { Roles } from "../roles/props"
import { columns } from "./column"
import GenericIndex from ".."
import { BreadcrumbItem } from "@/types"


export type Users = {
  id: string
  username:string
  password?: string
  user_level: string
  l_name: string
  f_name: string
  mo_number: number
  b_date: string
  br_code?: string
  active?: boolean
  roles?: Roles[]
  phone_no?: number
}

export interface Props {
  record: {
    data: Users[];
    isEdit?: boolean
    isView?: boolean
    userRoles?: Roles[]
  };
  filters: {
    search: string;
    placeholder?: string;
  };
    
}