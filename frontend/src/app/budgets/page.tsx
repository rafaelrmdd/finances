'use client'

import { useContext, useState } from "react";
import { Card } from "../../components/Card";
import { TopBar } from "../../components/TopBar";
import { 
    MdAccountBalanceWallet, 
    MdKeyboardDoubleArrowUp, 
    MdKeyboardDoubleArrowDown,
    MdTrendingUp,
    MdEdit,
    MdDelete,
    MdMoreVert,
    MdWarning,
    MdPlayCircleOutline,
    MdRadioButtonChecked,
} from "react-icons/md";
import { BudgetContext } from "../../../context/BudgetProvider";
import { formatMoney } from "@/utils/formatters";
import { AddBudgetButton } from "./components/Buttons/AddBudgetButton";
import { EditBudgetButton } from "./components/Buttons/EditBudgetButton";
import { BudgetRow } from "./components/BudgetRow";
import { TransactionContext } from "../../../context/TransactionProvider";

export default function Budgets() {
    
    const { budgets = [] } = useContext(BudgetContext); 
    const { transactions = [] } = useContext(TransactionContext);

    const currentMonth = new Date().getMonth();
    const totalSpentCurrentMonth = transactions
        .filter((t) => new Date(t.timestamp).getMonth() === currentMonth)
        .reduce((acc, t) => acc + Number(t.value), 0);
    const totalBudgetCurrentMonth = budgets
        .filter((b) => new Date(b.timestamp).getMonth() === currentMonth)
        .reduce((acc, b) => acc + Number(b.amount), 0);

    const percentage = Number(((totalSpentCurrentMonth / totalBudgetCurrentMonth) * 100).toFixed())
    const remainingCurrentMonth = totalBudgetCurrentMonth - totalSpentCurrentMonth;
    
    const totalSpentCurrentMonthFormatted = formatMoney(totalSpentCurrentMonth);
    const totalBudgetCurrentMonthFormatted = formatMoney(totalBudgetCurrentMonth);

    const remainingCurrentMonthFormatted = formatMoney(remainingCurrentMonth);

    const totalSpent = transactions.reduce((acc, t) => acc + Number(t.value), 0);
    const totalBudget = budgets.reduce((acc, b) => acc + Number(b.amount), 0);
    const remaining = totalBudget - totalSpent;

    const totalSpentFormatted = formatMoney(totalSpent);
    const totalBudgetFormatted = formatMoney(totalBudget);
    const remainingFormatted = formatMoney(remaining);

    const activeBudgets = String(budgets.length);

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
                        balance={totalBudgetFormatted}
                        cardName="Total Budgeted (all time)"
                        cardBgColor="bg-blue-400"
                    />

                    <Card 
                        icon={{
                            icon: MdKeyboardDoubleArrowUp,
                            color: 'bg-red-200',
                        }}
                        balance={totalSpentFormatted}
                        cardName="Total Spent (all time)"
                        cardBgColor="bg-red-400"
                    />

                    <Card 
                        icon={{
                            icon: MdKeyboardDoubleArrowDown,
                            color: 'bg-green-200'
                        }}
                        balance={remainingFormatted}
                        cardName="Remaining Budget (all time)"
                        cardBgColor="bg-green-400"
                    />

                    <Card
                        icon={{
                            icon: MdRadioButtonChecked,
                            color: 'bg-purple-200'
                        }}
                        balance={activeBudgets}
                        cardName="Active Budgets (all time)"
                        cardBgColor="bg-purple-400"
                    />
                </section>

                <main>
                    <div className="w-full bg-gray-800 p-4 rounded-lg mb-8">
                        <div className="flex justify-between mb-8">
                            <h1 className="text-2xl text-white font-semibold">Budget Management</h1>
                            <AddBudgetButton />
                        </div>

                        <div className="bg-gray-700 rounded-lg p-4">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-white font-semibold">Overall Budget Progress</h2>
                                <h3 className="text-gray-400 text-[0.9rem]">This Month</h3>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <h3 className="text-gray-400 text-[0.9rem]">Spent: {totalSpentCurrentMonthFormatted}</h3>
                                    <h3 className="text-gray-400 text-[0.9rem]">Budget: {totalBudgetCurrentMonthFormatted}</h3>
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
                                    <h3 className="text-green-400 text-[0.9rem] font-semibold">{percentage}% spent</h3>
                                    <h3 className="text-white text-[0.9rem]">{remainingCurrentMonthFormatted} remaining</h3>
                                </div>
                            </div>
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
                                    <BudgetRow
                                        key={b.id}
                                        budget={b}
                                    /> 
                                ))}                                                           
                            </tbody>
                        </table>

                        {/* Make table's bottom round */}
                        <div className="rounded-b-lg bg-gray-800 h-10 w-full">
                            
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}