'use client'

import { Card } from "../../components/Card";
import {
	MdAccountBalanceWallet,
	MdKeyboardDoubleArrowUp,
	MdKeyboardDoubleArrowDown,
	MdFilterList,
	MdSearch,
} from "react-icons/md";
import { Header } from "@/components/Header";
import { TransactionItem } from "./components/TransactionItem";
import { TransactionContainer } from "./components/TransactionContainer";
import { ChangeEvent, useContext } from "react";
import { TransactionContext } from "../../../context/TransactionProvider";
import Modal from "react-modal";
import { AddTransactionButton } from "./components/Buttons/AddTransactionButton";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransactionsFilters } from "@/hooks/transaction/useTransactionsFilters";
import { useTransactionsPagement } from "@/hooks/transaction/useTransactionsPagement";
import { useTransactionsMoneyManagement } from "@/hooks/transaction/useTransactionsMoneyManagement";
import { Filters } from "./components/Filters";

export default function Transactions() {
	Modal.setAppElement('body');

	const { transactions = [] } = useContext(TransactionContext);

	const {
		filteredTransactions,
	} = useTransactionsFilters();

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
			<Header />	

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

						<Filters />
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