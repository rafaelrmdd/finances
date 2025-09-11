import { SubmitHandler, useForm } from "react-hook-form";
import { CreateSaving, Saving, SavingCategoriesEnum, SavingContext } from "../../../../../context/SavingProvider";
import Modal from "react-modal";
import { useContext } from "react";
import { MdAccountBalance, MdBusiness, MdCardGiftcard, MdClose, MdDirectionsCar, MdFavorite, MdHealthAndSafety, MdSavings, MdSchool } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { useSavingsButtonManagement } from "@/hooks/savings/useSavingsButtonManagement";

interface AddSavingModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export function AddSavingModal({ isModalOpen, closeModal }: AddSavingModalProps) {
    Modal.setAppElement('body')

    const { createSaving } = useContext(SavingContext);

    const { 
        register,
        reset, 
        handleSubmit, 
        setValue, 
        formState: { errors } 
    } = useForm<CreateSaving>({
        defaultValues: {
            category: SavingCategoriesEnum.OTHER
        }
    });

    const {
        isCategoryActive,
        toggleCategory,
        resetCategory,
        categories
    } = useSavingsButtonManagement();

    const onSubmit: SubmitHandler<CreateSaving> = (data) => {
        closeModal();
        reset();

        //Save as DateTimeOffSet. Value setted at C# Saving Model
        const dateTimeOffset = new Date(data.targetDate).toISOString();

        const correctData = {
            name: data.name,
            description: data.description,
            category: data.category,
            targetAmount: data.targetAmount,
            targetDate: dateTimeOffset,
        }

        createSaving(correctData);
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
                    <h2 className="text-white text-2xl font-semibold">Add New Saving Goal</h2>

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
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.EMERGENCY);
                                    toggleCategory("emergency");
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("emergency") ? "border-blue-500" : "border-gray-600"}`}
                            >
                                <div className="p-2 rounded bg-red-200">
                                    <MdSavings className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Emergency</span>
                            </button>
                            
                            <button
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.VACATION);
                                    toggleCategory("vacation");
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("vacation") ? "border-blue-500" : "border-gray-600"}`}
                            >
                                <div className="p-2 rounded bg-purple-200">
                                    <MdCardGiftcard className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Vacation</span>
                            </button>
                            
                            <button
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.CAR);
                                    toggleCategory("car")
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("car") ? "border-blue-500" : "border-gray-600"}`}
                            >
                                <div className="p-2 rounded bg-blue-200">
                                    <MdDirectionsCar className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Car</span>
                            </button>
                            
                            <button
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.WEDDING);
                                    toggleCategory("wedding");
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("wedding") ? "border-blue-500" : "border-gray-600"}`}
                                >
                                <div className="p-2 rounded bg-pink-200">
                                    <MdFavorite className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Wedding</span>
                            </button>
                            
                            <button
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.RETIREMENT);
                                    toggleCategory("retirement");
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("retirement") ? "border-blue-500" : "border-gray-600"}`}
                            >
                                <div className="p-2 rounded bg-yellow-200">
                                    <MdAccountBalance className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Retirement</span>
                            </button>
                            
                            <button
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.EDUCATION);
                                    toggleCategory("education");
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("education") ? "border-blue-500" : "border-gray-600"}`}
                            >
                                <div className="p-2 rounded bg-green-200">
                                    <MdSchool className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Education</span>
                            </button>
                            
                            <button
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.BUSINESS);
                                    toggleCategory("business")
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("business") ? "border-blue-500" : "border-gray-600"}`}
                            >
                                <div className="p-2 rounded bg-orange-200">
                                    <MdBusiness className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Business</span>
                            </button>
                            
                            <button
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.INVESTMENT);
                                    toggleCategory("investment");
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("investment") ? "border-blue-500" : "border-gray-600"}`}
                            >
                                <div className="p-2 rounded bg-indigo-200">
                                    <GoGoal className="text-black" size={20} />
                                </div>
                                <span className="text-white text-xs">Investment</span>
                            </button>
                            
                            <button
                                onClick={() => {
                                    setValue("category", SavingCategoriesEnum.HEALTH);
                                    toggleCategory("health")
                                }}
                                type="button" 
                                className={`p-3 rounded-lg border-2 
                                bg-gray-700 hover:border-gray-500 transition-all flex flex-col 
                                items-center gap-2
                                ${isCategoryActive("health") ? "border-blue-500" : "border-gray-600"}`}
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
                            Add Goal
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}