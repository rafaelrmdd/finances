import { useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { SavingContext } from "../../../context/SavingProvider";

export function useSavingsFilters() {
    const { savings = [] } = useContext(SavingContext);

    const searchParams = useSearchParams();

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        return params.toString()
    }, [searchParams])


    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        category: searchParams.get('category') || '',
    })

    useEffect(() => {
        setFilters({
            keyword: searchParams.get('keyword') || '',
            category: searchParams.get('category') || '',
        })
    }, [searchParams])

    const filterSavings = () => {
        let result = [...savings];

        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();

            result = result.filter((s) => s.name.includes(keyword));
        }

        if (filters.category) {
            const category = filters.category;
            
            if(category != "all"){
                result = result.filter((s) => s.category === category);
            }
        }

        return result;
    }

    const filteredSavings = filterSavings();

    const clearFilters = () => {
        setFilters({
            keyword: '',
            category: '',
        })
    }

    return {
        filteredSavings,
        createQueryString,
        clearFilters,
    }
}