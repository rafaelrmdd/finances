import Link from "next/link";

export function SideBar() {
    return (
        <aside className="bg-gray-900 w-50 h-screen p-4 border-r border-r-gray-800">
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
                    href={'/'}
                >
                    Transactions
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/'}
                >
                    Budgets
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/'}
                >
                    Savings
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/'}
                >
                    Investments
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/'}
                >
                    Reports
                </Link>

                <Link
                    className="px-3 py-2 rounded-xl hover:text-green-300 hover:bg-green-700
                    transition duration-75"
                    href={'/'}
                >
                    Settings
                </Link>
            </nav>
        </aside>
    )
}