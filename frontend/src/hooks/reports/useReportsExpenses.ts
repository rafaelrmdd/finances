import { useContext } from "react";
import { CategoriesEnum, TransactionContext } from "../../../context/TransactionProvider";
import { formatMoney } from "@/utils/formatters";

export function useReportsExpenses() {
    const { transactions = [] } = useContext(TransactionContext); 

    formatMoney

    const getExpenseByCategory = (category: CategoriesEnum) => {
        const expenses = transactions
            .filter((t) => t.category === category)
            .reduce((acc, t) => acc + Number(t.value), 0);

        return expenses;
    }

    const foodExpenses = getExpenseByCategory(CategoriesEnum.FOOD);
    const transportationExpenses = getExpenseByCategory(CategoriesEnum.TRANSPORTATION);
    const entertainmentExpenses =  getExpenseByCategory(CategoriesEnum.ENTERTAINMENT);
    const housingExpenses =  getExpenseByCategory(CategoriesEnum.HOUSING);
    const educationExpenses =  getExpenseByCategory(CategoriesEnum.EDUCATION);
    const shoppingExpenses = getExpenseByCategory(CategoriesEnum.SHOPPING);
    const otherExpenses = getExpenseByCategory(CategoriesEnum.OTHER);

    const totalExpenses = 
        foodExpenses + 
        transportationExpenses + 
        entertainmentExpenses + 
        housingExpenses +
        educationExpenses + 
        shoppingExpenses + 
        otherExpenses

    const getPercentageParticipationByExpense = (expense: number) => {
        return ((expense / totalExpenses) * 100).toFixed(2) + "%";
    }

    return {
        expenses: {
            foodExpensesFormatted: formatMoney(foodExpenses),
            transportationExpensesFormatted: formatMoney(transportationExpenses),
            entertainmentExpensesFormatted: formatMoney(entertainmentExpenses),
            housingExpensesFormatted: formatMoney(housingExpenses),
            educationExpensesFormatted: formatMoney(educationExpenses),
            shoppingExpensesFormatted: formatMoney(shoppingExpenses),
            otherExpensesFormatted: formatMoney(otherExpenses),
        },
        percentages: {
            foodPercentageParticipation: getPercentageParticipationByExpense(foodExpenses),
            transportationPercentageParticipation: getPercentageParticipationByExpense(transportationExpenses),
            entertainmentPercentageParticipation: getPercentageParticipationByExpense(entertainmentExpenses),
            housingPercentageParticipation: getPercentageParticipationByExpense(housingExpenses),
            educationPercentageParticipation: getPercentageParticipationByExpense(educationExpenses),
            shoppingPercentageParticipation: getPercentageParticipationByExpense(shoppingExpenses),
            otherPercentageParticipation: getPercentageParticipationByExpense(otherExpenses),
        },
        totalExpensesFormatted: formatMoney(totalExpenses),
    }
}