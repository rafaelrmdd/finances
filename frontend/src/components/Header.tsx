import { useSession, signIn, signOut } from "next-auth/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export function Header() {
    const { data: session } = useSession();

    return (
        <div className="w-full bg-gray-800 flex justify-between px-4 py-3">
            
            <h1>user: {session?.user?.email}</h1>

            <div className="bg-gray-900 rounded-xs flex items-center px-1 py-1 gap-x-4">
                <button 
                    onClick={() => signIn()}
                    className="text-gray-300"
                >
                    Sign in
                </button>
                <button 
                    onClick={() => signOut()}
                    className="text-gray-300"
                >
                    Sign out
                </button>
            </div>
        </div>
    )
}