'use client'

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query"
import { TransactionsProvider } from "../../context/transactionsProvider";

interface ProvidersProps {
    children: ReactNode;
}

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000
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
            <TransactionsProvider>
                {children}
            </TransactionsProvider>
        </QueryClientProvider>
    )
}