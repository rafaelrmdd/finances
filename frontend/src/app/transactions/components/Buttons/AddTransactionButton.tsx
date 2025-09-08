import { useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { AddTransactionModal } from "../Modals/AddTransactionModal";

export function AddTransactionButton() {

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
                onClick={openModal}
                className="flex items-center gap-x-2 px-3 py-2 rounded-lg
                bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600
                transition duration-150"
            >
                <MdAdd className="text-xl" />
                Add Transaction
            </button>

            <AddTransactionModal 
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            />
        </>
    )
}