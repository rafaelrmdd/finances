import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useMemo, useState } from "react";
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
        sortByDate: searchParams.get('sortByDate') || '',
        category: searchParams.get('category') || '',
    })

    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();

            result = result.filter((t) => t.name.includes(keyword));
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
                    result = result.filter((t) => new Date(t.timestamp) <= prior30Days);
                case '7_days':
                    result = result.filter((t) => new Date(t.timestamp) <= prior7Days)
                case 'this_month':
                    result = result.filter((t) => new Date(t.timestamp).getMonth() === currentMonth)
                case 'last_month':
                    result = result.filter((t) => new Date(t.timestamp).getMonth() === currentMonth - 1)
                case 'this_year':
                    result = result.filter((t) => new Date(t.timestamp).getFullYear() === currentYear)
            }
        }

        if (filters.category) {
            const category = filters.category;

            result = result.filter((t) => t.category === category);
        }

        return result;
    }, [filters])

    const clearFilters = () => {
        setFilters({
            keyword: '',
            sortByDate: '',
            category: '',
        })
    }

    return {
        filteredTransactions,
        createQueryString,
        clearFilters
    }
}