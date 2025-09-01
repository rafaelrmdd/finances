import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { createContext } from "react";

export enum SavingsCategoriesEnum {
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
    id?: string;
    name: string;
    description?: string;
    category: SavingsCategoriesEnum;
    targetAmount: number;
    targetDate: string;
    timestamp: string;
}

interface SavingsDataProps {
    savings: Saving[] | undefined; 
}

export const SavingsContext = createContext<SavingsDataProps>({} as SavingsDataProps);

export function SavingsProvider({ children }: { children: ReactNode }) {
    const { isPending, error, 'data': savings } = useQuery({
        queryKey: ['savings'],
        queryFn: async (): Promise<Saving[]> => {
            const response = await fetch('https://localhost:5185/api/saving');

            return await response.json();
        }   
    });

    return (
        <SavingsContext.Provider value={{ savings }}>
            {children}
        </SavingsContext.Provider>
    )
}