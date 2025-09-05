import { MdDelete, MdWarning } from "react-icons/md";
import { EditBudgetButton } from "./Buttons/EditBudgetButton";
import { Budget, BudgetContext } from "../../../../context/BudgetProvider";
import { useContext } from "react";
import { formatMoney } from "@/utils/formatters";

export function BudgetRow({ budget }: { budget: Budget }) {

    const { removeBudget } = useContext(BudgetContext);

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
                <h3 className="text-gray-400">{formatMoney(budget.amount)}</h3>
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