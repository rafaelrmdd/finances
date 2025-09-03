import { useState } from "react";
import { AddSavingModal } from "../Modals/AddSavingModal";
import { MdAdd } from "react-icons/md";

export function AddSavingButton() {

    const [isModalOpen, setIsModalOpen] = useState(false);
        
    const openModal = () => {
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="flex items-center gap-x-2 px-3 py-2 rounded-lg
                bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600
                transition duration-150"
            >
                <MdAdd className="text-xl" />
                Add Saving Goal
            </button>

            <AddSavingModal 
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            />
        </>

    )
}