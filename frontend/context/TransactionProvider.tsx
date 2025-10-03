'use client'

import { UseMutateFunction, useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { createContext, ReactNode, useContext } from "react";
import { UserContext } from "./UserProvider";

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

export interface Transaction {
    id: string;
    name: string;
    type: TypesEnum;
    category: CategoriesEnum;
    value: string;
    userId?: string;
    timestamp: string;
}

export type UpdateTransaction = Omit<Transaction, 'id' | 'timestamp'>
export type CreateTransaction = Omit<Transaction, 'id' | 'timestamp'>

interface TransactionDataProps {
    transactions: Transaction[] | undefined;
    createTransaction: UseMutateFunction<void, Error, CreateTransaction, unknown>;
    updateTransaction: UseMutateFunction<void, Error, { id: string; updateData: UpdateTransaction; }, unknown>
    removeTransaction: UseMutateFunction<void, Error, string, unknown>
    error: Error | null;
    isPending: boolean;
}


export const TransactionContext = createContext({} as TransactionDataProps);

export function TransactionProvider({children}: ContextProviderProps) {
    const { 'next-auth.session-token': jwt } = parseCookies();
    const { user } = useContext(UserContext);
    const userId = user?.id;

    const queryClient = useQueryClient();

    const { isPending, error, 'data': transactions } = useQuery({
        queryKey: ['transactions'],
        queryFn: async (): Promise<Transaction[]> => {
            const response = await fetch(`https://localhost:5185/api/transaction/userid/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            return await response.json();
        }   
    });

    const createTransactionMutation = useMutation({
        mutationFn: async (data: CreateTransaction) => {
            await fetch('https://localhost:5185/api/transaction', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['transactions'] });
        },
        onError: (error) => {
            console.log("Error creating new 'Transaction':", error.message);
        }
    })

    const updateTransactionMutation = useMutation({
        mutationFn: async ({ id, updateData }: { id: string; updateData: UpdateTransaction }) => {
            const response = await fetch(`https://localhost:5185/api/transaction/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['transactions'] });
        },
        onError: (error, variables, context) => {
            console.log("Error updating 'Transaction':", error.message);
        }
    })
    
    const removeTransactionMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`https://localhost:5185/api/transaction/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        }
    })

    return (
        <TransactionContext.Provider value={{ 
            transactions,
            createTransaction: createTransactionMutation.mutate,
            updateTransaction: updateTransactionMutation.mutate,
            removeTransaction: removeTransactionMutation.mutate,  
            error, 
            isPending 
        }}>
            {children}
        </TransactionContext.Provider>
    )
}