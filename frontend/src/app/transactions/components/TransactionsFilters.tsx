import { useTransactionsFilters } from "@/hooks/transaction/useTransactionsFilters";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { MdFilterList, MdSearch } from "react-icons/md";


export function TransactionsFilters() {
    const {
        createQueryString,
    } = useTransactionsFilters();

    const router = useRouter();
    const pathname = usePathname();

    const setInputSearchKeyword = (keyword: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if(e.key === "Enter"){
            router.push(pathname + '?' + createQueryString(keyword, target.value))
        }
    }

    const setSelectSearchKeyword = (keyword: string, e: ChangeEvent<any>) => {
        router.push(pathname + '?' + createQueryString(keyword, e.target.value))
    }

    return (
        <div className="flex gap-x-3 items-start">
            <div className="relative bg-gray-700 rounded-lg w-96 text-white
            placeholder:text-gray-600 border-white ">
                <MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                <input
                    onKeyDown={(e) => {
                        setInputSearchKeyword("keyword", e);
                    }}
                    className="w-full h-full p-[8.5px] pl-10 outline-0 border border-transparent focus:border-blue-500
                    rounded-lg"
                    type="text"
                    placeholder="Search for..."
                />
            </div>

            <div className="flex items-center gap-x-2 bg-gray-700 rounded-lg px-3 py-2">
                <MdFilterList className="text-white" />
                <h3 className="text-white">Filter</h3>
            </div>

            <div className="bg-gray-700 rounded-lg">
                <select
                    onChange={(e) => {
                        setSelectSearchKeyword("category", e);
                    }}
                    className="text-white bg-gray-700 w-36 border border-transparent
                    focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
                    name="categories"
                >
                    <option value="all">All Categories</option>
                    <option value="food">Food & Drinking</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="housing">Housing</option>
                    <option value="education">Education</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="bg-gray-700 rounded-lg">
                <select
                    onChange={(e) => {
                        setSelectSearchKeyword("sortbydate", e);
                    }}
                    className="text-white px-3 py-2 bg-gray-700 border border-transparent 
                    focus:border-blue-500 rounded-lg outline-0"
                    name="time"
                >
                    <option value="30_days">Last 30 days</option>
                    <option value="7_days">Last 7 days</option>
                    <option value="this_month">This Month</option>
                    <option value="last_month">Last Month</option>
                    <option value="this_year">This Year</option>
                </select>
            </div>

            <div className="bg-gray-700 rounded-lg">
                <select
                    onChange={(e) => {
                        setSelectSearchKeyword("type", e);
                    }}
                    className="text-white px-3 py-2 bg-gray-700 border border-transparent 
                    focus:border-blue-500 rounded-lg outline-0"
                    name="time"
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
        </div>
    )
}