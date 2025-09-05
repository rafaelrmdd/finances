import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { AddBudgetModal } from "../Modals/AddBudgetModal";

export function AddBudgetButton() {

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
                className="flex items-center px-3 py-2 gap-x-4 bg-blue-500 rounded-lg
                text-white hover:cursor-pointer"
            >
                <MdAdd className="text-xl"/>
                Create Budget
            </button>

            <AddBudgetModal 
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            />
        </>
    )
}