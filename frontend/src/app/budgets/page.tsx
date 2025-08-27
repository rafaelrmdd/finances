'use client'

import { useContext, useState } from "react";
import { CategoriesEnum } from "../../../context/TransactionProvider";
import { Card } from "../../components/Card";
import { TopBar } from "../../components/TopBar";
import Modal from "react-modal"
import { 
    MdAccountBalanceWallet, 
    MdKeyboardDoubleArrowUp, 
    MdKeyboardDoubleArrowDown,
    MdAdd,
    MdRestaurant,
    MdTrendingUp,
    MdSearch,
    MdFilterList,
    MdEdit,
    MdDelete,
    MdMoreVert,
    MdWarning,
    MdCheckCircle,
    MdTrendingDown,
    MdClose,
    MdPieChart,
    MdAttachMoney,
    MdCategory,
    MdCalendarToday,
    MdDescription,
    MdNotifications,
    MdRepeat,
    MdSave,
    MdCancel,
    MdKeyboardArrowDown
} from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { BudgetContext } from "../../../context/BudgetProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatMoney } from "@/utils/formatters";

export default function Budgets() {
    Modal.setAppElement('body')

    interface BudgetFormInputs {
		id: string;
		name: string;
        amount: string;
		category: CategoriesEnum;
        startDate: Date;
        endDate: Date;
		description?: string;
	}

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setValue,
        reset
    } = useForm<BudgetFormInputs>();

    const { budgets } = useContext(BudgetContext);

    const queryClient = useQueryClient();
	const createTransactionMutation = useMutation({
		mutationFn: async (data: BudgetFormInputs) => {
			await fetch('https://localhost:5185/api/budget', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {'Content-type': 'application/json'}
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['budgets'] })
		},
	})

    const onSubmit: SubmitHandler<BudgetFormInputs> = (data) => {
        closeModal();
        reset();

        createTransactionMutation.mutate(data);
    }

    return (
        <div className="w-full">
            <TopBar />

            <div className="px-4 py-4 min-h-screen bg-gray-900 h-full">
                <section className="grid grid-cols-4 gap-x-4 mb-8">
                    <Card
                        icon={{
                            icon: MdAccountBalanceWallet,
                            color: 'bg-blue-200'
                        }}
                        percentage="0%"
                        balance="3.800.00"
                        cardName="Total Budgeted"
                        cardBgColor="bg-blue-400"
                    />

                    <Card 
                        icon={{
                            icon: MdKeyboardDoubleArrowUp,
                            color: 'bg-red-200',
                        }}
                        percentage="0%"
                        balance="3.061.20"
                        cardName="Total Spent"
                        cardBgColor="bg-red-400"
                    />

                    <Card 
                        icon={{
                            icon: MdKeyboardDoubleArrowDown,
                            color: 'bg-green-200'
                        }}
                        percentage="0%"
                        balance="738.00"
                        cardName="Remaining Budget"
                        cardBgColor="bg-green-400"
                    />

                    <Card
                        icon={{
                            icon: MdTrendingUp,
                            color: 'bg-purple-200'
                        }}
                        percentage="0%"
                        balance="1.00"
                        cardName="Active Budgets"
                        cardBgColor="bg-purple-400"
                    />
                </section>

                <main>
                    <div className="w-full bg-gray-800 p-4 rounded-lg mb-8">
                        <div className="flex justify-between mb-8">
                            <h1 className="text-2xl text-white font-semibold">Budget Management</h1>
                            <button
                                onClick={openModal}
                                className="flex items-center px-3 py-2 gap-x-4 bg-blue-500 rounded-lg
                                text-white"
                            >
                                <MdAdd className="text-xl"/>
                                Create Budget
                            </button>
                        </div>

                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-white font-semibold">Overall Budget Progress</h2>
                                <h3 className="text-gray-400 text-[0.9rem]">This Month</h3>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <h3 className="text-gray-400 text-[0.9rem]">Spent: $3250</h3>
                                    <h3 className="text-gray-400 text-[0.9rem]">Budget: $5000</h3>
                                </div>

                                <div 
                                    className="w-full h-3 rounded-lg mb-1 bg-gray-600"
                                >
                                    {/* w-[] must be conditional */}
                                    <div 
                                        className={`bg-green-500 w-[65%] p-1 rounded-lg h-full transition-all duration-300`}
                                    >
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <h3 className="text-green-400 text-[0.9rem] font-semibold">65% spent</h3>
                                    <h3 className="text-white text-[0.9rem]">$1750 remaining</h3>
                                </div>
                            </div>

                            <Modal
                                isOpen={isModalOpen}
                                onRequestClose={closeModal}
                                //background style
                                overlayClassName={"fixed inset-0 backdrop-blur-sm bg-black/35 flex items-center justify-center z-50"}
                                className={"flex items-center justify-center"}
                            >
                                <div className="p-6 bg-gray-800 rounded-lg">
                                    <form 
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-6"
                                    >
                                        
                                        {/* Budget Name and Amount Row */}
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
                        </div>
                    </div>

                    <div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-700 text-white">
                                    <th className="px-6 py-4 font-semibold rounded-tl-lg">Category</th>
                                    <th className="px-6 py-4 font-semibold">Budget</th>
                                    <th className="px-6 py-4 font-semibold">Spent</th>
                                    <th className="px-6 py-4 font-semibold">Remaining</th>
                                    <th className="px-6 py-4 font-semibold">Progress</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {budgets?.map((b) => (
                                    <tr className="bg-gray-800 text-white">
                                        <td className="px-6 py-4">
                                            <h3 className=" font-semibold">{b.name}</h3>
                                            <span className="text-gray-400 text-[0.9rem]">{b.description}</span>
                                            <span className="text-gray-400 text-[0.9rem]">{b.category}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <h3 className="text-gray-400">{formatMoney(b.amount)}</h3>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="">$650.00</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="">$150.00</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Progress */}
                                            <div 
                                                className="w-full h-2 rounded-lg bg-gray-600"
                                            >
                                                {/* w-[] must be conditional */}
                                                <div 
                                                    className={`bg-yellow-500 w-[81.3%] p-1 rounded-lg h-full transition-all duration-300`}
                                                >
                                                </div>
                                            </div>
                                            <span className="text-yellow-400 text-[0.8rem]">81.3%</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col mb-1">
                                                <span className="text-gray-500 text-[0.8rem]">Start - 17/01/2004</span>
                                                <span className="text-gray-500 text-[0.8rem]">End - 17/01/2006</span>
                                            </div>
                                            <span 
                                                className="text-yellow-400 text-[0.9rem] flex items-center gap-x-2"
                                            >
                                                <MdWarning className="text-yellow-400" />
                                                Near Limit                                                                                    
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 ">
                                            <div className="flex text-gray-500 gap-x-4 text-[1.2rem] items-center justify-center]">
                                                <MdEdit className="hover:text-blue-400"/>
                                                <MdDelete className="hover:text-red-400"/>
                                                <MdMoreVert className="hover:"/>
                                            </div>
                                        </td>
                                    </tr>

                                    
                                ))}    

                                <tr className="bg-gray-800 text-white">
                                    <td className="px-6 py-4">
                                        <h3 className=" font-semibold">Food & Dinning</h3>
                                        <span className="text-gray-400 text-[0.9rem]">Foods, test, test</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <h3 className="text-gray-400">$100.00</h3>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="">$650.00</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="">$150.00</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* Progress */}
                                        <div 
                                            className="w-full h-2 rounded-lg bg-gray-600"
                                        >
                                            {/* w-[] must be conditional */}
                                            <div 
                                                className={`bg-yellow-500 w-[81.3%] p-1 rounded-lg h-full transition-all duration-300`}
                                            >
                                            </div>
                                        </div>
                                        <span className="text-yellow-400 text-[0.8rem]">81.3%</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col mb-1">
                                            <span className="text-gray-500 text-[0.8rem]">Start - 17/01/2004</span>
                                            <span className="text-gray-500 text-[0.8rem]">End - 17/01/2006</span>
                                        </div>
                                        <span 
                                            className="text-yellow-400 text-[0.9rem] flex items-center gap-x-2"
                                        >
                                            <MdWarning className="text-yellow-400" />
                                            Near Limit                                                                                    
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="flex text-gray-500 gap-x-4 text-[1.2rem] items-center justify-center]">
                                            <MdEdit className="hover:text-blue-400"/>
                                            <MdDelete className="hover:text-red-400"/>
                                            <MdMoreVert className="hover:"/>
                                        </div>
                                    </td>
                                </tr>                                                        
                            </tbody>
                        </table>

                        <div className="rounded-b-lg bg-gray-800 h-10 w-full">
                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}