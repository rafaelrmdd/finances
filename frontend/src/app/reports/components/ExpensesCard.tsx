import { useReportsExpenses } from "@/hooks/reports/useReportsExpenses";
import { MdPieChart } from "react-icons/md";

export function ExpensesCard() {

    const {
        expenses,
        percentages,
        totalExpensesFormatted,
    } = useReportsExpenses();

    return (
        <div className="p-6 bg-gray-800 rounded-lg min-h-96">
            <div className="flex items-center gap-x-2 mb-4">
                <MdPieChart className="text-[1.1rem] text-yellow-500"/>
                <h2 className="text-white font-semibold text-lg">Expense Breakdown</h2>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <h4 className="text-white text-[0.9rem]">Food & Dining</h4>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{expenses.foodExpensesFormatted}</span>
                        <span className="text-gray-400 text-[0.8rem] text-end">{percentages.foodPercentageParticipation}</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <h4 className="text-white text-[0.9rem]">Transportation</h4>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{expenses.transportationExpensesFormatted}</span>
                        <span className="text-gray-400 text-[0.8rem] text-end">{percentages.transportationPercentageParticipation}</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                        <h4 className="text-white text-[0.9rem]">Entertainment</h4>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{expenses.entertainmentExpensesFormatted}</span>
                        <span className="text-gray-400 text-[0.8rem] text-end">{percentages.entertainmentPercentageParticipation}</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <h4 className="text-white text-[0.9rem]">Housing</h4>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{expenses.housingExpensesFormatted}</span>
                        <span className="text-gray-400 text-[0.8rem] text-end">{percentages.housingPercentageParticipation}</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3 bg-pink-500 rounded"></div>
                        <h4 className="text-white text-[0.9rem]">Education</h4>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{expenses.educationExpensesFormatted}</span>
                        <span className="text-gray-400 text-[0.8rem] text-end">{percentages.educationPercentageParticipation}</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                        <h4 className="text-white text-[0.9rem]">Shopping</h4>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{expenses.shoppingExpensesFormatted}</span>
                        <span className="text-gray-400 text-[0.8rem] text-end">{percentages.shoppingPercentageParticipation}</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2">
                        <div className="w-3 h-3 bg-gray-500 rounded"></div>
                        <h4 className="text-white text-[0.9rem]">Other</h4>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-white font-semibold">{expenses.otherExpensesFormatted}</span>
                        <span className="text-gray-400 text-[0.8rem] text-end">{percentages.otherPercentageParticipation}</span>
                    </div>
                </div>
            </div>

            <hr className="text-gray-600 mt-4 mb-4"/>

            <div className="flex justify-between">
                <h2 className="text-white font-semibold">Total Expenses</h2>
                <span className="text-white font-semibold">{totalExpensesFormatted}</span>
            </div>
        </div>
    )
}