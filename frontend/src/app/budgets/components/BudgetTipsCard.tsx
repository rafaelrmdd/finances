import { wordFormatter } from "@/utils/formatters";

interface BudgetTipsCardProps {
    title: string;
    titleColor?: string;
    description: string;
    descriptionColor?: string;
    cardBgColor: string;
    cardBorderColor?: string;
}

export function BudgetTipsCard({
    title,
    titleColor,
    description,
    descriptionColor,
    cardBgColor,
    cardBorderColor,
}: BudgetTipsCardProps) {

    const titleFormatted = wordFormatter(title);

    return (
        <div
            className={`rounded-lg ${cardBgColor} border ${cardBorderColor ?? "border-blue-800/35"} p-3`}
        >
            <h2 className={`mb-2 ${titleColor ?? "text-black"} font-semibold`}>{titleFormatted}</h2>

            <p className={`${descriptionColor ?? "text-black"}`}>{description}</p>
        </div>
    )
}