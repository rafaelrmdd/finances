import { useSession, signIn, signOut } from "next-auth/react";
import { destroyCookie } from "nookies";

export function Header() {
    const { data: session, status } = useSession();

    return (
        <div className="w-full bg-gray-800 flex justify-between px-4 py-3">
            
            <h1 className="text-white font-semibold">user: {session?.user?.email}</h1>

            <div className="rounded-xs flex items-center px-1 py-1">
                {status === "unauthenticated" ? 
                    <button 
                        onClick={() => signIn('github')}
                        className="text-gray-300 hover:cursor-pointer"
                    >
                        Sign in
                    </button> : 
                    <button 
                        onClick={() => signOut()}
                        className="text-gray-300 hover:cursor-pointer"
                    >
                        Sign out
                    </button>
                }
                
            </div>
        </div>
    )
}