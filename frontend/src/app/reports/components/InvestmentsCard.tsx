import { MdTimeline } from "react-icons/md";

export function InvestmentsCard() {
    return (
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
    )
}