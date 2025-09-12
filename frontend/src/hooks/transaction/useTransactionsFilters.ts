import { useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TransactionContext } from "../../../context/TransactionProvider";

export function useTransactionsFilters() {
    const { transactions = [] } = useContext(TransactionContext);

    const searchParams = useSearchParams();
    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
    
        return params.toString()
    }, [searchParams])

    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        sortByDate: searchParams.get('sortbydate') || '',
        category: searchParams.get('category') || '',
        type: searchParams.get('type') || '',
    })

    useEffect(() => {
        setFilters({
            keyword: searchParams.get('keyword') || '',
            sortByDate: searchParams.get('sortbydate') || '',
            category: searchParams.get('category') || '',
            type: searchParams.get('type') || '',
        })
    }, [searchParams])

    const filterTransactions = () => {
        let result = [...transactions];

        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();

            result = result.filter((t) => t.name.toLowerCase().includes(keyword));
        }

        if (filters.sortByDate) {
            const sortByDate = filters.sortByDate;
            const currentMonth = new Date().getMonth();
	        const currentYear = new Date().getFullYear();

            const today = new Date();
            const prior7Days = new Date(new Date().setDate(today.getDate() - 7));
            const prior30Days = new Date(new Date().setDate(today.getDate() - 30));

            switch(sortByDate) {
                case '30_days': 
                    result = result.filter((t) => new Date(t.timestamp) >= prior30Days);
                    break;
                case '7_days':
                    result = result.filter((t) => new Date(t.timestamp) >= prior7Days);
                    break;
                case 'this_month':
                    result = result.filter((t) => new Date(t.timestamp).getMonth() === currentMonth);
                    break;
                case 'last_month':
                    result = result.filter((t) => new Date(t.timestamp).getMonth() === currentMonth - 1);
                    break;
                case 'this_year':
                    result = result.filter((t) => new Date(t.timestamp).getFullYear() === currentYear)
                    break;
            }
        }

        if (filters.category) {
            const category = filters.category.toLowerCase();
            
            if(category != "all"){
                result = result.filter((t) => t.category.toLowerCase() === category);
            }
        }

        if (filters.type) {
            const type = filters.type.toLowerCase();

            if (type != "all") {
                result = result.filter((t) => t.type.toLowerCase() === type);
            }
        }

        return result;
    }

    const filteredTransactions = filterTransactions();

    const clearFilters = () => {
        setFilters({
            keyword: '',
            sortByDate: '',
            category: '',
            type: '',
        })
    }

    return {
        filteredTransactions,
        createQueryString,
        clearFilters
    }
}