import React, { useState, useEffect, FormEventHandler, useRef, Children, ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { useForm } from '@/hooks/use-form';



interface DeleteModalProps {
    
/**
     * @isOpen : Modal Open
     * @OnClose : Modal Close
     * @selectedData : 'user.id'
     * @title : default = 'Are you sure you want to delete this?'
     * @confirmInput = useRef<HTMLInputElement>(null);
     * @useForm (selectedData)  = { delete: destroy, processing, reset, clearErrors };
     * @useState (false) =  [message, setMessage] ;
     * @handlerDelete : FormEventHandler = (e)
     * 
     */
    isOpen: boolean;
    onClose: () => void;
    selectedData:any
    children?: ReactNode
    title?: string
    rootRoute: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ 
    isOpen, 
    onClose, 
    selectedData, 
    children, 
    rootRoute,
    title = "Are you sure you want to delete this?" 
    }) => 
        {
    const confirmInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, clearErrors } = useForm<Required<{confirm: string}>>({
      initialData: {confirm: ''},
      onSuccess: () => { onClose(), setMessage(false)},
      onError: () => confirmInput.current?.focus(),
      onFinish: () => {reset()}
    });
    const [message, setMessage] = useState(false);
    const handlerDelete: FormEventHandler = (e) => {
        
        e.preventDefault();
        if(confirmInput.current?.value !== 'confirm'){
            return setMessage(true);
        }
        destroy(route(`${rootRoute}.destroy`,selectedData.id), {
            preserveScroll: true,
        });
       
    };
    const closeModal = () => {
        clearErrors();
        reset();
    };

    // Only render the dialog on the client side to prevent hydration errors
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    if (!isClient) {
        return null;
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription className="text-destructive bg-rose-100 px-2 py-4 rounded-sm">
                   {children}
                </DialogDescription>
                <form className="space-y-6" onSubmit={handlerDelete} >
                    <div className="grid gap-2">
                        <Input
                            name="confirm"
                            type="text"
                            ref={confirmInput}
                            placeholder="Please type confirm"
                        />
                        {message && <InputError message='Please type "confirm" to delete this' />}
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="destructive" asChild>
                            <button type="submit">Delete</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default DeleteModal;