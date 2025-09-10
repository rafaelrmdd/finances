import { useState } from "react";
import { Transaction } from "../../../context/TransactionProvider";

export function useTransactionsPagement(filteredTransactions: Transaction[]) {

    const lengthOfFilteredTransactions = filteredTransactions.length;
    const [currentPage, setCurrentPage] = useState(1);
    const [sliceBeginning, setSliceBeginning] = useState(0);
    const [sliceLimit, setSliceLimit] = useState(10);
    const transactionsPerPage = 10;
    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const canGoNextPage = currentPage < totalPages;
    const canGoPreviousPage = sliceBeginning != 0;

    return {
        canGoNextPage,
        canGoPreviousPage,
        totalPages,
        transactionsPerPage,
        sliceLimit,
        setSliceLimit,
        sliceBeginning,
        setSliceBeginning,
        currentPage,
        setCurrentPage,
        lengthOfFilteredTransactions
    }
}