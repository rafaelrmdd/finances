import { useState } from "react";
import { AddFundsModal } from "../Modals/AddFundsModal";
import { Saving } from "../../../../../context/SavingProvider";

interface AddFundsButton {
    currentAmount: string;
    targetAmount: string;
    percentage: number;
    id: string;
    saving: Saving;
}

export function AddFundsButton({ currentAmount, targetAmount, percentage, id, saving }: AddFundsButton) {

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
                className="px-4 py-3 text-white bg-blue-500 rounded-lg hover:cursor-pointer
                hover:bg-blue-600 transition duration-150"
            >
                Add Funds
            </button>

            <AddFundsModal 
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                currentAmount={currentAmount}
                targetAmount={targetAmount}
                percentage={percentage}
                id={id}
                saving={saving}
            />
        </>
    )
}