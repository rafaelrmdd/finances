import { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Budget, BudgetContext } from "../../../../../context/BudgetProvider";
import { EditBudgetModal } from "../Modals/EditBudgetModal";

export function EditBudgetButton({ budget }: { budget: Budget }) {

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
                className="text-gray-400 w-4 h-4 hover:cursor-pointer"
            />

            <EditBudgetModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                budget={budget}
            />

        </>
    )
}