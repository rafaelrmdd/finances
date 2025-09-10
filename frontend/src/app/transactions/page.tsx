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
import { useCallback, useContext, useState } from "react";
import { TransactionContext } from "../../../context/TransactionProvider";
import Modal from "react-modal";
import { formatMoney } from "@/utils/formatters";
import { AddTransactionButton } from "./components/Buttons/AddTransactionButton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransactionsFilters } from "@/hooks/transaction/useTransactionsFilters";
import { useTransactionsPagement } from "@/hooks/transaction/useTransactionsPagement";
import { useTransactionsMoneyManagement } from "@/hooks/transaction/useTransactionsMoneyManagement";

export default function Transactions() {
	Modal.setAppElement('body');

	const { transactions = [] } = useContext(TransactionContext);

	const {
		filteredTransactions,
		createQueryString
	} = useTransactionsFilters();

	const router = useRouter();
	const pathname = usePathname();

	const {
		canGoNextPage,
        canGoPreviousPage,
        transactionsPerPage,
        sliceLimit,
        sliceBeginning,
        lengthOfFilteredTransactions,
		currentPage,
		setCurrentPage,
		setSliceLimit,
		setSliceBeginning,
	} = useTransactionsPagement(filteredTransactions);

	const {
		balance,
		currentMonthNetIncome,
		currentMonthTotalExpense,
		currentMonthTotalIncome
	} = useTransactionsMoneyManagement();

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
						balance={balance}
						cardName="Total Balance"
						cardBgColor="bg-green-400"
					/>

					<Card
						icon={{
							icon: MdKeyboardDoubleArrowUp,
							color: 'bg-blue-200',
						}}
						balance={currentMonthTotalIncome}
						cardName="Month's Income"
						cardBgColor="bg-blue-400"
					/>

					<Card
						icon={{
							icon: MdKeyboardDoubleArrowDown,
							color: 'bg-red-200'
						}}
						balance={currentMonthTotalExpense}
						cardName="Month's Expenses"
						cardBgColor="bg-red-400"
					/>

					<Card
						icon={{
							icon: MdKeyboardDoubleArrowUp,
							color: 'bg-yellow-200'
						}}
						balance={currentMonthNetIncome}
						cardName="Net Income (Month)"
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
									onChange={(e) => {
										router.push(pathname + '?' + createQueryString('keyword', e.target.value))
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
										router.push(pathname + '?' + createQueryString('category', e.target.value))
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
										router.push(pathname + '?' + createQueryString('sortbydate', e.target.value))
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