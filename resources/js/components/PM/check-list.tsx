import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-dropdown-menu"


interface CheckListProps {
    isView: boolean,
    items: any
    isEdit: boolean
    setData: any
    data: any

}

 const CheckList: React.FC<CheckListProps> = ({data , items, isView, isEdit,setData}) => {

 const handleCheckboxChange = (permissionName:string, checked:boolean) => {
    if (checked) {
      setData("permissions", [...data.permissions, permissionName]);
    } else {
      setData("permissions", [...data.permissions.filter(name => name !== permissionName)]);
    }
  }

            return <div className=' flex grid lg:grid-cols-4  md:grid-cols-3 gap-2'>


                    {items.map((permission:any) =>
                    
                      
                      <Label 
                        key={permission} 
                        htmlFor={permission} 
                        className={
                          cn('flex mr-2 mb-0 hover:bg-gray-200 cursor-pointer py-2 px-1 transition duration-300 rounded-lg items-center text-sm capitalize',
                           !data.roles.includes(permission) && isView ? 
                           'hidden' : '')}>
                        <input
                          type='checkbox'
                          className={cn('form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-2 mr-1', isView ? 'hidden' : '')}
                          value={permission}
                          checked={data.roles.includes(permission)  && isEdit}
                          name="permissions"
                          disabled={data.roles.includes(permission)  && isView}
                          onChange={(e) => handleCheckboxChange(permission, e.target.checked)}
                          id={permission}
                        />
                        {permission}

                      </Label>
                    )}

                  </div>
}
export default CheckList
