import { formatDate, formatMoney, formatWord } from "@/utils/formatters";
import { 
  MdAccountBalanceWallet, 
  MdKeyboardDoubleArrowUp, 
  MdShoppingCart,
  MdRestaurant,
  MdLocalGasStation,
  MdMovie,
  MdHome,
  MdSchool
} from "react-icons/md";
import { CategoriesEnum, TypesEnum } from "../../../../context/TransactionProvider";

interface TransactionItemProps {
    name: string;
    value: string;
    type: TypesEnum;
    category: CategoriesEnum;
    timestamp: string;
}

export function TransactionItem({name, value, type, category, timestamp} : TransactionItemProps) {
    const handleIcon = (category: CategoriesEnum) => {
        switch(category) {
            case CategoriesEnum.INCOME:
                return (
                    <div className="p-3 rounded-full bg-green-200">
                        <MdKeyboardDoubleArrowUp className="text-green-600 text-[1.5rem]" />
                    </div>
                )
            case CategoriesEnum.FOOD:
                return (
                    <div className="p-3 rounded-full bg-orange-200">
                        <MdRestaurant className="text-orange-600 text-[1.5rem]" />
                    </div>
                );
            case CategoriesEnum.TRANSPORTATION:
                return (
                    <div className="p-3 rounded-full bg-blue-200">
                        <MdLocalGasStation className="text-blue-600 text-[1.5rem]" />
                    </div>
                );
            case CategoriesEnum.ENTERTAINMENT:
                return (
                    <div className="p-3 rounded-full bg-purple-200">
                        <MdMovie className="text-purple-600 text-[1.5rem]" />
                    </div>
                );
            case CategoriesEnum.HOUSING:
                return (
                    <div className="p-3 rounded-full bg-yellow-200">
                        <MdHome className="text-yellow-600 text-[1.5rem]" />
                    </div>
                );
            case CategoriesEnum.EDUCATION:
                return (
                    <div className="p-3 rounded-full bg-indigo-200">
                        <MdSchool className="text-indigo-600 text-[1.5rem]" />
                    </div>
                );
            case CategoriesEnum.SHOPPING:
                return (
                    <div className="p-3 rounded-full bg-indigo-200">
                        <MdShoppingCart className="text-cyan-600 text-[1.5rem]" />
                    </div>
                )
            case CategoriesEnum.OTHER:
                return (
                    <div className="p-3 rounded-full bg-gray-200">
                        <MdShoppingCart className="text-gray-600 text-[1.5rem]" />
                    </div>
                );
            default:
                return (
                    <div className="p-3 rounded-full bg-slate-200">
                        <MdAccountBalanceWallet className="text-slate-600 text-[1.5rem]" />
                    </div>
                );
        }
    }

    const typeFormatted = formatWord(type.toString());
    const dateFormatted = formatDate(new Date(timestamp));
    const valueFormatted = formatMoney(Number(value));

    return (
        <div className="flex justify-between bg-gray-700 rounded-lg p-4">
            <div className="flex w-[60%] gap-x-4">
                {handleIcon(category)}
                <div>
                    <h2 className="text-white font-semibold">{name}</h2>
                    <h3 className="text-[0.8rem] text-gray-400">{typeFormatted}</h3>
                </div>
            </div>

            <div className="text-end">
                <h2 
                    className={`${
                        type === "income" 
                        ? "text-green-400 before:content-['+']" 
                        : "text-red-400 before:content-['-']"} font-semibold`}
                >
                    {valueFormatted}
                </h2>
                <h3 className="text-[0.8rem] text-gray-400">{dateFormatted}</h3>
            </div>
        </div>
    )
}