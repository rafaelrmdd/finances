import { SubmitHandler, useForm } from "react-hook-form";
import { Budget, BudgetContext, CreateBudget } from "../../../../../context/BudgetProvider";
import { useContext } from "react";
import { 
    MdAttachMoney, 
    MdCalendarToday, 
    MdCategory, MdClose, MdDescription,
    MdKeyboardArrowDown, 
    MdPieChart 
} from "react-icons/md";
import Modal from "react-modal";

interface AddBudgetModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export function AddBudgetModal({
    isModalOpen,
    closeModal,
}: AddBudgetModalProps) {
    Modal.setAppElement('body');

    const { 
        createBudget, 
    } = useContext(BudgetContext);

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setValue,
        reset
    } = useForm<CreateBudget>();

    const onSubmit: SubmitHandler<CreateBudget> = (data) => {
        console.log('category: ', data.category);
        closeModal();
        reset();

        createBudget(data);
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
                            Add Budget
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
                                    <option className="text-gray-400 ">Select a category</option>
                                    <option value="food">🍽️ Food & Dining</option>
                                    <option value="transportation">🚗 Transportation</option>
                                    <option value="entertainment">🎬 Entertainment</option>
                                    <option value="housing">🏠 Housing</option>
                                    <option value="shopping">🛍️ Shopping</option>
                                    <option value="healthcare">🏥 Healthcare</option>
                                    <option value="utilities">⚡ Utilities</option>
                                    <option value="education">📚 Education</option>
                                    <option value="other">📦 Other</option>
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
                            Add Budget
                        </button>
                    </div>  
                </form>
            </div>
        </Modal>
    )
}