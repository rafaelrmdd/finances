'use client'

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query"
import { TransactionProvider } from "../../context/TransactionProvider";
import { BudgetProvider } from "../../context/BudgetProvider";
import { SavingProvider } from "../../context/SavingProvider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../../context/UserProvider";

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

const queryClient = getQueryClient();

export function Providers({
    children,
    session
}: ProviderProps){
    
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <TransactionProvider>
                        <BudgetProvider>
                            <SavingProvider>
                                {children}
                            </SavingProvider>
                        </BudgetProvider>
                    </TransactionProvider>
                </UserProvider>
            </QueryClientProvider>
        </SessionProvider>
    )
}