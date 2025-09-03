import Modal from "react-modal";
import { Saving, SavingCategoriesEnum, SavingContext } from "../../../../../context/SavingProvider";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdAccountBalance, MdBusiness, MdCardGiftcard, MdClose, MdDirectionsCar, MdFavorite, MdHealthAndSafety, MdSavings, MdSchool } from "react-icons/md";
import { GoGoal } from "react-icons/go";

type EditSaving = Omit<Saving, 'id'>

interface EditSavingModalProps {
    saving: EditSaving
    isModalOpen: boolean;
    closeModal: () => void;
}

interface EditSavingModalFormProps {
    name: string;
    description: string;
    category: string;
    targetAmount: number;
    targetDate: string;
    currentAmount: number;
    timestamp: Date
}

export function EditSavingModal({ saving, isModalOpen, closeModal, }: EditSavingModalProps) {
    Modal.setAppElement('body')

    const { updateSaving } = useContext(SavingContext);

    const { 
        register,
        reset, 
        handleSubmit, 
        setValue, 
        formState: { errors } 
    } = useForm<EditSavingModalFormProps>({
        defaultValues: {
            name: saving.name,
            description: saving.description,
            category: saving.category,
            targetAmount: saving.targetAmount,
            targetDate: saving.targetDate ? new Date(saving.targetDate).toISOString().split('T')[0] : '',
            currentAmount: saving.currentAmount,
            timestamp: saving.timestamp
        }
    });

    const onSubmit: SubmitHandler<Saving> = (data) => {
        closeModal();
        reset();

        const dateTimeOffset = new Date(data.targetDate).toISOString();

        // updateSaving(data);
    }

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            //background style
            overlayClassName={"fixed inset-0 backdrop-blur-sm bg-black/35 flex items-center justify-center z-50 "}
            className={"flex items-center justify-center"}
        >
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg mx-4 relative max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-2xl font-semibold">Edit Saving Goal</h2>

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
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Goal Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            {...register("name")}
                            name="name"
                            type="text"
                            placeholder="e.g. Emergency Fund, New Car, Dream Vacation..."
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 
                            focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>
        
                    <div>
                        <label className="block text-white text-sm font-medium mb-3">
                            Category
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.EMERGENCY)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-blue-500 
                                bg-gray-700 transition-all flex flex-col items-center gap-2"
                            >
                                <div className="p-2 rounded bg-red-200">
                                    <MdSavings className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Emergency</span>
                            </button>
                            
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.VACATION)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-gray-600 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col items-center gap-2"
                            >
                                <div className="p-2 rounded bg-purple-200">
                                    <MdCardGiftcard className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Vacation</span>
                            </button>
                            
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.CAR)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-gray-600 
                                bg-gray-700 hover:border-gray-500 transition-all 
                                flex flex-col items-center gap-2"
                            >
                                <div className="p-2 rounded bg-blue-200">
                                    <MdDirectionsCar className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Car</span>
                            </button>
                            
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.WEDDING)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-gray-600 
                                bg-gray-700 hover:border-gray-500 transition-all flex 
                                flex-col items-center gap-2"
                                >
                                <div className="p-2 rounded bg-pink-200">
                                    <MdFavorite className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Wedding</span>
                            </button>
                            
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.RETIREMENT)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-gray-600 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2"
                            >
                                <div className="p-2 rounded bg-yellow-200">
                                    <MdAccountBalance className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Retirement</span>
                            </button>
                            
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.EDUCATION)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-gray-600 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2"
                            >
                                <div className="p-2 rounded bg-green-200">
                                    <MdSchool className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Education</span>
                            </button>
                            
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.BUSINESS)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-gray-600 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2"
                            >
                                <div className="p-2 rounded bg-orange-200">
                                    <MdBusiness className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Business</span>
                            </button>
                            
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.INVESTMENT)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-gray-600 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2"
                            >
                                <div className="p-2 rounded bg-indigo-200">
                                    <GoGoal className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Investment</span>
                            </button>
                            
                            <button
                                onClick={() => setValue("category", SavingCategoriesEnum.HEALTH)}
                                type="button" 
                                className="p-3 rounded-lg border-2 border-gray-600 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2"
                            >
                                <div className="p-2 rounded bg-teal-200">
                                    <MdHealthAndSafety className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Health</span>
                            </button>
                        </div>
                    </div>
        
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Goal Amount ($) <span className="text-red-400">*</span>
                        </label>
                        <input
                            {...register("targetAmount")}
                            name="targetAmount"
                            type="number"
                            placeholder="0.00"
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 
                            focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>
        
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Target Date <span className="text-red-400">*</span>
                        </label>
                        <input
                            {...register("targetDate")}
                            name="targetDate"
                            type="date"
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 
                            focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    </div>
        
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">
                            Description 
                        </label>
                        <textarea
                            {...register("description")}
                            name="description"
                            placeholder="Describe your saving goal..."
                            rows={3}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 
                            focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        />
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={closeModal}
                            type="button"
                            className="flex-1 px-4 py-2 text-gray-300 bg-gray-700 
                            rounded-lg border border-gray-600 hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 px-4 py-2 text-white bg-blue-500 
                            rounded-lg hover:bg-blue-600 transition duration-150 
                            hover:cursor-pointer"
                        >
                            Edit Saving
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}