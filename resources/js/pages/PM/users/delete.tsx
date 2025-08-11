import React, { useState, useEffect, FormEventHandler, useRef } from "react";
import { useForm } from '@inertiajs/react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "@/pages/PM/users/column";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";



interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: Users | null
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, user }) => {
    const confirmInput = useRef<HTMLInputElement>(null);
    const { delete: destroy, processing, reset, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });
    const [message, setMessage] = useState(false);
    const deleteUser: FormEventHandler = (e) => {

        e.preventDefault();
        console.log(user?.id)
        if(confirmInput.current?.value !== 'confirm'){
            return setMessage(true);
        }
       
        destroy(route('user.destroy', user?.id), {
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
                <DialogTitle>Are you sure you want to delete this account?</DialogTitle>
                <DialogDescription>
                    Once your deleted this account, all of its resources and data will also be permanently deleted. Please enter your password
                    to confirm you would like to permanently deleted this account.
                </DialogDescription>
                <form className="space-y-6" onSubmit={deleteUser} >
                    <div className="grid gap-2">

                        <Input
                            name="confirm"
                            type="text"
                            ref={confirmInput}
                            placeholder="Please type confirm"
                        />
                        {message && <InputError message='Please type "confirm" to delete the user' />}
                        
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={processing} asChild>
                            <button type="submit">Delete account</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )


}
export default DeleteUserModal