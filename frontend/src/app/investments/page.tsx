'use client'

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import {
	MdTrendingUp,
	MdTrendingDown,
	MdShowChart,
	MdAccountBalance,
	MdAdd,
	MdSearch,
	MdFilterList,
	MdEdit,
	MdDelete,
	MdMoreVert,
	MdAttachMoney,
	MdPercent,
	MdDateRange,
	MdBusinessCenter,
	MdCurrencyBitcoin,
	MdHome,
	MdLocalAtm,
	MdSecurity,
    MdWallet,
    MdRemove
} from "react-icons/md";

export default function Investments() {
    const type = 'gain';

    return (
        <div className="w-full bg-gray-900">
            <Header />

            <div className="p-4 min-h-screen h-full bg-gray-900">
                <section className="grid grid-cols-4 gap-x-4 mb-8">
                    <Card
                        icon={{
                            icon: MdAccountBalance,
                            color: 'bg-blue-200'
                        }}
                        balance="50.000.00"
                        cardName="Total Portfolio"
                        cardBgColor="bg-blue-400"
                    />

                    <Card
                        icon={{
                            //might be trendingdown, add conditional
                            icon: MdTrendingUp,
                            //might be red
                            color: 'bg-green-200'
                        }}
                        balance="50.000.00"
                        cardName="Total Gain/Loss"
                        //might be red
                        cardBgColor="bg-green-400"
                    />

                    <Card
                        icon={{
                            icon: MdShowChart,
                            color: 'bg-purple-200'
                        }}
                        balance="50.000.00"
                        cardName="Total Dividends"
                        cardBgColor="bg-purple-400"
                    />

                    <Card
                        icon={{
                            icon: MdBusinessCenter,
                            color: 'bg-yellow-200'
                        }}
                        balance="5 Assets"
                        cardName="Active Investments"
                        cardBgColor="bg-yellow-400"
                    />
                </section>

                <main>
                    <div className="p-4 bg-gray-800 rounded-lg mb-8">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-white">Investment Portfolio</h2>

                            <button
                                // onClick={openModal}
                                className="flex items-center gap-x-2 px-3 py-2 rounded-lg
                                bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600
                                transition duration-150"
                            >
                                <MdAdd className="text-xl" />
                                Add Investment
                            </button>
                        </div>

                        <div className="flex gap-x-3 items-start">
                            <div className="relative bg-gray-700 rounded-lg w-96 text-white
                            placeholder:text-gray-600 border-white ">
                                <MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                                <input
                                    // onChange={(e) => setSearchKeyword(e.target.value)}
                                    className="w-full h-full p-[8.5px] pl-10 outline-0 border border-transparent focus:border-blue-500
                                    rounded-lg"
                                    type="text"
                                    placeholder="Search investments..."
                                />
                            </div>

                            <div className="flex items-center gap-x-2 bg-gray-700 rounded-lg px-3 py-2">
                                <MdFilterList className="text-white" />
                                <h3 className="text-white">Filter</h3>
                            </div>

                            <div className="bg-gray-700 rounded-lg">
                                <select
                                    className="text-white bg-gray-700 w-36 border border-transparent
                                    focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
                                    name="categories"
                                >
                                    <option value="all_categories">All Categories</option>
                                    <option value="income">Emergency</option>
                                    <option value="transportation">Vacation</option>
                                    <option value="food_and_drinking">Car</option>
                                    <option value="entertainment">Wedding</option>
                                    <option value="housing">Retirement</option>
                                    <option value="education">Education</option>
                                    <option value="education">Business</option>
                                    <option value="education">Investment</option>
                                    <option value="education">Health</option>
                                    <option value="education">Technology</option>
                                    <option value="education">Other</option>
                                </select>
                            </div>

                            <div className="bg-gray-700 rounded-lg">
                                <select
                                    className="text-white px-3 py-2 bg-gray-700 border border-transparent 
                                    focus:border-blue-500 rounded-lg outline-0"
                                    name="time"
                                >
                                    <option value="30_days">All Status</option>
                                    <option value="7_days">On Track</option>
                                    <option value="this_month">Behind Schedule</option>
                                    <option value="last_month">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Make table rounded later */}
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-6 py-4 text-white font-semibold">Asset</th>
                                    <th className="px-6 py-4 text-white font-semibold">Type</th>
                                    <th className="px-6 py-4 text-white font-semibold">Quantity</th>
                                    <th className="px-6 py-4 text-white font-semibold">Purchase Price</th>
                                    <th className="px-6 py-4 text-white font-semibold">Current Price</th>
                                    <th className="px-6 py-4 text-white font-semibold">Total Value</th>
                                    <th className="px-6 py-4 text-white font-semibold">Gain/Loss</th>
                                    <th className="px-6 py-4 text-white font-semibold">Dividend </th>
                                    <th className="px-6 py-4 text-white font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="bg-gray-800">
                                    <td className="px-6 py-4">
                                        <h3 className="text-white font-semibold">TestInvestmentName</h3>
                                        <span className="text-gray-400 text-[0.9rem]">TestCompanyName</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <h3 className="text-gray-400">Stocks</h3>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-white">50</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-white">$150.00</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-white">$175.00</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-white">$8.775.00</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-semibold block ${type === 'gain' ? 'text-green-400' : 'text-red-400'}`}>$1.275.00</span>
                                        <span className={`text-[0.9rem] ${type === 'gain' ? 'text-green-400' : 'text-red-400'}`}>+ 17.00%</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-white">0.24%</span>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className="flex text-gray-500 gap-x-4 text-[1.2rem] items-center justify-center]">
                                            <MdEdit className="hover:text-blue-400"/>
                                            <MdDelete className="hover:text-red-400"/>
                                            <MdMoreVert className="hover:text-white"/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Put pagination here later */}
                    </div>
                </main>
            </div>
            
        </div>
    )
}