import { HiMagnifyingGlass } from "react-icons/hi2";

export function TopBar() {
    return (
        <div className="w-full bg-gray-800 flex justify-between px-4 py-3">
            <div className="flex gap-x-2 items-center bg-gray-900 rounded px-1 py-1">
                <HiMagnifyingGlass color="white"/>
                <input 
                    className="bg-transparent outline-0 w-72 text-gray-300 placeholder:text-gray-300"
                    type="text" 
                    placeholder="teste..."
                />
            </div>

            <div className="bg-gray-900 rounded-xs flex items-center px-1 py-1 gap-x-4">
                <h2 className="text-gray-300">teste</h2>
                <h2 className="text-gray-300">teste</h2>
            </div>
        </div>
    )
}