import { AddFunds } from "@/app/savings/components/Modals/AddFundsModal";
import { QueryClient, UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { ReactNode } from "react";
import { createContext } from "react";

export enum SavingCategoriesEnum {
    EMERGENCY = 'emergency',
    VACATION = 'vacation', 
    HOUSING = 'housing',
    CAR = 'car',
    WEDDING = 'wedding',
    RETIREMENT = 'retirement',
    EDUCATION = 'education',
    BUSINESS = 'business',
    INVESTMENT = 'investment',
    HEALTH = 'health',
    TECHNOLOGY = 'technology',
    OTHER = 'other'
}

export interface Saving {
    id: string;
    name: string;
    description?: string;
    userId: string;
    category: SavingCategoriesEnum;
    currentAmount: string;
    targetAmount: string;
    targetDate: string;
    timestamp: string;
}

export type UpdateSaving = Omit<Saving, 'id' | 'timestamp' | 'userId'>;
export type CreateSaving = Omit<Saving, 'id' | 'timestamp' | 'currentAmount'>;

interface SavingDataProps {
    savings: Saving[] | undefined; 
    createSaving: UseMutateFunction<void, Error, CreateSaving, unknown>;
    removeSaving: UseMutateFunction<void, Error, string, unknown>
    updateSaving: UseMutateFunction<void, Error, { id: string; updateData: UpdateSaving; }, unknown>
}

export const SavingContext = createContext<SavingDataProps>({} as SavingDataProps);

export function SavingProvider({ children }: { children: ReactNode }) {
    const { 'next-auth.session-token': jwt } = parseCookies();

    const queryClient = useQueryClient();

    const { isPending, error, 'data': savings } = useQuery({
        queryKey: ['savings'],
        queryFn: async (): Promise<Saving[]> => {
            console.log('fetching...')
            const response = await fetch('https://localhost:5185/api/saving', {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            return await response.json();
        },   
        
    });

    const createSavingMutation = useMutation({
        mutationFn: async (data: CreateSaving) => {
            await fetch('https://localhost:5185/api/saving', {
                method: 'POST',
				body: JSON.stringify(data),
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
            console.log("Error creating new 'Saving':", error.message);
        }
	})

    const updateSavingMutation = useMutation({
        mutationFn: async ({ id, updateData }: { id: string; updateData: UpdateSaving }) => {
            const response = await fetch(`https://localhost:5185/api/saving/${id}`, {
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
        onError: (error, variables, context) => {
            console.log("Error updating 'Saving':", error.message);
        }
	})

    const removeSavingMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`https://localhost:5185/api/saving/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        }
    })

    return (
        <SavingContext.Provider value={{ 
            savings, 
            createSaving: createSavingMutation.mutate,
            removeSaving: removeSavingMutation.mutate,
            updateSaving: updateSavingMutation.mutate,
        }}>
            {children}
        </SavingContext.Provider>
    )
}