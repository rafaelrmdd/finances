'use client'

import { UseMutateFunction, useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { CategoriesEnum } from "./TransactionProvider";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import nookies, { parseCookies } from 'nookies'
import { getToken } from "next-auth/jwt";

interface ContextProviderProps {
    children: ReactNode; 
}

export interface User {
    id: string;
    email: string;
    timestamp: string;
}

export type UpdateUser = Omit<User, 'id' | 'timestamp'>
export type CreateUser = Omit<User, 'id' | 'timestamp'>

interface UserDataProps {
    users: User[] | undefined;
    user : User | undefined;
    createUser: UseMutateFunction<void, Error, string, unknown>;
    updateUser: UseMutateFunction<void, Error, { id: string; updateData: UpdateUser; }, unknown>
    removeUser: UseMutateFunction<void, Error, string, unknown>,
    error: Error | null;
    isPending: boolean;
}

export const UserContext = createContext({} as UserDataProps);
    
export function UserProvider({children}: ContextProviderProps) {
    const { 'next-auth.session-token': jwt } = parseCookies();
    const { data: session } = useSession();

    const queryClient = useQueryClient();

    const { isPending, error, 'data': users } = useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<User[]> => {
            const response = await fetch('https://localhost:5185/api/user', {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            return await response.json();
        }   
    });
    
    const email = session?.user?.email || '';
    const { 'data': user } = useQuery({
        queryKey: ['user'],
        queryFn: async (): Promise<User> => {
            const response = await fetch(`https://localhost:5185/api/user/email/${email}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });

            if (!response.ok) {
                throw new Error('User not found');
            }

            return await response.json();
        },
        enabled: !!email,
    });

    const createUserMutation = useMutation({
        mutationFn: async (email: string) => {
            await fetch('https://localhost:5185/api/user', {
                method: 'POST',
                body: JSON.stringify(email),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
        onError: (error) => {
            console.log("Error creating new 'User':", error.message);
        }
    })

    const updateUserMutation = useMutation({
        mutationFn: async ({ id, updateData }: { id: string; updateData: UpdateUser }) => {
            const response = await fetch(`https://localhost:5185/api/user/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updateData),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.log("Error updating 'User':", error.message);
        }
    })
    
    const removeUserMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`https://localhost:5185/api/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            })
        },
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['users'] });
        },
        onError: (error) => {
            console.log("Error removing 'User':", error.message);
        }
    })

    return (
        <UserContext.Provider value={{ 
            users,
            user,
            createUser: createUserMutation.mutate, 
            updateUser: updateUserMutation.mutate,
            removeUser: removeUserMutation.mutate,
            error, 
            isPending 
        }}>
            {children}
        </UserContext.Provider>
    )
}