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

enum TransactionCategory {
    INCOME = 'income',
    FOOD = 'food',
    TRANSPORTATION = 'transportation',
    ENTERTAINMENT = 'entertainment',
    HOUSING = 'housing',
    EDUCATION = 'education',
    OTHER = 'other',
}

//Remove the question marks when the backend is created '?'
interface TransactionItemProps {
    name?: string;
    value?: string;
    type?: 'income' | 'expense';
    category?: TransactionCategory;
    timestamp?: string;
}

export function TransactionItem({name, value, type, category, timestamp} : TransactionItemProps) {
    //remove undefined when the backend is created
    const handleIcon = (category: TransactionCategory | undefined) => {
        switch(category) {
            case TransactionCategory.INCOME:
                return (
                    <div className="p-3 rounded-full bg-green-200">
                        <MdKeyboardDoubleArrowUp className="text-green-600 text-[1.5rem]" />
                    </div>
                )
            case TransactionCategory.FOOD:
                return (
                    <div className="p-3 rounded-full bg-orange-200">
                        <MdRestaurant className="text-orange-600 text-[1.5rem]" />
                    </div>
                );
            case TransactionCategory.TRANSPORTATION:
                return (
                    <div className="p-3 rounded-full bg-blue-200">
                        <MdLocalGasStation className="text-blue-600 text-[1.5rem]" />
                    </div>
                );
            case TransactionCategory.ENTERTAINMENT:
                return (
                    <div className="p-3 rounded-full bg-purple-200">
                        <MdMovie className="text-purple-600 text-[1.5rem]" />
                    </div>
                );
            case TransactionCategory.HOUSING:
                return (
                    <div className="p-3 rounded-full bg-yellow-200">
                        <MdHome className="text-yellow-600 text-[1.5rem]" />
                    </div>
                );
            case TransactionCategory.EDUCATION:
                return (
                    <div className="p-3 rounded-full bg-indigo-200">
                        <MdSchool className="text-indigo-600 text-[1.5rem]" />
                    </div>
                );
            case TransactionCategory.OTHER:
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

    return (
        <div className="flex justify-between bg-gray-700 rounded-lg p-4">
            <div className="flex w-[60%] gap-x-4">
                {handleIcon(category)}

                <div>
                    <h2 className="text-white font-semibold">Lorem, ipsum.</h2>
                    <h3 className="text-[0.8rem] text-gray-400">Lorem, ipsum.</h3>
                </div>
            </div>

            <div className="text-end">
                <h2 className="text-white font-semibold">Lorem, ipsum.</h2>
                <h3 className="text-[0.8rem] text-gray-400">Lorem, ipsum.</h3>
            </div>
        </div>
    )
}