import { useCallback, useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { Budget, BudgetContext, UpdateBudget } from "../../../../../context/BudgetProvider";
import { MdAttachMoney, MdCalendarToday, MdCategory, MdClose, MdDescription, MdKeyboardArrowDown, MdPieChart } from "react-icons/md";
import { CategoriesEnum } from "../../../../../context/TransactionProvider";

interface EditBudgetModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    budget: Budget;
}

interface EditBudgetModalFormProps {
    name: string,
    category: CategoriesEnum,
    amount: string,
    description: string,
    startDate: string,
    endDate: string,
    timestamp: string,
}

export function EditBudgetModal({
    isModalOpen,
    closeModal,
    budget
}: EditBudgetModalProps) {
    Modal.setAppElement('body');

    const { updateBudget } = useContext(BudgetContext);

    const isCategoryActive = (category: string) => {
        return category === budget.category
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setValue,
        reset
    } = useForm<EditBudgetModalFormProps>({
        //When Modal is opened, current item's values will be displayed at the inputs
        defaultValues: {
            name: budget.name,
            category: budget.category,
            amount: budget.amount,
            description: budget.description,
            startDate: budget.startDate ? new Date(budget.startDate).toISOString().split('T')[0] : '',
            endDate: budget.endDate ? new Date(budget.endDate).toISOString().split('T')[0] : '',
            timestamp: budget.timestamp,
        }
    });

    //React Form's default values are only defined once, when the form is mounted
    //So the useEffect changes its values everytime the modal is opened
    useEffect(() => {
        if (isModalOpen) {
            reset({
                name: budget.name,
                category: budget.category,
                amount: budget.amount,
                description: budget.description,
                startDate: budget.startDate ? new Date(budget.startDate).toISOString().split('T')[0] : '',
                endDate: budget.endDate ? new Date(budget.endDate).toISOString().split('T')[0] : '',
                timestamp: budget.timestamp,
            });
        }
    }, [budget, isModalOpen, reset]);

    const onSubmit: SubmitHandler<EditBudgetModalFormProps> = (data) => {
        closeModal();
        reset();

        const updateData: UpdateBudget = {
            name: data.name,
            category: data.category,
            amount: data.amount,
            startDate: data.startDate,
            endDate: data.endDate,
            description: data.description
        }

        updateBudget({
            id: budget.id,
            updateData
        });
    }

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            //background style
            overlayClassName={"fixed inset-0 backdrop-blur-sm bg-black/35 flex items-center justify-center z-50"}
            className={"flex items-center justify-center"}
        >
            <div className="p-6 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <MdAttachMoney className="text-white text-xl" />
                        </div>
                        <h2 
                            className="text-white text-xl font-semibold hover:cursor-"
                        >
                            Edit Budget
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

                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Budget Name <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <MdPieChart className="absolute left-3 top-3 text-gray-400 text-lg" />
                                <input
                                    {...register("name")}
                                    name="name"
                                    type="text"
                                    placeholder="e.g., Monthly Food Budget"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Budget Amount <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <MdAttachMoney className="absolute left-3 top-3 text-gray-400 text-lg" />
                                <input
                                    {...register("amount")}
                                    name="amount"
                                    type="number"
                                    placeholder="0.00"
                                    step="0.01"                        
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category and Period Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Category <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <MdCategory className="absolute left-3 top-3 text-gray-400 text-lg z-10" />
                                <MdKeyboardArrowDown className="absolute right-3 top-3 text-gray-400 text-lg pointer-events-none" />
                                <select 
                                    {...register("category")}
                                    name="category"
                                    className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                                >
                                    <option className="text-gray-400">Select a category</option>
                                    <option 
                                        value="food" 
                                        selected={isCategoryActive("food")}
                                    >
                                        🍽️ Food & Dining
                                    </option>

                                    <option 
                                        value="transportation" 
                                        selected={isCategoryActive("transportation")}
                                    >
                                        🚗 Transportation
                                    </option>

                                    <option 
                                        value="entertainment"
                                        selected={isCategoryActive("entertainment")}
                                    >
                                        🎬 Entertainment
                                    </option>
                                    <option 
                                        value="housing"
                                        selected={isCategoryActive("housing")}
                                    >
                                        🏠 Housing
                                    </option>
                                    <option 
                                        value="shopping"
                                        selected={isCategoryActive("shopping")}
                                    >
                                        🛍️ Shopping
                                    </option>
                                    <option 
                                        value="healthcare"
                                        selected={isCategoryActive("healthcare")}
                                    >
                                        🏥 Healthcare
                                    </option>
                                    <option 
                                        value="utilities"
                                        selected={isCategoryActive("utilities")}
                                    >
                                        ⚡ Utilities
                                    </option>
                                    <option 
                                        value="education"
                                        selected={isCategoryActive("education")}
                                    >
                                        📚 Education
                                    </option>
                                    <option 
                                        value="other"
                                        selected={isCategoryActive("other")}
                                    >
                                        📦 Other
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Budget Period <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <MdCalendarToday className="absolute left-3 top-3 text-gray-400 text-lg z-10" />
                                <MdKeyboardArrowDown className="absolute right-3 top-3 text-gray-400 text-lg pointer-events-none" />
                                <select 
                                    //Register later
                                    className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="" className="text-gray-400">Select period</option>
                                    <option value="weekly">📅 Weekly</option>
                                    <option value="monthly">🗓️ Monthly</option>
                                    <option value="quarterly">📆 Quarterly</option>
                                    <option value="yearly">🗓️ Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Start and End Date Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Start Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register("startDate")}
                                name="startDate"
                                type="date"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                End Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                {...register("endDate")}
                                name="endDate"
                                type="date"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <div className="relative">
                            <MdDescription className="absolute left-3 top-3 text-gray-400 text-lg" />
                            <textarea
                                {...register("description")}
                                name="description"
                                rows={3}
                                placeholder="Add any notes or description for this budget..."
                        
                                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="px-4 py-3 rounded-lg bg-gray-700
                            transition duration-150 hover:cursor-pointer text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-3 rounded-lg bg-blue-500 hover:bg-blue-600
                            transition duration-150 hover:cursor-pointer text-white"
                        >
                            Edit Budget
                        </button>
                    </div>  
                </form>
            </div>
        </Modal>
    )
}