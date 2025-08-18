import { MdDelete, MdEdit } from "react-icons/md";

export function SavingsCard() {
    //temp variable
    const valueSpentPercentage = 50;

    return (
        <div className="p-6 rounded-lg bg-gray-700">
            <div className="flex mb-4">
                <div className="bg-red-400 flex items-center rounded-lg mr-4 p-2">
                    <h3>Icon</h3>
                </div>

                <div className="w-full">
                    <div className="flex justify-between">
                        <h2 className="text-white font-semibold text-xl">Emergency Fund</h2>
                        <div className="flex gap-x-4 text-gray-400 text-[1.1rem]">
                            <MdEdit />
                            <MdDelete/>
                        </div>
                    </div>
                    <h3 className="text-gray-400 text-[0.9rem]">Category</h3>
                </div>
            </div>

            <div>
                <div className="flex justify-between mb-2">
                    <h3 className="text-[0.9rem] text-gray-400">Progress</h3>

                    <span className="text-white">65.5%</span>
                </div>

                {/* Progress Bar */}
                <div 
                    className="w-full rounded-lg mb-4 bg-gray-600"
                >
                    <div className={`bg-blue-400 w-[${valueSpentPercentage}%] p-1 rounded-lg`}></div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-y-4">
                <div className="flex items-start w-full">
                    <div className="w-1/2">
                        <h3 className="text-gray-400 text-[0.9rem]">Current</h3>
                        <span className="text-white font-semibold">$6.500.00</span>
                    </div>

                    <div className="w-1/12">
                        <h3 className="text-gray-400 text-[0.9rem]">Target</h3>
                        <span className="text-white font-semibold">$10.000.00</span>
                    </div>
                </div>

                <div className="flex items-start w-full">
                    <div className="w-1/2">
                        <h3 className="text-gray-400 text-[0.9rem]">Remaining</h3>
                        <span className="text-white font-semibold">$6.500.00</span>
                    </div>

                    <div className="w-1/12">
                        <h3 className="text-gray-400 text-[0.9rem]">Monthly</h3>
                        <span className="text-white font-semibold">$10.000.00</span>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div>
                        <h3 className="text-gray-400 text-[0.9rem]">Target Date</h3>
                        <span className="text-white">30/12/2025</span>
                    </div>

                    <button
                        className="px-4 py-3 text-white bg-blue-500 rounded-lg"
                    >
                        Add Funds
                    </button>
                </div>
            </div>
        </div>
    )
}