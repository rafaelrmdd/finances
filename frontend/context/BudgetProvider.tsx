'use client'

import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";
import { CategoriesEnum } from "./TransactionProvider";

interface ContextProviderProps {
    children: ReactNode; 
}

export interface Budget {
    id: string;
    name: string;
    description?: string;
    amount: string;
    startDate: string;
    endDate: string;
    category: CategoriesEnum;
    timestamp: string;
}

const BUDGET_STATUS = {
    UNDER_BUDGET: "under-budget",
    ON_TRACK: "on-track", 
    WARNING: "warning",
    OVER_BUDGET: "over-budget",
    CRITICAL: "critical"
};

export type UpdateBudget = Omit<Budget, 'id' | 'timestamp'>
export type CreateBudget = Omit<Budget, 'id' | 'timestamp'>

interface BudgetDataProps {
    budgets: Budget[] | undefined;
    createBudget: UseMutateFunction<void, Error, CreateBudget, unknown>;
    updateBudget: UseMutateFunction<void, Error, { id: string; updateData: UpdateBudget; }, unknown>
    removeBudget: UseMutateFunction<void, Error, string, unknown>
    error: Error | null;
    isPending: boolean;
}

export const BudgetContext = createContext({} as BudgetDataProps);
    
export function BudgetProvider({children}: ContextProviderProps) {
    const queryClient = useQueryClient();

    const { isPending, error, 'data': budgets } = useQuery({
        queryKey: ['budgets'],
        queryFn: async (): Promise<Budget[]> => {
            const response = await fetch('https://localhost:5185/api/budget');

            return await response.json();
        }   
    });

    const createBudgetMutation = useMutation({
        mutationFn: async (data: CreateBudget) => {
            await fetch('https://localhost:5185/api/budget', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-type': 'application/json'}
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] })
        },
        onError: (error) => {
            console.log("Error creating new 'Budget':", error.message);
        }
    })

    const updateSavingMutation = useMutation({
        mutationFn: async ({ id, updateData }: { id: string; updateData: UpdateBudget }) => {
            const response = await fetch(`https://localhost:5185/api/budget/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
                headers: {'Content-type': 'application/json'}
            })
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['savings'] });
        },
        onError: (error, variables, context) => {
            console.log("Error updating 'Saving':", error.message);
        }
    })
    
    const removeSavingMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`https://localhost:5185/api/budget/${id}`, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json'}
            })
        }
    })

    return (
        <BudgetContext.Provider value={{ 
            budgets,
            createBudget: createBudgetMutation.mutate, 
            updateBudget: updateSavingMutation.mutate,
            removeBudget: removeSavingMutation.mutate,
            error, 
            isPending 
        }}>
            {children}
        </BudgetContext.Provider>
    )
}