import { MdShoppingCart } from "react-icons/md";

export function TransactionItem() {
    return (
        <div className="flex justify-between bg-gray-700 rounded-lg p-4">
            <div className="flex w-[60%] gap-x-4">
                <div className="p-3 rounded-full bg-green-200">
                    <MdShoppingCart className="text-green-300 text-[1.5rem]"/>
                </div>

                <div>
                    <h2 className="text-white font-semibold">Lorem, ipsum.</h2>
                    <h3 className="text-[0.8rem] text-gray-400">Lorem, ipsum.</h3>
                </div>
            </div>

            <div className="text-end">
                <h2 className="text-white font-semibold">Lorem, ipsum.</h2>
                <h3 className="text-[0.8rem] text-gray-400">Lorem, ipsum.</h3>
            </div>
        </div>
    )
}