'use client'

import { Card } from "@/components/Card";
import { TopBar } from "@/components/TopBar";
import {
    MdAccountBalance,
    MdFilterList,
    MdSavings,
    MdSearch,
    MdTrendingUp,
} from "react-icons/md";
import { SavingCard } from "./components/SavingCard";
import { GoGoal } from "react-icons/go";
import Modal from "react-modal"
import { AddSavingButton } from "./components/Buttons/AddSavingButton"
import { useSavingsFilters } from "@/hooks/savings/useSavingsFilters";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function Savings() {
    Modal.setAppElement('body')

    const router = useRouter();
    const pathname = usePathname();

    const {
        filteredSavings,
        clearFilters,
        createQueryString,
    } = useSavingsFilters();

    const setInputSearchKeyword = (keyword: string, e: React.KeyboardEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;

        if(e.key === "Enter"){
            router.push(pathname + '?' + createQueryString(keyword, target.value))
        }
	}

	const setSelectSearchKeyword = (keyword: string, e: ChangeEvent<any>) => {
        router.push(pathname + '?' + createQueryString(keyword, e.target.value))
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
                        balance="1"
                        cardName="Total Saved"
                        cardBgColor="bg-blue-400"
				    />

                    <Card
                        icon={{
                            icon: GoGoal,
                            color: 'bg-green-200'
                        }}
                        balance="1"
                        cardName="Total Goals"
                        cardBgColor="bg-green-400"
				    />

                    <Card
                        icon={{
                            icon: MdTrendingUp,
                            color: 'bg-purple-200'
                        }}
                        balance="1"
                        cardName="Monthly Contributions"
                        cardBgColor="bg-purple-400"
				    />

                    <Card
                        icon={{
                            icon: MdAccountBalance,
                            color: 'bg-yellow-200'
                        }}
                        balance="1"
                        cardName="Remaining to Save"
                        cardBgColor="bg-yellow-400"
				    />
                </section>

                <main>
                    <div className="p-4 bg-gray-800 rounded-lg mb-6">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-white">Saving Goals</h2>

                            <AddSavingButton/>
                        </div>

                        <div className="flex gap-x-3 items-start">
                            <div className="relative bg-gray-700 rounded-lg w-96 text-white
                            placeholder:text-gray-600 border-white ">
                                <MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                                <input
                                    onKeyDown={(e) => {
                                        setInputSearchKeyword("keyword", e)
                                    }}
                                    className="w-full h-full p-[8.5px] pl-10 outline-0 border border-transparent focus:border-blue-500
                                    rounded-lg"
                                    type="text"
                                    placeholder="Search goals..."
                                />
                            </div>

                            <div 
                                className="flex items-center gap-x-2 bg-gray-700 rounded-lg 
                                px-3 py-2"
                            >
                                <MdFilterList className="text-white" />
                                <h3 className="text-white">Filters</h3>
                            </div>

                            <div className="bg-gray-700 rounded-lg">
                                <select
                                    onChange={(e) => {
                                        setSelectSearchKeyword("category", e)
                                    }}
                                    className="text-white bg-gray-700 w-36 border border-transparent
                                    focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
                                    name="categories"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="emergency">Emergency</option>
                                    <option value="vacation">Vacation</option>
                                    <option value="car">Car</option>
                                    <option value="wedding">Wedding</option>
                                    <option value="retirement">Retirement</option>
                                    <option value="education">Education</option>
                                    <option value="business">Business</option>
                                    <option value="investment">Investment</option>
                                    <option value="health">Health</option>
                                    <option value="technology">Technology</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* <div className="bg-gray-700 rounded-lg">
                                <select
                                    onChange={(e) => {
                                        setSearchKeyword("status", e)
                                    }}
                                    className="text-white px-3 py-2 bg-gray-700 border border-transparent 
                                    focus:border-blue-500 rounded-lg outline-0"
                                    name="time"
                                >
                                    <option value="30_days">All Status</option>
                                    <option value="7_days">On Track</option>
                                    <option value="this_month">Behind Schedule</option>
                                    <option value="last_month">Completed</option>
                                </select>
                            </div> */}
                        </div>
                    </div>

                    {/* Items */}
                    <div className="grid grid-cols-2 gap-4 items-start">
                        {filteredSavings.map((s) => (
                            <SavingCard
                                key={s.id}
                                saving={s}
                            />
                        ))}
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