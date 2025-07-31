import { HiMagnifyingGlass } from "react-icons/hi2";

export function TopBar() {
    return (
        <div className="w-full bg-gray-600 flex justify-between px-4 py-2">
            <div className="flex gap-x-2 items-center bg-gray-400 rounded-xs px-1 py-1">
                <HiMagnifyingGlass />
                <input 
                className="bg-transparent outline-0 w-72"
                type="text" 
                placeholder="teste..."
                />
            </div>

            <div className="bg-gray-400 rounded-xs flex items-center px-1 py-1">
                icon
                icon
            </div>
        </div>
    )
}