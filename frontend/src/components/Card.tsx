import { IconType } from "react-icons";

interface IconProps {
    icon: IconType;
    color: string;
}

interface CardProps {
    icon: IconProps;
    balance: string;
    cardName: string;
    cardBgColor: string;
}

export function Card({ icon, balance, cardName, cardBgColor } : CardProps) {
    const { icon: Icon, color } = icon;

    return (
        <div className={`${cardBgColor} p-5 rounded-xl`}>
            <div className="flex justify-between mb-3">
                <div className={`p-3 ${color} rounded-xl`}>
                    <Icon className={`${color}`}/>
                </div>

            </div>

            <div>
                <span className="text-white font-bold text-2xl">{balance}</span>
                <h3 className="text-gray-200 text-xs font-semibold">{cardName}</h3>
            </div>
        </div>
    )
}