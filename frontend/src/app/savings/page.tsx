'use client'

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
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
import { ChangeEvent, useContext } from "react";
import { SavingsFilters } from "./components/SavingsFilters";
import { useSavingsMoneyManagement } from "@/hooks/savings/useSavingsMoneyManagement";
import { useSavingsPagement } from "@/hooks/savings/useSavingsPagement";
import { SavingContext } from "../../../context/SavingProvider";

export default function Savings() {
    Modal.setAppElement('body')

    const { savings = [] } = useContext(SavingContext);
    
    const {
        filteredSavings,
    } = useSavingsFilters();

    const {
        canGoNextPage,
        canGoPreviousPage,
        savingsPerPage,
        sliceLimit,
        sliceBeginning,
        lengthFilteredSavings,
        currentPage,
        setCurrentPage,
        setSliceLimit,
        setSliceBeginning,
    } = useSavingsPagement(filteredSavings);

    const { 
        remainingToSave,
        totalSaved,
        goalsLength,
    } = useSavingsMoneyManagement(); 

    return (
        <div className="w-full bg-gray-900">
            <Header />

            <div className="p-4 min-h-screen h-full bg-gray-900">
                <section className="grid grid-cols-4 gap-x-4 mb-8">
                    <Card
                        icon={{
                            icon: MdSavings,
                            color: 'bg-blue-200'
                        }}
                        balance={totalSaved}
                        cardName="Total Saved"
                        cardBgColor="bg-blue-400"
				    />

                    <Card
                        icon={{
                            icon: GoGoal,
                            color: 'bg-green-200'
                        }}
                        balance={goalsLength}
                        cardName="Total Goals"
                        cardBgColor="bg-green-400"
				    />

                    {/* I need to think better about this card */}
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
                        balance={remainingToSave}
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

                        <SavingsFilters />
                    </div>

                    {/* Items */}
                    <div className="grid grid-cols-2 gap-4 items-start">
                        {filteredSavings.map((s) => (
                            <SavingCard
                                key={s.id}
                                saving={s}
                            />
                        )).slice(sliceBeginning, sliceLimit)}
                    </div>

                    <div className="mt-4">
                        <hr className="text-gray-700 mb-4" />

                        <div className="flex justify-between items-center">
                            <span 
                                className="text-gray-400 text-[0.9rem]"
                            >
                                Showing  
                                {lengthFilteredSavings < savingsPerPage 
                                ? " " + lengthFilteredSavings + " " 
                                : " " + savingsPerPage + " "} 
                                of {savings.length} transactions
                            </span>

                            <div className="flex items-start gap-x-3">
                                <div
                                    onClick={() => {
                                        if (canGoPreviousPage) {
                                            setCurrentPage((currentPage) - 1);
                                            setSliceBeginning((sliceBeginning) - savingsPerPage)
                                            setSliceLimit((sliceLimit) - savingsPerPage);
                                        }
                                    }}
                                    className="rounded-lg bg-gray-800 px-3 py-1 hover:cursor-pointer"
                                >
                                    <span className="text-gray-400">Previous</span>
                                </div>

                                {/* <div className="rounded-lg bg-gray-700 px-3 py-1">
                                    <span className="text-gray-400">1</span>
                                </div>

                                <div className="rounded-lg bg-gray-700 px-3 py-1">
                                    <span className="text-gray-400">2</span>
                                </div>

                                <div className="rounded-lg bg-gray-700 px-3 py-1">
                                    <span className="text-gray-400">3</span>
                                </div> */}

                                <div
                                    onClick={() => {
                                        if (canGoNextPage) {
                                            setCurrentPage((currentPage) + 1);
                                            setSliceBeginning((sliceBeginning) + savingsPerPage)
                                            setSliceLimit((sliceLimit) + savingsPerPage);
                                        }
                                    }}
                                    className="rounded-lg bg-gray-800 px-3 py-1 hover:cursor-pointer"
                                >
                                    <span className="text-gray-400">Next</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main> 
            </div>
        </div>
    )
}