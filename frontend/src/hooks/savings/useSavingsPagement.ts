import { useState } from "react";
import { Saving } from "../../../context/SavingProvider";

export function useSavingsPagement(filteredSavings: Saving[]) {

    const [currentPage, setCurrentPage] = useState(1);
    const [sliceBeginning, setSliceBeginning] = useState(0);
    const [sliceLimit, setSliceLimit] = useState(6);
    const lengthFilteredSavings = filteredSavings.length;
    const savingsPerPage = 6;
    const totalPages = Math.ceil(filteredSavings.length / savingsPerPage);
    const canGoNextPage = currentPage < totalPages;
    const canGoPreviousPage = sliceBeginning != 0;

    return {
        canGoNextPage,
        canGoPreviousPage,
        totalPages,
        savingsPerPage,
        sliceLimit,
        setSliceLimit,
        sliceBeginning,
        setSliceBeginning,
        currentPage,
        setCurrentPage,
        lengthFilteredSavings
    }
}