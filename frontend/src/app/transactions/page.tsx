import { Card } from "../components/Card";
import { 
  MdAccountBalanceWallet, 
  MdKeyboardDoubleArrowUp, 
  MdKeyboardDoubleArrowDown,
  MdFilterList,
  MdSearch,
  MdAdd,
  MdShoppingCart,
  MdRestaurant,
  MdLocalGasStation,
  MdMovie,
  MdHome,
  MdSchool
} from "react-icons/md";
import { TopBar } from "../components/TopBar";
import { TransactionItem } from "./components/TransactionItem";
import { TransactionContainer } from "./components/TransactionContainer";

export default function Transactions() {
    return (
        <div className="w-full">
            <TopBar />

            <div className="px-4 py-4 bg-gray-900 min-h-screen h-full">
                <section className="grid grid-cols-4 gap-x-4 mb-8">
                    <Card 
                        icon={{
                            icon: MdAccountBalanceWallet,
                            color: 'bg-green-200'
                        }}
                        percentage="12.5%"
                        balance="50.000.00"
                        cardName="Total Balance"
                        cardBgColor="bg-green-400"
                    />

                    <Card 
                        icon={{
                            icon: MdKeyboardDoubleArrowUp,
                            color: 'bg-blue-200',
                        }}
                        percentage="12.5%"
                        balance="50.000.00"
                        cardName="Month's Income"
                        cardBgColor="bg-blue-400"
                    />

                    <Card 
                        icon={{
                            icon: MdKeyboardDoubleArrowDown,
                            color: 'bg-red-200'
                        }}
                        percentage="12.5%"
                        balance="50.000.00"
                        cardName="Month's Expenses"
                        cardBgColor="bg-red-400"
                    />

                    <Card
                        icon={{
                            icon: MdKeyboardDoubleArrowDown,
                            color: 'bg-yellow-200'
                        }}
                        percentage="12.5%"
                        balance="50.000.00"
                        cardName="Month's Expenses"
                        cardBgColor="bg-yellow-400"
                    />
                </section>

                <main>
					<div className="bg-gray-800 rounded-lg p-4 mb-8">
						<div className="flex justify-between">
							<h2 className="text-white text-2xl font-semibold">All Transactions</h2>
							<button 
								className="flex items-center gap-x-2 px-3 py-2 rounded-lg bg-blue-500 text-white"
							>
								<MdAdd className="text-xl"/> 
								Add Transaction
							</button>
						</div>
						
						<div className="flex gap-x-3 items-start">
							<div className="relative bg-gray-700 rounded-lg w-96 text-white
							placeholder:text-gray-600 border-white ">
								<MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
								<input 
									className="w-full h-full p-[8.5px] pl-10 outline-0 border border-transparent focus:border-blue-500
									rounded-lg"
									type="text" 
									placeholder="Search for..."
								/>
							</div>

							<div className="flex items-center gap-x-2 bg-gray-700 rounded-lg px-3 py-2">
								<MdFilterList className="text-white"/>
								<h3 className="text-white">Filter</h3>
							</div>

							<div className="bg-gray-700 rounded-lg">
								<select 
									className="text-white bg-gray-700 w-36 border border-transparent
									focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
									name="categories"
								>
									<option value="all_categories">All Categories</option>
									<option value="income">Income</option>
									<option value="food_and_drinking">Food & Drinking</option>
									<option value="transportation">Transportation</option>
									<option value="entertainment">Entertainment</option>
									<option value="housing">Housing</option>
									<option value="education">Education</option>
								</select>
							</div>

							<div className="bg-gray-700 rounded-lg">
								<select 
									className="text-white px-3 py-2 bg-gray-700 border border-transparent 
									focus:border-blue-500 rounded-lg outline-0"
									name="time"
								>
									<option value="30_days">Last 30 days</option>
									<option value="7_days">Last 7 days</option>
									<option value="this_month">This Month</option>
									<option value="last_month">Last Month</option>
									<option value="this_year">This Year</option>
								</select>
							</div>
						</div>
					</div>

					<TransactionContainer>
						<TransactionItem />
						<TransactionItem />
						<TransactionItem />
						<TransactionItem />
						<TransactionItem />

						<div className="mt-4">
							<hr className="text-gray-700 mb-4"/>

							<div className="flex justify-between items-center">
								<span className="text-gray-400 text-[0.9rem]">Showing 8 of 245 transactions</span>

								<div className="flex items-start gap-x-3">
									<div className="rounded-lg bg-gray-700 px-3 py-1">
										<span className="text-gray-400">Previous</span>
									</div>

									<div className="rounded-lg bg-gray-700 px-3 py-1">
										<span className="text-gray-400">1</span>
									</div>

									<div className="rounded-lg bg-gray-700 px-3 py-1">
										<span className="text-gray-400">2</span>
									</div>

									<div className="rounded-lg bg-gray-700 px-3 py-1">
										<span className="text-gray-400">3</span>
									</div>

									<div className="rounded-lg bg-gray-700 px-3 py-1">
										<span className="text-gray-400">Next</span>
									</div>
								</div>
							</div>
						</div>
					</TransactionContainer>
					
                </main>

            </div>

        </div>
    )
}