import { MdDelete, MdWarning } from "react-icons/md";
import { EditBudgetButton } from "./Buttons/EditBudgetButton";
import { Budget, BudgetContext } from "../../../../context/BudgetProvider";
import { useContext } from "react";
import { formatMoney } from "@/utils/formatters";
import { TransactionContext } from "../../../../context/TransactionProvider";
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiTarget, FiXCircle } from "react-icons/fi";

export function BudgetRow({ budget }: { budget: Budget }) {

    const { transactions = [] } = useContext(TransactionContext);
    const { removeBudget } = useContext(BudgetContext);

    const toggleBudgetStatus = (percentage: number) => {
        switch(true){
            case percentage < 60: 
                return (
                    <>
                        <FiCheckCircle className="text-green-600"/>
                        <span className="text-green-600">Under Budget</span>
                    </>
                )
            case percentage >= 60 && percentage <= 80: 
                return (
                    <>
                        <FiTarget className="text-blue-600"/>
                        <span className="text-blue-600">On Track</span>
                    </>
                )
            case percentage >= 80 && percentage <= 100: 
                return (
                    <>
                        <FiAlertTriangle className="text-orange-400"/>
                        <span className="text-orange-400">Warning</span>
                    </>
                )
            case percentage >= 100 && percentage <= 120: 
                return (
                    <>
                        <FiAlertCircle className="text-orange-600"/>
                        <span className="text-orange-600">Over Budget</span>
                    </>
                )
            case percentage > 120: 
                return (
                    <>
                        <FiXCircle className="text-red-600"/>
                        <span className="text-red-600">Critical</span>
                    </>
                )
        }
    }

    const spent = transactions
        .filter((t) => t.category === budget.category)
        .reduce((acc, t) => acc + Number(t.value) ,0)

    const remaining = Number(budget.amount) - spent;
    const percentage = Number(((spent / Number(budget.amount)) * 100).toFixed());

    const spentFormatted = formatMoney(spent);
    const remainingFormatted = formatMoney(remaining);
    

    return (
        <tr 
            key={budget.id}
            className="bg-gray-800 text-white"
        >
            <td className="px-6 py-4">
                <h3 className=" font-semibold">{budget.name}</h3>
                <span className="text-gray-400 text-[0.8rem] block ">{budget.category}</span>
                <span className="text-gray-300 text-[0.9rem] block ">{budget.description}</span>
            </td>
            <td className="px-6 py-4">
                <h3 className="text-gray-400">{formatMoney(Number(budget.amount))}</h3>
            </td>
            <td className="px-6 py-4">
                <span className="">{spentFormatted}</span>
            </td>
            <td className="px-6 py-4">
                <span className="">{remainingFormatted}</span>
            </td>
            <td className="px-6 py-4">
                {/* Progress */}
                <div 
                    className="w-full h-2 rounded-lg bg-gray-600 "
                >
                    {/* w-[] must be conditional */}
                    <div 
                        className={`bg-yellow-500 p-1 rounded-lg h-full transition-all duration-300
                        max-w-full`}
                        style={{ width: `${percentage}%` } }
                    >
                        
                    </div>
                </div>
                <span className="text-yellow-400 text-[0.8rem]">{percentage}%</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex flex-col mb-1">
                    <span className="text-gray-500 text-[0.8rem]">Start - 17/01/2004</span>
                    <span className="text-gray-500 text-[0.8rem]">End - 17/01/2006</span>
                </div>
                <span 
                    className="text-[0.9rem] flex items-center gap-x-2"
                >
                    {toggleBudgetStatus(percentage)}                                                                                
                </span>
            </td>
            <td className="px-6 py-4 ">
                <div className="flex text-gray-500 gap-x-4 text-[1.2rem] items-center justify-center]">
                    <EditBudgetButton 
                        budget={budget}
                    />
                    <MdDelete 
                        onClick={() => removeBudget(budget.id)}
                        className="hover:text-red-400"
                    />
                </div>
            </td>
        </tr> 
    )
}