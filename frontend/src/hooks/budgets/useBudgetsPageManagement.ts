import { useState } from "react";
import { Budget } from "../../../context/BudgetProvider";

export function useBudgetsPagement(budgets: Budget[]) {

    const [currentPage, setCurrentPage] = useState(1);
    const [sliceBeginning, setSliceBeginning] = useState(0);
    const [sliceLimit, setSliceLimit] = useState(6);
    const lengthBudgets = budgets.length;
    const budgetsPerPage = 6;
    const totalPages = Math.ceil(budgets.length / budgetsPerPage);
    const canGoNextPage = currentPage < totalPages;
    const canGoPreviousPage = sliceBeginning != 0;

    return {
        canGoNextPage,
        canGoPreviousPage,
        totalPages,
        budgetsPerPage,
        sliceLimit,
        setSliceLimit,
        sliceBeginning,
        setSliceBeginning,
        currentPage,
        setCurrentPage,
        lengthBudgets
    }
}