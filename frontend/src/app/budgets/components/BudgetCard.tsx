import { CategoriesEnum } from "../../../../context/TransactionProvider";
import { formatMoney, formatWord } from "@/utils/formatters";
import { IconType } from "react-icons";
import { 
  MdAccountBalanceWallet, 
  MdKeyboardDoubleArrowUp, 
  MdKeyboardDoubleArrowDown,
  MdAdd,
  MdEdit,
  MdDelete,
  MdShoppingCart,
  MdRestaurant,
  MdLocalGasStation,
  MdMovie,
  MdHome,
  MdSchool,
  MdTrendingUp,
  MdWarning
} from "react-icons/md";

export enum StatusEnum {
    ON_TRACK="on_track",
    WARNING="warning",
    OVER_BUDGET="over_budget"
}

interface IconProps {
    icon: IconType;
    color: string;
}

interface BudgetCardProps {
    icon: IconProps
    cardBgColor: string;
    status: StatusEnum;
    valueSpent: string;
    valueLimit: string;
    category: CategoriesEnum;
}

export function BudgetCard({
    icon,
    cardBgColor,
    status,
    valueSpent,
    valueLimit,
    category,
} : BudgetCardProps) {
    const { icon: Icon, color } = icon;

    // Do logic later
    const situation = "Under budget";

    const valueLimitNumber = Number(valueLimit);
    const valueSpentNumber = Number(valueSpent);

    const valueRemaining = valueLimitNumber - valueSpentNumber;
    const valueSpentPercentage = (valueSpentNumber / valueLimitNumber) * 100;
    
    const valueLimitUSD = formatMoney(valueLimitNumber);
    const valueSpentUSD = formatMoney(valueSpentNumber);
    const valueRemainingUSD = formatMoney(valueRemaining);

    const categoryFormatted = formatWord(String(category));
    const statusFormatted = formatWord(String(status));

    return (
        <div className="bg-gray-700 rounded-lg p-4 ">
            <div className="flex items-center mb-2">
                <div className="flex gap-x-4">
                    <div className={`p-3 rounded-full ${cardBgColor}`}>
                        <Icon className={`text-[1.5rem] ${color}`}/>
                    </div>

                    <div>
                        <h2 className="font-semibold text-white">{categoryFormatted}</h2>
                        <span className="text-green-500 text-[0.9rem]">{statusFormatted}</span>
                    </div>
                </div>

                <div className="flex gap-x-6 ml-auto">
                    <MdEdit 
                        className="text-gray-400 w-4 h-4 hover:cursor-pointer"
                    />

                    <MdDelete 
                        className="text-gray-400 w-4 h-4 hover:cursor-pointer" 
                    />
                </div>
            </div>

            <div className="">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-300 text-[0.9rem]">{valueSpentUSD} of {valueLimitUSD}</span>

                    <span className="text-green-400 text-[0.9rem]">{valueSpentPercentage}%</span>
                </div>
                
                {/* Progress Bar */}
                <div 
                    className="w-full rounded-lg mb-4 bg-gray-600"
                >
                    <div className={`bg-green-400 w-[${valueSpentPercentage}%] p-1 rounded-lg`}></div>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-x-1">
                        <h2 className="text-gray-400 text-[0.9rem]">Remaining:</h2> 
                        <span className="text-green-400 text-[0.9rem]">{valueRemainingUSD}</span>
                    </div>
                    
                    <span className="text-gray-400 text-[0.9rem]">{situation}</span>
                </div>
            </div>  
        </div>
    )
}