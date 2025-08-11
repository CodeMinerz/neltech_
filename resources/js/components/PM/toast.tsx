import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";



export const Toaster = () => {
    const { flash } = usePage<{ flash?: { success?: string; error?: string; } }>().props
    const toastProps =  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                }
        useEffect(() => {
    
           if (flash?.success || flash?.error) {
                if (flash.success) {
                    toast.success(flash.success, toastProps);
                } else if (flash.error) {
                    toast.error(flash.error, toastProps);
                }
            }
    
        },[flash]);

    return <ToastContainer/>

}