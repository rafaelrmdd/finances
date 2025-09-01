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

interface Budget {
    id: string;
    name: string;
    description?: string;
    amount: string;
    startDate: Date;
    endDate: Date;
    category: CategoriesEnum;
    timestamp: string;
}

interface BudgetDataProps {
    budgets: Budget[] | undefined;
    error: Error | null;
    isPending: boolean;
}

export const BudgetContext = createContext({} as BudgetDataProps);
    
export function BudgetProvider({children}: ContextProviderProps) {
    const { isPending, error, 'data': budgets } = useQuery({
        queryKey: ['budgets'],
        queryFn: async (): Promise<Budget[]> => {
            const response = await fetch('https://localhost:5185/api/budget');

            return await response.json();
        }   
    });

    return (
        <BudgetContext.Provider value={{ 
            budgets, 
            error, 
            isPending 
        }}>
            {children}
        </BudgetContext.Provider>
    )
}