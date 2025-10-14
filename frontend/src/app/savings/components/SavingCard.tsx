import { MdDelete, MdEdit } from "react-icons/md";
import { Saving, SavingContext } from "../../../../context/SavingProvider";
import { formatDate, formatMoney, formatWord } from "@/utils/formatters";
import { useContext } from "react";
import { AddFundsButton } from "./Buttons/AddFundsButton";
import { EditSavingButton } from "./Buttons/EditSavingButton";

interface SavingCardProps {
    saving: Saving
}

export function SavingCard({
    saving,
}: SavingCardProps) {
    const { removeSaving } = useContext(SavingContext);

    const {
        id,
        'targetDate': targetDateString,
        currentAmount,
        targetAmount,
        name,
        description,
        category,
        'timestamp': timestampString,
    } = saving;

    const targetDate = new Date(targetDateString);
    const timestamp = new Date(timestampString);

    const formattedTargetDate = formatDate(targetDate, "yyyy/mm/dd");
    const formattedDateOfCreation = formatDate(timestamp, "yyyy/mm/dd")
    const formattedCurrentAmount = formatMoney(currentAmount);
    const formattedTargetAmount = formatMoney(targetAmount);
    const formattedRemaining = formatMoney(Number(targetAmount) - Number(currentAmount)); 

    const goalProgressPercentage = (Number(currentAmount) / Number(targetAmount)) * 100
    const goalProgressPercentageFormatted = goalProgressPercentage.toFixed();

    const categoryFormatted = formatWord(saving.category);

    return (
        <div className="p-6 rounded-lg bg-gray-800">
            <div className="flex mb-4">
                <div className="bg-red-400 flex items-center rounded-lg mr-4 p-2">
                    <h3>Icon</h3>
                </div>

                <div className="w-full">
                    <div className="flex justify-between">
                        <h2 className="text-white font-semibold text-xl">{name}</h2>
                        <div className="flex gap-x-4 text-gray-400 text-[1.1rem]">
                            <EditSavingButton 
                                saving={saving}
                            />
                            <MdDelete
                                onClick={() => removeSaving(id)}
                                className="hover:text-red-400"
                            />
                        </div>
                    </div>
                    <h3 className="text-gray-400 text-[0.9rem]">{categoryFormatted}</h3>
                </div>
            </div>
            
            <h2 className="text-gray-300 mb-4">{description}</h2>

            <div>
                <div className="flex justify-between mb-2">
                    <h3 className="text-[0.9rem] text-gray-400">Progress</h3>

                    <span className="text-white">{goalProgressPercentageFormatted}%</span>
                </div>

                {/* Progress Bar */}
                <div 
                    className="w-full rounded-lg mb-4 bg-gray-600"
                >
                    <div 
                        className={`bg-blue-400 p-1 rounded-lg h-full transition-all duration-150 max-w-full`} 
                        style={{ width: `${goalProgressPercentage}%` }}
                    >
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-y-4">
                <div className="flex items-start w-full">
                    <div className="w-1/2">
                        <h3 className="text-gray-400 text-[0.9rem]">Current</h3>
                        <span className="text-white font-semibold">${formattedCurrentAmount}</span>
                    </div>

                    <div className="w-1/12">
                        <h3 className="text-gray-400 text-[0.9rem]">Target</h3>
                        <span className="text-white font-semibold">${formattedTargetAmount}</span>
                    </div>
                </div>

                <div className="flex items-start w-full">
                    <div className="w-1/2">
                        <h3 className="text-gray-400 text-[0.9rem]">Remaining</h3>
                        <span className="text-white font-semibold">{formattedRemaining}</span>
                    </div>

                    {/* <div className="w-1/12">
                        <h3 className="text-gray-400 text-[0.9rem]">Monthly</h3>
                        <span className="text-white font-semibold">$10.000.00</span>
                    </div> */}
                </div>

                <div className="flex justify-between">
                    <div>
                        <h3 className="text-gray-400 text-[0.9rem]">Date of Creation</h3>
                        <span className="text-white">{formattedDateOfCreation}</span>
                    </div>

                    <div>
                        <h3 className="text-gray-400 text-[0.9rem]">Target Date</h3>
                        <span className="text-white">{formattedTargetDate}</span>
                    </div>

                    <AddFundsButton
                        currentAmount={currentAmount} 
                        targetAmount={targetAmount}
                        percentage={goalProgressPercentage}
                        id={id}
                        saving={saving}
                    />
                </div>
            </div>
        </div>
    )
}