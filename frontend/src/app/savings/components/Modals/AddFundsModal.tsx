'use client'

import Modal from "react-modal"
import React, { useContext, useEffect, useState } from 'react';
import { MdClose, MdAttachMoney } from 'react-icons/md';
import { SubmitHandler, useForm } from "react-hook-form";
import { formatMoney } from "@/utils/formatters";
import { Saving, SavingContext } from "../../../../../context/SavingProvider";

interface AddFundsModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    currentAmount: number;
    targetAmount: number;
    percentage: number;
    id: string;
    saving: Saving;
}

export interface AddFunds {
    amount: number
}

export function AddFundsModal({ 
    isModalOpen, 
    closeModal, 
    currentAmount,
    targetAmount,
    percentage,
    id,
    saving,

}: AddFundsModalProps) {
    Modal.setAppElement('body');

    const [amountInputValue, setAmountInputValue] = useState(0);
    const realTimePercentage = Math.min(((currentAmount + amountInputValue) / targetAmount) * 100, 100);

    const { 
        register,
        reset,
        setValue, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<AddFunds>({
        defaultValues: {
            amount: 0
        }
    });

    const { updateSaving } = useContext(SavingContext); 

    useEffect(() => {
        setValue('amount', Number(amountInputValue));
    })

    const onSubmit: SubmitHandler<AddFunds> = (data) => {
        console.log(data);
        reset()

        const updateData: Saving = {
            id: saving.id,
            name: saving.name,
            category: saving.category,
            currentAmount: saving.currentAmount + currentAmount,
            targetAmount: saving.targetAmount,
            targetDate: saving.targetDate,
            timestamp: saving.timestamp,
            description: saving.description
        }

        updateSaving({
            id,
            updateData
        });
    }

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            //background style
            overlayClassName={"fixed inset-0 backdrop-blur-sm bg-black/35 flex items-center justify-center z-50"}
            className={"flex items-center justify-center w-full"}
        >
            {/* Modal Overlay */}
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <MdAttachMoney className="text-white text-xl" />
                        </div>
                        <h2 
                            className="text-white text-xl font-semibold hover:cursor-"
                        >
                            Add Funds
                        </h2>
                    </div>
                    <button
                        onClick={closeModal} 
                        type="button"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <MdClose className="text-xl" />
                    </button>
                </div>

                <div className="mb-6">
                    <h3 className="text-gray-400 text-sm mb-1">Adding to</h3>
                    <p className="text-white font-medium">Dream Vacation</p>
                </div>

                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-gray-400 text-xs mb-1">Available Balance</h4>
                            <p className="text-green-400 font-semibold">$2,500.00</p>
                        </div>
                        <div>
                            <h4 className="text-gray-400 text-xs mb-1">Remaining to Target</h4>
                            <p className="text-blue-400 font-semibold">$8,500.00</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <label className="block text-gray-400 text-sm mb-2">
                            Amount to Add
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                $
                            </span>
                            <input
                                {...register("amount")}
                                name="amount"
                                type="number"
                                value={amountInputValue}
                                onChange={(e) => setAmountInputValue(Number(e.target.value))}
                                placeholder="0.00"
                                className="w-full bg-gray-700 text-white rounded-lg px-8 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-gray-400 text-sm mb-3">Quick Add</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <button 
                                onClick={() => setAmountInputValue(prev => prev + 100)}
                                type="button"
                                className="bg-gray-700 text-white py-2 px-3 rounded-lg 
                                hover:bg-gray-600 transition-colors text-sm">
                                $100
                            </button>
                            <button
                                onClick={() => setAmountInputValue(prev => prev + 500)} 
                                type="button"
                                className="bg-gray-700 text-white py-2 px-3 rounded-lg 
                                hover:bg-gray-600 transition-colors text-sm">
                                $500
                            </button>
                            <button 
                                onClick={() => setAmountInputValue(prev => prev + 1000)}
                                type="button"
                                className="bg-gray-700 text-white py-2 px-3 rounded-lg 
                                hover:bg-gray-600 transition-colors text-sm">
                                $1,000
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                        <h4 className="text-gray-400 text-sm mb-3">Current Progress</h4>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 text-sm">
                                ${formatMoney(currentAmount)} of ${formatMoney(targetAmount)}
                            </span>
                            <span className="text-blue-400 font-semibold">
                                {realTimePercentage ?? percentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-lg h-2">
                            <div 
                                className="w-full h-2 rounded-lg bg-gray-600"
                            >
                                <div 
                                    className={`bg-blue-500 p-1 rounded-lg h-full transition-all duration-150`} 
                                    style={{ width: `${realTimePercentage ?? percentage}%` }}
                                >
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button 
                            onClick={closeModal}
                            type="button"
                            className="flex-1 px-4 py-3 text-gray-400 bg-gray-700 rounded-lg
                            hover: cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit" 
                            className="flex-1 px-4 py-3 text-white bg-blue-500 rounded-lg
                            hover:bg-blue-600 transition duration-150 hover:cursor-pointer">
                            Add Funds
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}