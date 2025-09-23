import { MdShowChart } from "react-icons/md";

export function Chart() {
    return (
        <div className="p-6 bg-gray-800 rounded-lg min-h-96">
            <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                    <MdShowChart className="text-[1.1rem] text-blue-500"/>
                    <h2 className="text-xl font-semibold text-white">Monthly Trend (6 Months)</h2>
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
    )
}