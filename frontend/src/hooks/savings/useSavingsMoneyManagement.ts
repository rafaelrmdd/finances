import { useContext } from "react"
import { SavingContext } from "../../../context/SavingProvider"
import { formatMoney } from "@/utils/formatters";

export function useSavingsMoneyManagement() {
    const { savings = []} = useContext(SavingContext);

    const totalSaved = savings.reduce((acc, s) => acc + Number(s.currentAmount), 0);
    const totalGoals = savings.length;
    const totalToSave = savings.reduce((acc, s) => acc + Number(s.targetAmount), 0);

    const remainingToSave = totalToSave - totalSaved <= 0 ? 0 : totalToSave - totalSaved;

    const totalSavedFormatted = formatMoney(totalSaved);
    const remainingToSaveFormatted = formatMoney(remainingToSave)
    return {
        totalSaved: totalSavedFormatted,
        totalGoals: String(totalGoals),
        remainingToSave: remainingToSaveFormatted
    }
}