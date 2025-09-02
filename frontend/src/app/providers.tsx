'use client'

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query"
import { TransactionProvider } from "../../context/TransactionProvider";
import { BudgetProvider } from "../../context/BudgetProvider";
import { SavingProvider } from "../../context/SavingProvider";

interface ProvidersProps {
    children: ReactNode;
}

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return createQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = createQueryClient()
    return browserQueryClient
  }
}

export function Providers({ children }: ProvidersProps){
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <TransactionProvider>
                <BudgetProvider>
                    <SavingProvider>
                        {children}
                    </SavingProvider>
                </BudgetProvider>
            </TransactionProvider>
        </QueryClientProvider>
    )
}