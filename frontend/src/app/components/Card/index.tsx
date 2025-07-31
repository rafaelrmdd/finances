import { IconType } from "react-icons";

interface IconProps {
    icon: IconType;
    color: string;
}

interface CardProps {
    icon: IconProps;
    percentage: string;
    balance: string;
    cardName: string;
    cardBgColor: string;
}

export function Card({ icon, percentage, balance, cardName, cardBgColor } : CardProps) {
    const { icon: Icon, color } = icon;

    return (
        <div className={`${cardBgColor} p-5 rounded-xl`}>
            <div className="flex justify-between mb-3">
                <div className="p-3 bg-green-200 rounded-xl">
                    <Icon className={`${color}`}/>
                </div>

                <div className="p-1 rounded-3xl">
                    <span className="">{percentage}</span>
                </div>
            </div>

            <div>
                <span className="text-white font-bold text-2xl">${balance}</span>
                <h3 className="text-gray-400 text-xs">{cardName}</h3>
            </div>
        </div>
    )
}