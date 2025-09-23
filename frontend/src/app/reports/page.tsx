'use client'

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import { formatMoney } from "@/utils/formatters";
import { useContext } from "react";
import {
	MdAssessment,
	MdTrendingUp,
	MdTrendingDown,
	MdBarChart,
	MdPieChart,
	MdShowChart,
	MdDateRange,
	MdFileDownload,
	MdFilterList,
	MdCalendarToday,
	MdAccountBalance,
	MdSavings,
	MdCreditCard,
	MdAttachMoney,
	MdCompareArrows,
	MdTimeline,
    MdAdd,
    MdSearch,
    MdAssignmentTurnedIn
} from "react-icons/md";
import { TransactionContext } from "../../../context/TransactionProvider";
import { SavingContext } from "../../../context/SavingProvider";
import { SavingGoalsCard } from "./components/SavingGoalsCard";
import { ExpensesCard } from "./components/ExpensesCard";
import { Chart } from "./components/Chart";
import { InvestmentsCard } from "./components/InvestmentsCard";
import { BudgetContext } from "../../../context/BudgetProvider";

export default function Reports() {

    const { savings = []} = useContext(SavingContext);
    const { transactions = [] } = useContext(TransactionContext);
    const { budgets = [] } = useContext(BudgetContext);

    const totalSaving = savings?.reduce((sum, s) => sum + Number(s.currentAmount), 0)
    const totalExpense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.value), 0)
    const totalIncome = transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.value), 0);
    const totalBudgeted = budgets.reduce((sum, b) => sum + Number(b.amount), 0);

    const totalSavingFormatted = formatMoney(totalSaving)
    const totalExpenseFormatted = formatMoney(totalExpense);
    const totalIncomeFormatted = formatMoney(totalIncome);
    const totalBudgetedFormatted = formatMoney(totalBudgeted)

    return (
        <div className="w-full bg-gray-900">
            <Header />

            <div className="p-4 min-h-screen h-full bg-gray-900">
                <section className="grid grid-cols-4 gap-x-4 mb-8">
                    <Card
                        icon={{
                            icon: MdAssessment,
                            color: 'bg-blue-200'
                        }}
                        balance={formatMoney(10000)}
                        cardName="Net Worth"
                        cardBgColor="bg-blue-400"
                    />

                    <Card
                        icon={{
                            icon: MdTrendingUp,
                            color: 'bg-green-200',
                        }}
                        balance={formatMoney(17500)}
                        cardName="Avg Monthly Income"
                        cardBgColor="bg-green-400"
                    />

                    <Card
                        icon={{
                            icon: MdTrendingDown,
                            color: 'bg-red-200'
                        }}
                        balance={formatMoney(10000)}
                        cardName="Avg Monthly Expenses"
                        cardBgColor="bg-red-400"
                    />

                    <Card
                        icon={{
                            icon: MdSavings,
                            color: 'bg-purple-200'
                        }}

                        balance={formatMoney(10000)}
                        cardName="Total Saved (6M)"
                        cardBgColor="bg-purple-400"
                    />
                </section>

                <main>
                    <div className="p-4 bg-gray-800 rounded-lg mb-8">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-white">Investment Portfolio</h2>

                            <div className="flex gap-x-4">
                                <button
                                    // onClick={openModal}
                                    className="flex items-center gap-x-2 px-3 py-2 rounded-lg
                                    bg-green-500 text-white hover:cursor-pointer hover:bg-green-600
                                    transition duration-150"
                                >
                                    <MdFileDownload className="text-xl" />
                                    Export PDF
                                </button>

                                <button
                                    // onClick={openModal}
                                    className="flex items-center gap-x-2 px-3 py-2 rounded-lg
                                    bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600
                                    transition duration-150"
                                >
                                    <MdFileDownload className="text-xl" />
                                    Export Excel
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-x-3 items-start">
                            <div className="bg-gray-700 rounded-lg">
                                <select
                                    className="text-white bg-gray-700 w-36 border border-transparent
                                    focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
                                    name="categories"
                                >
                                    <option value="all_categories">This Week</option>
                                    <option value="all_categories" selected>This Month</option>
                                    <option value="income">Last Month</option>
                                    <option value="transportation">Last 3 Months</option>
                                    <option value="food_and_drinking">Last 6 Months</option>
                                    <option value="food_and_drinking">This Year</option>
                                    <option value="food_and_drinking">Last Year</option>      
                                </select>
                            </div>

                            <div className="bg-gray-700 rounded-lg">
                                <select
                                    className="text-white bg-gray-700 w-40 border border-transparent
                                    focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
                                    name="categories"
                                >
                                    <option value="all_categories">Overview</option>
                                    <option value="income">Income vs Expenses</option>
                                    <option value="transportation">Category Breakdown</option>
                                    <option value="food_and_drinking">Saving Goals</option>
                                    <option value="entertainment">Investment Performance</option>
                                    <option value="housing">Cash Flow</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-x-2 bg-gray-700 rounded-lg px-3 py-2">
                                <MdFilterList className="text-white" />
                                <h3 className="text-white">Filter</h3>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 mb-8">
                        <Chart />

                        <ExpensesCard />

                        <SavingGoalsCard />

                        <InvestmentsCard />
                    </div>

                    <div className="w-full bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-white font-semibold text-lg mb-6">Financial Summary</h2>

                        <div className="flex justify-around">
                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-blue-600 rounded-lg p-4">
                                    <MdAccountBalance className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Total Income</h4>
                                    <span className="text-white font-semibold">{totalIncomeFormatted}</span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-red-600 rounded-lg p-4">
                                    <MdTrendingDown className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Total Expenses</h4>
                                    <span className="text-white font-semibold">{totalExpenseFormatted}</span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-green-600 rounded-lg p-4">
                                    <MdSavings className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Total Savings</h4>
                                    <span className="text-white font-semibold">{totalSavingFormatted}</span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-orange-600 rounded-lg p-4">
                                    <MdAssignmentTurnedIn className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Total Budgeted</h4>
                                    <span className="text-white font-semibold">{totalBudgetedFormatted}</span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-purple-600 rounded-lg p-4">
                                    <MdTrendingUp className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Portfolio Growth</h4>
                                    <span className="text-white font-semibold">$37,400.00</span>
                                </div>
                            </div>
                        </div>              
                    </div>
                </main>
            </div>
        </div>
    )
}