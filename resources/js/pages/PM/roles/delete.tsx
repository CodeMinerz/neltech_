import React, { useState, useEffect, FormEventHandler, useRef, Children, ReactNode } from "react";
import { useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";



interface DeleteRoleModalProps {

    isOpen: boolean;
    onClose: () => void;
    selectedData:any
    children:ReactNode

}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ isOpen, onClose, selectedData, children }) => {
    const confirmInput = useRef<HTMLInputElement>(null);
    const { delete: destroy, processing, reset, clearErrors } = useForm(selectedData);
    const [message, setMessage] = useState(false);
    const handlerDelete: FormEventHandler = (e) => {

        e.preventDefault();
        if(confirmInput.current?.value !== 'confirm'){
            return setMessage(true);
        }
        destroy(route('role.destroy',selectedData.id), {
            preserveScroll: true,
            onSuccess: () => { onClose(), setMessage(false)},
            onError: () => confirmInput.current?.focus(),
            onFinish: () => {reset()},
        });
       
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete this?</DialogTitle>
                <DialogDescription className="text-destructive bg-muted px-2 py-4 rounded-sm">
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
                        {message && <InputError message='Please type "confirm" to delete th' />}
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button variant="destructive" disabled={processing} asChild>
                            <button type="submit">Delete</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


export default DeleteRoleModal