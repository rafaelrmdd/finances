import { useContext } from "react"
import { SavingContext } from "../../../context/SavingProvider"
import { formatMoney } from "@/utils/formatters";

export function useSavingsMoneyManagement() {
    const { savings = []} = useContext(SavingContext);

    const totalSaved = savings.reduce((acc, s) => acc + Number(s.currentAmount), 0);
    const goalsLength = savings.length;
    const totalToSave = savings.reduce((acc, s) => acc + Number(s.targetAmount), 0);
    const goalsCompleted = savings
        .filter((s) => Number(s.currentAmount) >= Number(s.targetAmount))
        .length;
    const percentageGoalsCompleted = ((goalsCompleted / goalsLength) * 100).toFixed(); 

    const remainingToSave = totalToSave - totalSaved <= 0 ? 0 : totalToSave - totalSaved;
    console.log(savings, goalsCompleted);

    const totalSavedFormatted = formatMoney(totalSaved);
    const remainingToSaveFormatted = formatMoney(remainingToSave)
    const totalToSaveFormatted = formatMoney(totalToSave);
    const percentageGoalsCompletedFormatted = formatMoney(percentageGoalsCompleted);
    return {
        totalSaved: totalSavedFormatted,
        goalsLength: String(goalsLength),
        remainingToSave: remainingToSaveFormatted,
        totalToSave: totalToSaveFormatted,
        goalsCompleted,
        percentageGoalsCompleted: percentageGoalsCompletedFormatted
    }
}