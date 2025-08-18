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
} from "react-icons/md";
import { SavingsCard } from "./components/SavingsCard";
import { GoGoal } from "react-icons/go";
import { useState } from "react";

export default function Savings() {
    //temp variable
    const valueSpentPercentage = 50;

    // const [currentPage, setCurrentPage] = useState(1);
    // const [sliceBeginning, setSliceBeginning] = useState(0);
    // const [sliceLimit, setSliceLimit] = useState(10);
    // const transactionsPerPage = 10;
    // const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    // const canGoNextPage = currentPage < totalPages;
    // const canGoPreviousPage = sliceBeginning != 0;

    return (
        <div className="w-full bg-gray-800">
            <TopBar />

            <div className="p-4 min-h-screen h-full bg-gray-800">
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
                    <div className="p-4">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-white">Saving Goals</h2>

                            <button
                                // onClick={openModal}
                                className="flex items-center gap-x-2 px-3 py-2 rounded-lg
                                bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600
                                transition duration-150"
                            >
                                <MdAdd className="text-xl" />
                                Add Goal
                            </button>
                        </div>

                        <div className="flex gap-x-3 items-start mb-16">
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
                    </div>

                    {/* Items */}
                    <div className="grid grid-cols-2 gap-4">
                        <SavingsCard/>
                        <SavingsCard/>
                        <SavingsCard/>
                        <SavingsCard/>
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