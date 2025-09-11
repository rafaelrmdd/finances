import { Card } from "@/components/Card";
import { TopBar } from "@/components/TopBar";
import { MdAccountBalanceWallet, MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from "react-icons/md";

export default function Home() {
  return (
    <div className="w-full">
      <TopBar />

      <main className="px-4 py-4 min-h-screen h-full bg-gray-800">
            <section className="grid grid-cols-4 gap-x-4 mb-8">
                <Card 
                    icon={{
                        icon: MdAccountBalanceWallet,
                        color: 'bg-green-200'
                    }}
                    balance="50.000.00"
                    cardName="Total Balance"
                    cardBgColor="bg-green-400"
                />

                <Card 
                    icon={{
                        icon: MdKeyboardDoubleArrowUp,
                        color: 'bg-blue-200',
                    }}
                    balance="50.000.00"
                    cardName="Month's Income"
                    cardBgColor="bg-blue-400"
                />

                <Card 
                    icon={{
                        icon: MdKeyboardDoubleArrowDown,
                        color: 'bg-red-200'
                    }}
                    balance="50.000.00"
                    cardName="Month's Expenses"
                    cardBgColor="bg-red-400"
                />

                <Card 
                    icon={{
                        icon: MdKeyboardDoubleArrowDown,
                        color: 'bg-yellow-200'
                    }}
                    balance="50.000.00"
                    cardName="Month's Expenses"
                    cardBgColor="bg-yellow-400"
                />
            </section>

            <div className="grid grid-cols-2 gap-x-4 mb-8">
                <div className="p-4 h-96 rounded-xl bg-gray-800">
                    <h2 className="text-xl text-white font-semibold">Income vs Expenses</h2>
                </div>

                <div className="p-4 h-96 rounded-xl bg-gray-800">
                    <h2 className="text-xl text-white font-semibold">Spending Categories</h2>   
                </div>
            </div>

            <div className="grid grid-cols-3 gap-x-4 items-start">
                <div className="p-4 col-span-2 min-h-96 max-h-[768px] bg-gray-800 rounded-xl">
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white font-semibold">Recent Transactions</h2>

                        <span className="text-blue-300 font-semibold">View All</span>
                    </div>
                    
                </div>

                <div className="p-4 bg-gray-800 rounded-xl h-80">
                    <div className="flex justify-between">
                        <h2 className="text-xl text-white font-semibold">Saving Goals</h2>

                        <span className="text-blue-300 font-semibold">+ Add Goal</span>
                    </div>
                    
                </div>
            </div>
      </main>
    </div>
  );
}
