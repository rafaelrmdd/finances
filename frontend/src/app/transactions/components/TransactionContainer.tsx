import { ReactNode } from "react";

interface TransactionContainerProps {
    children: ReactNode;
}

export function TransactionContainer({children} : TransactionContainerProps) {
    return (
        <section className="flex flex-col gap-y-4 bg-gray-800 rounded-lg w-full p-4">
            {children}
        </section>      
    )
}   