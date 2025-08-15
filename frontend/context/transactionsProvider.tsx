'use client'

import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";

interface ContextProviderProps {
    children: ReactNode; 
}

export enum CategoriesEnum {
    INCOME = 'income',
    FOOD = 'food',
    TRANSPORTATION = 'transportation',
    ENTERTAINMENT = 'entertainment',
    HOUSING = 'housing',
    EDUCATION = 'education',
    SHOPPING = 'shopping',
    OTHER = 'other',
}

export enum TypesEnum {
    INCOME = 'income',
    EXPENSE = 'expense'
}

interface Transaction {
    id: string;
    name: string;
    type: TypesEnum;
    category: CategoriesEnum;
    value: string;
    timestamp: string;
}

interface TransactionsDataProps {
    transactions: Transaction[];
}

export const TransactionsContext = createContext<TransactionsDataProps>({} as TransactionsDataProps);

export function TransactionsProvider({children}: ContextProviderProps) {
    const { isPending, error, 'data': transactions } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const response = await fetch('https://localhost:5185/api/transactions');

            return await response.json();
        }   
    });

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}