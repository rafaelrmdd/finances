import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";

interface ContextProviderProps {
    children: ReactNode; 
}

interface TransactionsDataProps {
    data: {};
}

export const TransactionsContext = createContext<TransactionsDataProps>({} as TransactionsDataProps);

export function TransactionsProvider({children}: ContextProviderProps) {
    const { isPending, error, data } = useQuery({
        queryKey: ['transactionsData'],
        queryFn: () =>
            fetch('https://localhost/5185/api/finances').then(res => 
                res.json()
            ),
    });

    return (
        <TransactionsContext.Provider value={{ data }}>
            {children}
        </TransactionsContext.Provider>
    )
}