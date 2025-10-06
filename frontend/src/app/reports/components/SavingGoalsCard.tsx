import { useContext } from "react";
import { SavingContext } from "../../../../context/SavingProvider";
import { formatMoney } from "@/utils/formatters";

export function SavingGoalsCard() {
    const { savings } = useContext(SavingContext);

    return (
        <div className="bg-gray-800 rounded-lg p-6 overflow-y-auto">
            <h2 className="text-white font-semibold text-lg mb-4">Saving Goals Progress</h2>

            <div className="space-y-2">
                {savings?.map((s) => {
                    const percentage = ((Number(s.currentAmount) / Number(s.targetAmount)) * 100).toFixed();
                
                    return (
                        <div
                            key={s.id} 
                        >
                            <div className="flex justify-between mb-2">
                                <h3 className="text-gray-300 text-[0.9rem]">{s.name}</h3>

                                <span className="text-gray-400 text-[0.9rem]">
                                    {percentage}%
                                </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div 
                                className="w-full rounded-lg mb-1 bg-gray-600"
                            >
                                {/* w-[] must be conditional */}
                                <div 
                                    className={`bg-green-400 p-1 rounded-lg max-w-full`}
                                    style={{width: `${percentage}%`}}
                                ></div>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-400 text-[0.9rem]">{formatMoney(Number(s.currentAmount))}</span> 
                                
                                <span className="text-gray-400 text-[0.9rem]">{formatMoney(Number(s.targetAmount))}</span>
                            </div>
                        </div>
                    )
                })}
            </div> 

            <hr className="text-gray-600 mt-4 mb-4"/>

            <div className="flex justify-between">
                <h2 className="text-white font-semibold">Total Saved</h2>
                <span className="text-white font-semibold">$3,700.00</span>
            </div>
        </div>
    )
}