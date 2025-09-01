'use client'

import { Card } from "@/components/Card";
import { TopBar } from "@/components/TopBar";
import {
    MdAccountBalance,
    MdAdd,
    MdFilterList,
    MdSavings,
    MdSearch,
    MdTrendingUp,
    MdClose, 
    MdDirectionsCar, 
    MdHome, MdSchool, 
    MdBusiness, 
    MdHealthAndSafety, 
    MdComputer, 
    MdFavorite, 
    MdCardGiftcard
} from "react-icons/md";
import { SavingCard } from "./components/SavingCard";
import { GoGoal } from "react-icons/go";
import { useState } from "react";
import Modal from "react-modal"
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Saving, SavingsCategoriesEnum } from "../../../context/SavingProvider";

export default function Savings() {
    Modal.setAppElement('body')
    
    const { 
        register,
        reset, 
        handleSubmit, 
        setValue, 
        formState: { errors } 
    } = useForm<Saving>({
        defaultValues: {
            category: SavingsCategoriesEnum.OTHER
        }
    });
    
    //temp variable
    const valueSpentPercentage = 50;
    
    // const [currentPage, setCurrentPage] = useState(1);
    // const [sliceBeginning, setSliceBeginning] = useState(0);
    // const [sliceLimit, setSliceLimit] = useState(10);
    // const transactionsPerPage = 10;
    // const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    // const canGoNextPage = currentPage < totalPages;
    // const canGoPreviousPage = sliceBeginning != 0;
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const openModal = () => {
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
    }
    
    const queryClient = useQueryClient();
	const createSavingMutation = useMutation({
        mutationFn: async (data: Saving) => {
            await fetch('https://localhost:5185/api/saving', {
                method: 'POST',
				body: JSON.stringify(data),
				headers: {'Content-type': 'application/json'}
			})
		},
		onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savings'] })
		},
	})

    const onSubmit: SubmitHandler<Saving> = (data) => {
        closeModal();
        reset();

        createSavingMutation.mutate(data);
    }
    
    return (
        <div className="w-full bg-gray-900">
            <TopBar />

            <div className="p-4 min-h-screen h-full bg-gray-900">
                <section className="grid grid-cols-4 gap-x-4 mb-8">
                    <Card
                        icon={{
                            icon: MdSavings,
                            color: 'bg-blue-200'
                        }}
                        percentage="12.5%"
                        balance="1"
                        cardName="Total Saved"
                        cardBgColor="bg-blue-400"
				    />

                    <Card
                        icon={{
                            icon: GoGoal,
                            color: 'bg-green-200'
                        }}
                        percentage="12.5%"
                        balance="1"
                        cardName="Total Goals"
                        cardBgColor="bg-green-400"
				    />

                    <Card
                        icon={{
                            icon: MdTrendingUp,
                            color: 'bg-purple-200'
                        }}
                        percentage="12.5%"
                        balance="1"
                        cardName="Monthly Contributions"
                        cardBgColor="bg-purple-400"
				    />

                    <Card
                        icon={{
                            icon: MdAccountBalance,
                            color: 'bg-yellow-200'
                        }}
                        percentage="12.5%"
                        balance="1"
                        cardName="Remaining to Save"
                        cardBgColor="bg-yellow-400"
				    />
                </section>

                <main>
                    <div className="p-4 bg-gray-800 rounded-lg mb-6">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-white">Saving Goals</h2>

                            <button
                                type="button"
                                onClick={openModal}
                                className="flex items-center gap-x-2 px-3 py-2 rounded-lg
                                bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600
                                transition duration-150"
                            >
                                <MdAdd className="text-xl" />
                                Add Saving Goal
                            </button>
                        </div>

                        <div className="flex gap-x-3 items-start">
                            <div className="relative bg-gray-700 rounded-lg w-96 text-white
                            placeholder:text-gray-600 border-white ">
                                <MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                                <input
                                    // onChange={(e) => setSearchKeyword(e.target.value)}
                                    className="w-full h-full p-[8.5px] pl-10 outline-0 border border-transparent focus:border-blue-500
                                    rounded-lg"
                                    type="text"
                                    placeholder="Search goals..."
                                />
                            </div>

                            <div className="flex items-center gap-x-2 bg-gray-700 rounded-lg px-3 py-2">
                                <MdFilterList className="text-white" />
                                <h3 className="text-white">Filter</h3>
                            </div>

                            <div className="bg-gray-700 rounded-lg">
                                <select
                                    className="text-white bg-gray-700 w-36 border border-transparent
                                    focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
                                    name="categories"
                                >
                                    <option value="all_categories">All Categories</option>
                                    <option value="income">Emergency</option>
                                    <option value="transportation">Vacation</option>
                                    <option value="food_and_drinking">Car</option>
                                    <option value="entertainment">Wedding</option>
                                    <option value="housing">Retirement</option>
                                    <option value="education">Education</option>
                                    <option value="education">Business</option>
                                    <option value="education">Investment</option>
                                    <option value="education">Health</option>
                                    <option value="education">Technology</option>
                                    <option value="education">Other</option>
                                </select>
                            </div>

                            <div className="bg-gray-700 rounded-lg">
                                <select
                                    className="text-white px-3 py-2 bg-gray-700 border border-transparent 
                                    focus:border-blue-500 rounded-lg outline-0"
                                    name="time"
                                >
                                    <option value="30_days">All Status</option>
                                    <option value="7_days">On Track</option>
                                    <option value="this_month">Behind Schedule</option>
                                    <option value="last_month">Completed</option>
                                </select>
                            </div>
                        </div>

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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.EMERGENCY)}
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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.VACATION)}
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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.CAR)}
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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.WEDDING)}
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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.RETIREMENT)}
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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.EDUCATION)}
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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.BUSINESS)}
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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.INVESTMENT)}
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
                                                onClick={() => setValue("category", SavingsCategoriesEnum.HEALTH)}
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
                                            Add Goal
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </div>

                    {/* Items */}
                    <div className="grid grid-cols-2 gap-4">
                        <SavingCard
                            name="teste"
                            description="teste"
                            targetAmount={1}
                            timestamp=""
                            category={SavingsCategoriesEnum.OTHER}
                            targetDate=""
                        />
                    </div>

                    <div className="mt-4">
                        <hr className="text-gray-700 mb-4" />

                        {/* Pagination */}
            
                        {/* <div className="flex justify-between items-center">
                            <span 
                                className="text-gray-400 text-[0.9rem]"
                            >
                                Showing  
                                {lengthOfFilteredTransactions < transactionsPerPage 
                                ? " " + lengthOfFilteredTransactions + " " 
                                : transactionsPerPage} 
                                of {transactions.length} transactions
                            </span>

                            <div className="flex items-start gap-x-3">
                                <div
                                    onClick={() => {
                                        if (canGoPreviousPage) {
                                            setCurrentPage((currentPage) - 1);
                                            setSliceBeginning((sliceBeginning) - transactionsPerPage)
                                            setSliceLimit((sliceLimit) + transactionsPerPage);
                                        }
                                    }}
                                    className="rounded-lg bg-gray-700 px-3 py-1 hover:cursor-pointer"
                                >
                                    <span className="text-gray-400">Previous</span>
                                </div>

                                <div className="rounded-lg bg-gray-700 px-3 py-1">
                                    <span className="text-gray-400">1</span>
                                </div>

                                <div className="rounded-lg bg-gray-700 px-3 py-1">
                                    <span className="text-gray-400">2</span>
                                </div>

                                <div className="rounded-lg bg-gray-700 px-3 py-1">
                                    <span className="text-gray-400">3</span>
                                </div>

                                <div
                                    onClick={() => {
                                        if (canGoNextPage) {
                                            setCurrentPage((currentPage) + 1);
                                            setSliceBeginning((sliceBeginning) + transactionsPerPage)
                                            setSliceLimit((sliceLimit) + transactionsPerPage);
                                        }
                                    }}
                                    className="rounded-lg bg-gray-700 px-3 py-1 hover:cursor-pointer"
                                >
                                    <span className="text-gray-400">Next</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </main> 
            </div>
        </div>
    )
}