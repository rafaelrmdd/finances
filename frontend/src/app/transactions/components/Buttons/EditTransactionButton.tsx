import { useState } from "react";
import { EditTransactionModal } from "../Modals/EditTransactionModal";
import { MdEdit } from "react-icons/md";
import { Transaction } from "../../../../../context/TransactionProvider";

interface EditTransactionButtonProps {
    transaction: Transaction;
}

export function EditTransactionButton({
    transaction
}: EditTransactionButtonProps) {

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

            <EditTransactionModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                transaction={transaction}
            />
        </>
    )
}