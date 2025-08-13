import { ReactNode, useState } from "react";
import Modal from "react-modal";

interface AddTransactionModalContainerProps {
    children: ReactNode;
    isModalOpen: boolean;
}

export function AddTransactionModalContainer({ children, isModalOpen }: AddTransactionModalContainerProps) {
    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
        >
            {children}
        </Modal>
    )
}