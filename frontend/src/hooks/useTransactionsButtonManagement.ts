import { useCallback, useEffect, useState } from "react";

export function useTransactionsButtonManagement() {
    const categories = [
        'food',
        'transportation', 
        'entertainment',
        'housing',
        'education',
        'shopping'
    ]

    const [transactionType, setTransactionType] = useState("");
    const [transactionCategory, setTransactionCategory] = useState("");

    const isIncomeActive = transactionType === "income";
    const isExpenseActive = transactionType === "expense";
    
    const isCategoryActive = useCallback((category: string) => {
        return category === transactionCategory;
    }, [transactionCategory])

    const toggleCategory = useCallback((category: string) => {
        setTransactionCategory(current => current === category ? "" : category);
    }, []);

    return {
        isIncomeActive,
        isExpenseActive,
        categories,
        isCategoryActive,
        toggleCategory,
        selectIncome: () => setTransactionType("income"),
        selectExpense: () => setTransactionType("expense"),
    }
}