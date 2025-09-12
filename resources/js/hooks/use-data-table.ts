import { useState } from 'react';

export function useDataTable<T>() {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState<T | null>(null);

    const openEditModal = (data?: T) => {
        if (data) {
            setSelectedData(data);
        }
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedData(null);
    };

    return {
        editModalOpen,
        selectedData,
        openEditModal,
        closeEditModal,
        setEditModalOpen, // For opening edit modal with boolean
        setSelectedData,  // For setting selected data
    };
}