import { QueryClient, UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    category: SavingCategoriesEnum;
    currentAmount: number;
    targetAmount: number;
    targetDate: string;
    timestamp?: string;
}

interface SavingDataProps {
    savings: Saving[] | undefined; 
    addSaving: UseMutateFunction<void, Error, Saving, unknown>;
    removeSaving: UseMutateFunction<void, Error, string, unknown>
}

export const SavingContext = createContext<SavingDataProps>({} as SavingDataProps);


export function SavingProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();

    const { isPending, error, 'data': savings } = useQuery({
        queryKey: ['savings'],
        queryFn: async (): Promise<Saving[]> => {
            console.log('fetching...')
            const response = await fetch('https://localhost:5185/api/saving');

            return await response.json();
        }   
    });

    const createSavingMutation = useMutation({
        mutationFn: async (data: Saving) => {
            await fetch('https://localhost:5185/api/saving', {
                method: 'POST',
				body: JSON.stringify(data),
				headers: {'Content-type': 'application/json'}
			})
		},
		onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['savings'] });
		},
	})

    const removeSavingMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`https://localhost:5185/api/saving/${id}`, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json'}
            })
        }
    })

    return (
        <SavingContext.Provider value={{ 
            savings, 
            addSaving: createSavingMutation.mutate,
            removeSaving: removeSavingMutation.mutate,
        }}>
            {children}
        </SavingContext.Provider>
    )
}