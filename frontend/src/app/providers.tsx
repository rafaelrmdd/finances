'use client'

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query"
import { TransactionProvider } from "../../context/TransactionProvider";
import { BudgetProvider } from "../../context/BudgetProvider";
import { SavingProvider } from "../../context/SavingProvider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
    children: ReactNode;
    session?: any;
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

export function Providers({
    children,
    session
}: ProviderProps){
    const queryClient = getQueryClient();

    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <TransactionProvider>
                    <BudgetProvider>
                        <SavingProvider>
                            {children}
                        </SavingProvider>
                    </BudgetProvider>
                </TransactionProvider>
            </QueryClientProvider>
        </SessionProvider>
    )
}