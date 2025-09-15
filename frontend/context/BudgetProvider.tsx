'use client'

import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect } from "react";
import { CategoriesEnum } from "./TransactionProvider";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import nookies, { parseCookies } from 'nookies'
import { getToken } from "next-auth/jwt";

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
    const router = useRouter();
    const { status } = useSession();
    const { 'next-auth.session-token': jwt } = parseCookies();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push("/auth/signIn");
            return;
        }

    }, [status])

    const queryClient = useQueryClient();

    const { isPending, error, 'data': budgets } = useQuery({
        queryKey: ['budgets'],
        queryFn: async (): Promise<Budget[]> => {
            const response = await fetch('https://localhost:5185/api/budget', {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            return await response.json();
        }   
    });

    const createBudgetMutation = useMutation({
        mutationFn: async (data: CreateBudget) => {
            await fetch('https://localhost:5185/api/budget', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] })
        },
        onError: (error) => {
            console.log("Error creating new 'Budget':", error.message);
        }
    })

    const updateBudgetMutation = useMutation({
        mutationFn: async ({ id, updateData }: { id: string; updateData: UpdateBudget }) => {
            const response = await fetch(`https://localhost:5185/api/budget/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['savings'] });
        },
        onError: (error) => {
            console.log("Error updating 'Budget':", error.message);
        }
    })
    
    const removeBudgetMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`https://localhost:5185/api/budget/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['savings'] });
        },
        onError: (error) => {
            console.log("Error removing 'Budget':", error.message);
        }
    })

    return (
        <BudgetContext.Provider value={{ 
            budgets,
            createBudget: createBudgetMutation.mutate, 
            updateBudget: updateBudgetMutation.mutate,
            removeBudget: removeBudgetMutation.mutate,
            error, 
            isPending 
        }}>
            {children}
        </BudgetContext.Provider>
    )
}