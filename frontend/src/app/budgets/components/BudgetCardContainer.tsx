import { ReactNode } from "react"

interface BudgetContainerProps {
    children: ReactNode;
}

export function BudgetCardContainer({children} : BudgetContainerProps) {
    return (
        <div className="flex flex-col gap-y-4">
            {children}
        </div>
    )
}