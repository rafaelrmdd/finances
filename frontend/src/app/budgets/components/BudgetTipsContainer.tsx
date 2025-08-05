import { ReactNode } from "react"

interface BudgetTipsContainerProps {
    children: ReactNode;
}

export function BudgetTipsContainer({children} : BudgetTipsContainerProps) {
    return (
        <div className="flex flex-col gap-y-4">
            {children}
        </div>
    )
}