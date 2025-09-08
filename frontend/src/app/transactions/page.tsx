'use client'

import { Card } from "../../components/Card";
import {
	MdAccountBalanceWallet,
	MdKeyboardDoubleArrowUp,
	MdKeyboardDoubleArrowDown,
	MdFilterList,
	MdSearch,
} from "react-icons/md";
import { TopBar } from "../../components/TopBar";
import { TransactionItem } from "./components/TransactionItem";
import { TransactionContainer } from "./components/TransactionContainer";
import { useContext, useState } from "react";
import { TransactionContext } from "../../../context/TransactionProvider";
import Modal from "react-modal";
import { formatMoney } from "@/utils/formatters";
import { AddTransactionButton } from "./components/Buttons/AddTransactionButton";

export default function Transactions() {
	Modal.setAppElement('body');

	const { transactions = [] } = useContext(TransactionContext);

	// const {
	// 	isIncomeActive,
	// 	isExpenseActive,
	// 	isCategoryActive,
	// 	toggleCategory,
	// 	selectIncome,
	// 	selectExpense,
	// 	resetCategoryAndType
	// } = useTransactionsButtonManagement();

	const [searchKeyword, setSearchKeyword] = useState("");

	const filteredTransactions = transactions.filter((t) => t.name.includes(searchKeyword)) || [];
	const lengthOfFilteredTransactions = filteredTransactions.length;
	
	const [currentPage, setCurrentPage] = useState(1);
	const [sliceBeginning, setSliceBeginning] = useState(0);
	const [sliceLimit, setSliceLimit] = useState(10);
	const transactionsPerPage = 10;
	const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
	const canGoNextPage = currentPage < totalPages;
	const canGoPreviousPage = sliceBeginning != 0;

	const totalIncome = transactions
		.filter((t) => t.type === 'income')
		.reduce((sum, t) => sum + Number(t.value), 0);

	const totalExpense = transactions
		.filter((t) => t.type === 'expense')
		.reduce((sum, t) => sum + Number(t.value), 0);

	const balance = totalIncome - totalExpense;
	const balanceFormated = formatMoney(balance);

	return (
		<div className="w-full">
			<TopBar />	

			<div className="p-4 min-h-screen h-full bg-gray-900">
				<section className="grid grid-cols-4 gap-x-4 mb-8">
					<Card
						icon={{
							icon: MdAccountBalanceWallet,
							color: 'bg-green-200'
						}}
						percentage="12.5%"
						balance={balanceFormated}
						cardName="Total Balance"
						cardBgColor="bg-green-400"
					/>

					<Card
						icon={{
							icon: MdKeyboardDoubleArrowUp,
							color: 'bg-blue-200',
						}}
						percentage="12.5%"
						balance="50.000.00"
						cardName="Month's Income"
						cardBgColor="bg-blue-400"
					/>

					<Card
						icon={{
							icon: MdKeyboardDoubleArrowDown,
							color: 'bg-red-200'
						}}
						percentage="12.5%"
						balance="50.000.00"
						cardName="Month's Expenses"
						cardBgColor="bg-red-400"
					/>

					<Card
						icon={{
							icon: MdKeyboardDoubleArrowDown,
							color: 'bg-yellow-200'
						}}
						percentage="12.5%"
						balance="50.000.00"
						cardName="Month's Expenses"
						cardBgColor="bg-yellow-400"
					/>
				</section>

				<main>
					<div className="bg-gray-800 rounded-lg p-4 mb-8">
						<div className="flex justify-between mb-6">
							<h2 className="text-white text-2xl font-semibold">All Transactions</h2>
							<AddTransactionButton />
						</div>

						<div className="flex gap-x-3 items-start">
							<div className="relative bg-gray-700 rounded-lg w-96 text-white
							placeholder:text-gray-600 border-white ">
								<MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
								<input
									onChange={(e) => setSearchKeyword(e.target.value)}
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
									className="text-white bg-gray-700 w-36 border border-transparent
									focus:border-blue-500 rounded-lg pl-3 py-2 outline-0"
									name="categories"
								>
									<option value="all_categories">All Categories</option>
									<option value="income">Income</option>
									<option value="food_and_drinking">Food & Drinking</option>
									<option value="transportation">Transportation</option>
									<option value="entertainment">Entertainment</option>
									<option value="housing">Housing</option>
									<option value="education">Education</option>
								</select>
							</div>

							<div className="bg-gray-700 rounded-lg">
								<select
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
						</div>
					</div>

					<TransactionContainer>
						{filteredTransactions ? filteredTransactions.map((t) => (
							<TransactionItem
								key={t.id}
								transaction={t}
							/>
						)).slice(sliceBeginning, sliceLimit) : 'Loading...'}

						<div className="mt-4">
							<hr className="text-gray-700 mb-4" />

							<div className="flex justify-between items-center">
								<span 
									className="text-gray-400 text-[0.9rem]"
								>
									Showing  
									{lengthOfFilteredTransactions < transactionsPerPage 
									? " " + lengthOfFilteredTransactions + " " 
									: transactionsPerPage} 
									of {transactions.length} transactions
								</span>

								<div className="flex items-start gap-x-3">
									<div
										onClick={() => {
											if (canGoPreviousPage) {
												setCurrentPage((currentPage) - 1);
												setSliceBeginning((sliceBeginning) - transactionsPerPage)
												setSliceLimit((sliceLimit) + transactionsPerPage);
											}
										}}
										className="rounded-lg bg-gray-700 px-3 py-1 hover:cursor-pointer"
									>
										<span className="text-gray-400">Previous</span>
									</div>

									<div className="rounded-lg bg-gray-700 px-3 py-1">
										<span className="text-gray-400">1</span>
									</div>

									<div className="rounded-lg bg-gray-700 px-3 py-1">
										<span className="text-gray-400">2</span>
									</div>

									<div className="rounded-lg bg-gray-700 px-3 py-1">
										<span className="text-gray-400">3</span>
									</div>

									<div
										onClick={() => {
											if (canGoNextPage) {
												setCurrentPage((currentPage) + 1);
												setSliceBeginning((sliceBeginning) + transactionsPerPage)
												setSliceLimit((sliceLimit) + transactionsPerPage);
											}
										}}
										className="rounded-lg bg-gray-700 px-3 py-1 hover:cursor-pointer"
									>
										<span className="text-gray-400">Next</span>
									</div>
								</div>
							</div>
						</div>
					</TransactionContainer>

				</main>

			</div>

		</div>
	)
}