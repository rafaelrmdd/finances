import { Card } from "../components/Card";
import { TopBar } from "../components/TopBar";
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
import { BudgetCard, StatusEnum } from "./components/BudgetCard";
import { BudgetCardContainer } from "./components/BudgetCardContainer";
import { BudgetTipsContainer } from "./components/BudgetTipsContainer";
import { BudgetTipsCard } from "./components/BudgetTipsCard";
import { CategoryEnum } from "../transactions/components/TransactionItem";

export default function Budgets() {


    return (
        <div className="w-full bg-gray-800">
            <TopBar />

            <div className="px-4 py-4 bg-gray-900 min-h-screen h-full">
                <section className="grid grid-cols-4 gap-x-4 mb-8">
                    <Card
                        icon={{
                            icon: MdAccountBalanceWallet,
                            color: 'bg-blue-200'
                        }}
                        percentage="0%"
                        balance="3.800.00"
                        cardName="Total Budgeted"
                        cardBgColor="bg-blue-400"
                    />

                    <Card 
                        icon={{
                            icon: MdKeyboardDoubleArrowUp,
                            color: 'bg-red-200',
                        }}
                        percentage="0%"
                        balance="3.061.20"
                        cardName="Total Spent"
                        cardBgColor="bg-red-400"
                    />

                    <Card 
                        icon={{
                            icon: MdKeyboardDoubleArrowDown,
                            color: 'bg-green-200'
                        }}
                        percentage="0%"
                        balance="738.00"
                        cardName="Remaining Budget"
                        cardBgColor="bg-green-400"
                    />

                    <Card
                        icon={{
                            icon: MdKeyboardDoubleArrowDown,
                            color: 'bg-yellow-200'
                        }}
                        percentage="0%"
                        balance="1.00"
                        cardName="Over Budget Categories"
                        cardBgColor="bg-yellow-400"
                    />
                </section>

                <main className="grid grid-cols-3 gap-x-4">
                    <div className="bg-gray-800 rounded-lg col-span-2 p-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-white text-2xl font-semibold">Monthly Budget Overview</h2>

                            <div className="flex gap-x-4">
                                <select
                                    className="text-white bg-gray-700 rounded-lg px-3 py-2 outline-0
                                    border border-transparent focus:border-blue-500" 
                                    name="months"
                                >
                                    <option value="">August 2025</option>
                                    <option value="">July 2025</option>
                                    <option value="">June 2025</option>
                                </select>

                                <button
                                    className="px-3 py-2 flex items-center text-white bg-blue-500
                                    rounded-lg gap-x-3 hover:cursor-pointer"
                                >
                                    <MdAdd /> Add Category
                                </button>
                            </div>
                        </div>

                        <BudgetCardContainer>
                            <BudgetCard 
                                icon={{
                                    icon: MdRestaurant,
                                    color: "text-black"  
                                }}
                                cardBgColor="bg-orange-200"
                                category={CategoryEnum.FOOD}
                                status={StatusEnum.ON_TRACK}
                                valueLimit="1000"
                                valueSpent="870"
                            />

                            <BudgetCard 
                                icon={{
                                    icon: MdRestaurant,
                                    color: "text-black"  
                                }}
                                cardBgColor="bg-orange-200"
                                category={CategoryEnum.FOOD}
                                status={StatusEnum.ON_TRACK}
                                valueLimit="1000"
                                valueSpent="870"
                            />

                            <BudgetCard 
                                icon={{
                                    icon: MdRestaurant,
                                    color: "text-black"  
                                }}
                                cardBgColor="bg-orange-200"
                                category={CategoryEnum.FOOD}
                                status={StatusEnum.ON_TRACK}
                                valueLimit="1000"
                                valueSpent="870"
                            />
                        </BudgetCardContainer>
                    </div>

                    <div className="bg-gray-700 rounded-lg p-3">
                        <h2 className="mb-4 text-white font-semibold text-2xl">Budget Tips</h2>

                        <BudgetTipsContainer>
                            <BudgetTipsCard 
                                title="Teste"
                                description="teste teste teste"
                                //           color/opacity
                                cardBgColor="bg-yellow-400/40"
                                cardBorderColor="border-yellow-200"
                            />

                            <BudgetTipsCard 
                                title="Teste"
                                description="teste teste teste"
                                cardBgColor="bg-yellow-400/40"
                                cardBorderColor="border-yellow-200"
                            />

                            <BudgetTipsCard 
                                title="Teste"
                                description="teste teste teste"
                                cardBgColor="bg-yellow-400/40"
                                cardBorderColor="border-yellow-200"
                            />

                        </BudgetTipsContainer>
                    </div>
                </main>
            </div>

        </div>
    )
}