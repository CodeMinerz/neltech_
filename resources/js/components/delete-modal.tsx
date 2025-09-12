import { Button } from '@/components/ui/button';
import { TriangleAlertIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    children?: ReactNode;
}

export function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Delete",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
    confirmText = "Delete",
    cancelText = "Cancel",
    children
}: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-rose  flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                {children ? (
                    children
                ) : (
                    <>
                        <div className="w-auto mr-2 mb-2">
                            <h1 className="flex flex-grid text-center font-semibold items-center">
                                {title}
                                <TriangleAlertIcon size={19} className="mr-2 flex ml-2" />
                            </h1>
                        </div>
                        <p className="text-justify">
                            {description}
                        </p>
                        <div className="flex justify-end space-x-2 mt-4">
                            <Button variant="outline" onClick={onClose}>
                                {cancelText}
                            </Button>
                            <Button variant="destructive" onClick={onConfirm}>
                                {confirmText}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}