import { Card } from "@/components/Card";
import { TopBar } from "@/components/TopBar";
import { formatMoney } from "@/utils/formatters";
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
    MdSearch
} from "react-icons/md";

export default function Reports() {
    return (
        <div className="w-full bg-gray-900">
            <TopBar />

            <div className="p-4 min-h-screen h-full bg-gray-900">
                <section className="grid grid-cols-4 gap-x-4 mb-8">
                    <Card
                        icon={{
                            icon: MdAssessment,
                            color: 'bg-blue-200'
                        }}
                        percentage="+12.5%"
                        balance={formatMoney(10000)}
                        cardName="Net Worth"
                        cardBgColor="bg-blue-400"
                    />

                    <Card
                        icon={{
                            icon: MdTrendingUp,
                            color: 'bg-green-200',
                        }}
                        percentage="+8.2%"
                        balance={formatMoney(17500)}
                        cardName="Avg Monthly Income"
                        cardBgColor="bg-green-400"
                    />

                    <Card
                        icon={{
                            icon: MdTrendingDown,
                            color: 'bg-red-200'
                        }}
                        percentage="+3.1%"
                        balance={formatMoney(10000)}
                        cardName="Avg Monthly Expenses"
                        cardBgColor="bg-red-400"
                    />

                    <Card
                        icon={{
                            icon: MdSavings,
                            color: 'bg-purple-200'
                        }}
                        percentage="+15.7%"
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
                        <div className="p-6 bg-gray-800 rounded-lg min-h-96">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-x-2">
                                    <MdShowChart className="text-[1.1rem] text-blue-500"/>
                                    <h2 className="text-xl font-semibold text-white text-lg">Monthly Trend (6 Months)</h2>
                                </div>

                                <div className="flex gap-x-2">
                                    <div className="flex items-center gap-x-1">
                                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                                        <h4 className="text-gray-500 text-[0.9rem]">Income</h4>
                                    </div>

                                    <div className="flex items-center gap-x-1">
                                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                                        <h4 className="text-gray-500 text-[0.9rem]">Expenses</h4>
                                    </div>

                                    <div className="flex items-center gap-x-1">
                                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                        <h4 className="text-gray-500 text-[0.9rem]">Savings</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-full flex justify-center items-center text-white">
                                <h1 className="font-bold text-3xl">Chart will be here </h1>
                            </div>
                        </div>

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
                                        <span className="text-white font-semibold">$1,200.00</span>
                                        <span className="text-gray-400 text-[0.8rem] text-end">32.4%</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                                        <h4 className="text-white text-[0.9rem]">Transportation</h4>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold">$1,200.00</span>
                                        <span className="text-gray-400 text-[0.8rem] text-end">32.4%</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                                        <h4 className="text-white text-[0.9rem]">Entertainment</h4>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold">$1,200.00</span>
                                        <span className="text-gray-400 text-[0.8rem] text-end">32.4%</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                                        <h4 className="text-white text-[0.9rem]">Housing</h4>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold">$1,200.00</span>
                                        <span className="text-gray-400 text-[0.8rem] text-end">32.4%</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <div className="w-3 h-3 bg-pink-500 rounded"></div>
                                        <h4 className="text-white text-[0.9rem]">Education</h4>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold">$1,200.00</span>
                                        <span className="text-gray-400 text-[0.8rem] text-end">32.4%</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                                        <h4 className="text-white text-[0.9rem]">Shopping</h4>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold">$1,200.00</span>
                                        <span className="text-gray-400 text-[0.8rem] text-end">32.4%</span>
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <div className="w-3 h-3 bg-gray-500 rounded"></div>
                                        <h4 className="text-white text-[0.9rem]">Other</h4>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-white font-semibold">$1,200.00</span>
                                        <span className="text-gray-400 text-[0.8rem] text-end">32.4%</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="text-gray-600 mt-4 mb-4"/>

                            <div className="flex justify-between">
                                <h2 className="text-white font-semibold">Total Expenses</h2>
                                <span className="text-white font-semibold">$3,700.00</span>
                            </div>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-white font-semibold text-lg mb-4">Saving Goals Progress</h2>

                            <div className="space-y-2">
                                <div className="">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-gray-300 text-[0.9rem]">Emergency Fund</h3>

                                        <span className="text-gray-400 text-[0.9rem]">65%</span>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div 
                                        className="w-full rounded-lg mb-1 bg-gray-600"
                                    >
                                        {/* w-[] must be conditional */}
                                        <div className={`bg-green-400 w-[65%] p-1 rounded-lg`}></div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-[0.9rem]">$6,500.00</span> 
                                        
                                        <span className="text-gray-400 text-[0.9rem]">$10,000.00</span>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-gray-300 text-[0.9rem]">Emergency Fund</h3>

                                        <span className="text-gray-400 text-[0.9rem]">65%</span>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div 
                                        className="w-full rounded-lg mb-1 bg-gray-600"
                                    >
                                        {/* w-[] must be conditional */}
                                        <div className={`bg-green-400 w-[65%] p-1 rounded-lg`}></div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-[0.9rem]">$6,500.00</span> 
                                        
                                        <span className="text-gray-400 text-[0.9rem]">$10,000.00</span>
                                    </div>
                                </div> 

                                <div className="">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-gray-300 text-[0.9rem]">Emergency Fund</h3>

                                        <span className="text-gray-400 text-[0.9rem]">65%</span>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div 
                                        className="w-full rounded-lg mb-1 bg-gray-600"
                                    >
                                        {/* w-[] must be conditional */}
                                        <div className={`bg-green-400 w-[65%] p-1 rounded-lg`}></div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-[0.9rem]">$6,500.00</span> 
                                        
                                        <span className="text-gray-400 text-[0.9rem]">$10,000.00</span>
                                    </div>
                                </div> 

                                <div className="">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-gray-300 text-[0.9rem]">Emergency Fund</h3>

                                        <span className="text-gray-400 text-[0.9rem]">65%</span>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div 
                                        className="w-full rounded-lg mb-1 bg-gray-600"
                                    >
                                        {/* w-[] must be conditional */}
                                        <div className={`bg-green-400 w-[65%] p-1 rounded-lg`}></div>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-[0.9rem]">$6,500.00</span> 
                                        
                                        <span className="text-gray-400 text-[0.9rem]">$10,000.00</span>
                                    </div>
                                </div> 
                            </div> 
                        </div>

                        <div className="bg-gray-800 p-6 rounded-lg">
                            <div className="flex gap-x-2 items-center mb-4">
                                <MdTimeline className="text-purple-500 text-[1.1rem]" />
                                <h2 className="text-white font-semibold text-lg">Investment Performance</h2>
                            </div>

                            <div className="space-y-2">
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold text-white">AAPL</h3>
                                        <span className="text-green-400 font-semibold">+ $1,275.00</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-[0.9rem]">$8,775.00</span>
                                        <span className="text-green-400 text-[0.9rem]">+17.00%</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold text-white">AAPL</h3>
                                        <span className="text-green-400 font-semibold">+ $1,275.00</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-[0.9rem]">$8,775.00</span>
                                        <span className="text-green-400 text-[0.9rem]">+17.00%</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold text-white">AAPL</h3>
                                        <span className="text-green-400 font-semibold">+ $1,275.00</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-[0.9rem]">$8,775.00</span>
                                        <span className="text-green-400 text-[0.9rem]">+17.00%</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="font-semibold text-white">AAPL</h3>
                                        <span className="text-green-400 font-semibold">+ $1,275.00</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-400 text-[0.9rem]">$8,775.00</span>
                                        <span className="text-green-400 text-[0.9rem]">+17.00%</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="text-gray-600 mt-4 mb-4"/>

                            <div className="flex justify-between">
                                <h2 className="text-white font-semibold">Total Portfolio</h2>
                                <span className="text-white font-semibold">$3,700.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-white font-semibold text-lg mb-6">Financial Summary</h2>

                        <div className="flex justify-around">
                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-blue-600 rounded-lg p-4">
                                    <MdAccountBalance className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Total Income (6M)</h4>
                                    <span className="text-white font-semibold">$37,400.00</span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-red-600 rounded-lg p-4">
                                    <MdAccountBalance className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Total Income (6M)</h4>
                                    <span className="text-white font-semibold">$37,400.00</span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-green-600 rounded-lg p-4">
                                    <MdAccountBalance className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Total Income (6M)</h4>
                                    <span className="text-white font-semibold">$37,400.00</span>
                                </div>
                            </div>

                            <div className="flex justify-center items-center flex-col gap-y-2">
                                <div className="bg-purple-600 rounded-lg p-4">
                                    <MdAccountBalance className="text-white text-[1.2rem]"/>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h4 className="text-gray-500 text-[0.9rem]">Total Income (6M)</h4>
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