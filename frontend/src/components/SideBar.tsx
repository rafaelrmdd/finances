import Link from "next/link";

export function SideBar() {
    return (
        <aside className="bg-gray-900 w-50 h-full min-h-screen p-4 border-r border-r-gray-800">
            <h1 className="text-green-300 font-bold">Money Management</h1>

            <nav className="flex flex-col text-gray-300 mt-6">
                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/'}
                >
                    Dashboard
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/transactions?sortbydate=30_days'}
                >
                    Transactions
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/budgets'}
                >
                    Budgets
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/savings'}
                >
                    Savings
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/investments'}
                >
                    Investments
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/reports'}
                >
                    Reports
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/settings'}
                >
                    Settings
                </Link>
            </nav>
        </aside>
    )
}