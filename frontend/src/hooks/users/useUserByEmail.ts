import { useQuery } from "@tanstack/react-query";
import { User } from "next-auth";
import { parseCookies } from "nookies";

export function useUserByEmail(email: string) {
    const { 'next-auth.session-token': jwt } = parseCookies();
    
    return useQuery({
        queryKey: ['user', email],
        queryFn: async (): Promise<User> => {
            const response = await fetch(`https://localhost:5185/api/user/${email}`, {
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
}