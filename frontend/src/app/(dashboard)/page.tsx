'use client'

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { useSavingsMoneyManagement } from "@/hooks/savings/useSavingsMoneyManagement";
import { useTransactionsMoneyManagement } from "@/hooks/transaction/useTransactionsMoneyManagement";
import { useContext } from "react";
import { FiTarget } from "react-icons/fi";
import { MdAccountBalanceWallet, MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown, MdTrendingUp, MdPieChart, MdSavings } from "react-icons/md";
import { TransactionContext } from "../../../context/TransactionProvider";
import { formatDate, formatMoney } from "@/utils/formatters";

export default function Home() {
    const { transactions = [] } = useContext(TransactionContext);

    const {
        balance,
        currentMonthTotalExpense,
        currentMonthTotalIncome,
        percentageSpent,
        totalIncome,
    } = useTransactionsMoneyManagement()

    const {
        totalSaved,
        remainingToSave,
        totalToSave,
        percentageGoalsCompleted,
    } = useSavingsMoneyManagement();

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthTransactions = transactions
        .filter((t) => 
            new Date(t.timestamp).getMonth() === currentMonth && 
            new Date(t.timestamp).getFullYear() ===  currentYear
        )

    const recentTransactions = currentMonthTransactions.slice(-5);

    return (
        <div className="w-full">
            <Header />

            <main className="px-4 py-4 min-h-screen h-full bg-gray-900">
                    <section className="grid grid-cols-4 gap-x-4 mb-8">
                        <Card 
                            icon={{
                                icon: MdAccountBalanceWallet,
                                color: 'bg-green-200'
                            }}
                            balance={balance}
                            cardName="Total Balance"
                            cardBgColor="bg-green-400"
                        />

                        <Card 
                            icon={{
                                icon: MdKeyboardDoubleArrowUp,
                                color: 'bg-blue-200',
                            }}
                            balance={currentMonthTotalIncome}
                            cardName="Month's Income"
                            cardBgColor="bg-blue-400"
                        />

                        <Card 
                            icon={{
                                icon: MdKeyboardDoubleArrowDown,
                                color: 'bg-red-200'
                            }}
                            balance={currentMonthTotalExpense}
                            cardName="Month's Expenses"
                            cardBgColor="bg-red-400"
                        />

                        <Card 
                            icon={{
                                icon: MdKeyboardDoubleArrowDown,
                                color: 'bg-yellow-200'
                            }}
                            balance={totalIncome}
                            cardName="Net Income"
                            cardBgColor="bg-yellow-400"
                        />
                    </section>

                    <div className="grid grid-cols-2 gap-x-4 mb-8">
                        <div className="p-6 h-96 rounded-xl bg-gray-800">
                            <h2 className="text-xl text-white font-semibold mb-6">Monthly Summary</h2>

                            <div className="flex gap-y-4 flex-col">
                                <div className="flex justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex gap-x-4">
                                        <MdKeyboardDoubleArrowUp className="text-blue-400 text-2xl"/>
                                        <h2 className="text-gray-300">Total Income</h2>
                                    </div>

                                    <span className="text-blue-400 font-semibold">{currentMonthTotalIncome}</span>
                                </div>  

                                <div className="flex justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex gap-x-4">
                                        <MdKeyboardDoubleArrowDown className="text-red-400 text-2xl"/>
                                        <h2 className="text-gray-300">Total Expenses</h2>
                                    </div>

                                    <span className="text-red-400 font-semibold">{currentMonthTotalExpense}</span>
                                </div> 

                                <div className="flex justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex gap-x-4">
                                        <MdTrendingUp className="text-green-400 text-2xl"/>
                                        <h2 className="text-gray-300">Net Balance</h2>
                                    </div>

                                    <span className="text-green-400 font-semibold">{balance}</span>
                                </div> 

                                <div className="flex justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex gap-x-4">
                                        <MdPieChart className="text-yellow-400 text-2xl"/>
                                        <h2 className="text-gray-300">Spending Rate</h2>
                                    </div>

                                    <span className="text-yellow-400 font-semibold">{percentageSpent}%</span>
                                </div> 
                            </div>
                        </div>

                        <div className="p-6 h-96 rounded-xl bg-gray-800">
                            <h2 className="text-xl text-white font-semibold mb-6">Saving Goals</h2>   

                            <div className="flex gap-y-4 flex-col">
                                <div className="flex justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex gap-x-4">
                                        <MdSavings className="text-blue-400 text-2xl"/>
                                        <h2 className="text-gray-300">Total Saved</h2>
                                    </div>

                                    <span className="text-blue-400 font-semibold">{totalSaved}</span>
                                </div>  

                                <div className="flex justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex gap-x-4">
                                        <FiTarget className="text-green-400 text-2xl"/>
                                        <h2 className="text-gray-300">Total Goals</h2>
                                    </div>

                                    <span className="text-green-400 font-semibold">{totalToSave}</span>
                                </div>

                                <div className="flex justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex gap-x-4">
                                        <MdTrendingUp className="text-purple-400 text-2xl"/>
                                        <h2 className="text-gray-300">Completion Rate</h2>
                                    </div>

                                    <span className="text-purple-400 font-semibold">{percentageGoalsCompleted}%</span>
                                </div>

                                <button 
                                    className="bg-blue-600 rounded-lg px-4 py-3 text-white font-semibold"
                                >
                                    View All Goals
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="items-start">
                        <div className="p-4 col-span-2 min-h-96 max-h-[768px] bg-gray-800 rounded-xl">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-xl text-white font-semibold">Recent Transactions</h2>

                                <span className="text-blue-300 font-semibold">View All</span>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                {recentTransactions.map((t) => {
                                    const valueFormatted = formatMoney(Number(t.value));
                                    const timestampFormatted = formatDate(new Date(t.timestamp));

                                    return (
                                        <div 
                                            key={t.id}
                                            className="flex justify-between items-center bg-gray-700 rounded-lg p-3"
                                        >
                                            <div className="flex gap-x-4 items-center">
                                                <div 
                                                    className={`rounded-full p-1 w-3 h-3
                                                    ${t.type === "income" ? "bg-green-400" : "bg-red-400"}`}
                                                >

                                                </div>

                                                <div className="">
                                                    <h2 className="text-white font-semibold ">{t.name}</h2>
                                                    <span className="text-gray-400 text-[0.9rem]">{timestampFormatted}</span>
                                                </div>
                                                
                                            </div>

                                            <span 
                                                className={`font-semibold
                                                ${t.type === "income" ?
                                                "text-green-400 before:content-['+']" : 
                                                "text-red-400 before:content-['-']"}`}
                                            >
                                                {valueFormatted}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            
                        </div>
                    </div>
            </main>
        </div>
    );
}
