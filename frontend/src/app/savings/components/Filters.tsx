import { useSavingsFilters } from "@/hooks/savings/useSavingsFilters";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { MdFilterList, MdSearch } from "react-icons/md"

export function Filters() {

    const router = useRouter();
    const pathname = usePathname();

    const {
        clearFilters,
        createQueryString,
    } = useSavingsFilters();

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
                        setInputSearchKeyword("keyword", e)
                    }}
                    className="w-full h-full p-[8.5px] pl-10 outline-0 border border-transparent focus:border-blue-500
                    rounded-lg"
                    type="text"
                    placeholder="Search goals..."
                />
            </div>

            <div 
                className="flex items-center gap-x-2 bg-gray-700 rounded-lg 
                px-3 py-2"
            >
                <MdFilterList className="text-white" />
                <h3 className="text-white">Filters</h3>
            </div>

            <div className="bg-gray-700 rounded-lg">
                <select
                    onChange={(e) => {
                        setSelectSearchKeyword("category", e)
                    }}
                    className="text-white bg-gray-700 w-36 border border-transparent
                    focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
                    name="categories"
                >
                    <option value="all">All Categories</option>
                    <option value="emergency">Emergency</option>
                    <option value="vacation">Vacation</option>
                    <option value="car">Car</option>
                    <option value="wedding">Wedding</option>
                    <option value="retirement">Retirement</option>
                    <option value="education">Education</option>
                    <option value="business">Business</option>
                    <option value="investment">Investment</option>
                    <option value="health">Health</option>
                    <option value="technology">Technology</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    )
}