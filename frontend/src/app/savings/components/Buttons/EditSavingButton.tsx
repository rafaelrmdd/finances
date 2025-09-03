import { useState } from "react";
import { AddFundsModal } from "../Modals/AddFundsModal";
import { Saving } from "../../../../../context/SavingProvider";
import { EditSavingModal } from "../Modals/EditSavingModal";
import { MdEdit } from "react-icons/md";

interface AddFundsButton {
    saving: Saving;
}

export function EditSavingButton({ saving }: AddFundsButton) {

    const [isModalOpen, setIsModalOpen] = useState(false);
        
    const openModal = () => {
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <MdEdit
                onClick={openModal}
                className="hover:text-blue-400"
            />

            <EditSavingModal
                saving={saving}
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            />
        </>
    )
}