'use client'

import { Card } from "../../components/Card";
import {
	MdAccountBalanceWallet,
	MdKeyboardDoubleArrowUp,
	MdKeyboardDoubleArrowDown,
	MdFilterList,
	MdSearch,
	MdAdd,
	MdShoppingCart,
	MdRestaurant,
	MdLocalGasStation,
	MdMovie,
	MdHome,
	MdSchool,
	MdAttachMoney
} from "react-icons/md";
import { TopBar } from "../../components/TopBar";
import { TransactionItem } from "./components/TransactionItem";
import { TransactionContainer } from "./components/TransactionContainer";
import { useContext, useState } from "react";
import { CategoriesEnum, TransactionsContext, TypesEnum } from "../../../context/TransactionsProvider";
import Modal from "react-modal";
import { formatMoney } from "@/utils/formatters";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTransactionsButtonManagement } from "@/hooks/useTransactionsButtonManagement";

export default function Transactions() {

	interface TransactionFormInputs {
		id: string;
		name: string;
		type: TypesEnum;
		category: CategoriesEnum;
		value: string;
	}

	Modal.setAppElement('body')

	const { transactions = [] } = useContext(TransactionsContext) || {};
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { 
		register, 
		handleSubmit, 
		formState: { errors }, 
		setValue,
		reset
	} = useForm<TransactionFormInputs>();

	const {
		isIncomeActive,
		isExpenseActive,
		isCategoryActive,
		toggleCategory,
		selectIncome,
		selectExpense,
		resetCategoryAndType
	} = useTransactionsButtonManagement();

	const openModal = () => {
        setIsModalOpen(true);
    }

	const closeModal = () => {
        setIsModalOpen(false);
    }

	const queryClient = useQueryClient();
	const createTransactionMutation = useMutation({
		mutationFn: async (data: TransactionFormInputs) => {
			await fetch('https://localhost:5185/api/transactions', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {'Content-type': 'application/json'}
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transactions'] })
		},
	})

	const onSubmit: SubmitHandler<TransactionFormInputs> = (data) => {
		closeModal();
		reset();
		resetCategoryAndType();
		toggleCategory("");

		const newData: TransactionFormInputs = {
			id: data.id,
			name: data.name,
			category: data.category,
			type: data.type,
			value: formatMoney(data.value)
		}

		createTransactionMutation.mutate(newData);
	}
	
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

			<div className="p-4 min-h-screen h-full bg-gray-800">
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
							<button
								onClick={openModal}
								className="flex items-center gap-x-2 px-3 py-2 rounded-lg
								bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600
								transition duration-150"
							>
								<MdAdd className="text-xl" />
								Add Transaction
							</button>
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

						<Modal
							isOpen={isModalOpen}
							onRequestClose={closeModal}
							//background style
							overlayClassName={"fixed inset-0 backdrop-blur-sm bg-black/35 flex items-center justify-center z-50"}
							className={"flex items-center justify-center"}
						>
							<div 
								className="bg-gray-800 p-6 rounded-lg w-[474px]"
							>
								<h1 className="text-white font-bold text-2xl mb-6">Add Transaction</h1>

								<form
									onSubmit={handleSubmit(onSubmit)}
									className="flex flex-col gap-y-4"
								>
									<div>
										<label className="block text-white font-semibold mb-2">
											Transaction Name
										</label>
										<input
											{...register("name")}
											className="w-full bg-gray-700 rounded-lg px-4 py-3 outline-0 
											placeholder:text-gray-400 text-white"
											name="name" 
											type="text" 
											placeholder="Enter transaction name..."
										/>
									</div>

									<div>
										<label className="block text-white font-semibold mb-2">
											Transaction Type
										</label>

										<div className="flex gap-x-2">
											<button
												onClick={() => {													
													selectIncome();
													setValue("type", TypesEnum.INCOME);
												}} 
												className={`flex w-1/2 items-center gap-x-2 bg-gray-700 
												rounded-lg px-4 py-3 text-white hover:bg-green-400
												transition duration-150 font-semibold
												${isIncomeActive ? "bg-green-400" : null}`}
												type="button"
											>
												<MdKeyboardDoubleArrowUp/> Income
											</button>
											<button 
												onClick={() => {
													selectExpense();
													setValue("type", TypesEnum.EXPENSE);
												}}
												className={`flex w-1/2 items-center gap-x-2 bg-gray-700 
												rounded-lg px-4 py-3 text-white hover:bg-red-400
												transition duration-150 font-semibold
												${isExpenseActive ? "bg-red-400" : null}`}
												type="button"
											>
												<MdKeyboardDoubleArrowUp/> Expense
											</button>
										</div>
									</div>

									<div>
										<label className="block text-white font-semibold mb-2">
											Category
										</label>

										<div className="grid grid-cols-2 gap-y-2 gap-x-2">
											<button
												onClick={() => {
													toggleCategory("food");
													setValue("category", CategoriesEnum.FOOD);
												}}
												className={`flex w-full items-center gap-x-2 rounded-lg px-3 py-2 
												text-white text-[0.9rem] hover:bg-blue-600
												${isCategoryActive("food") ? "bg-blue-600" : "bg-gray-700"}
												transition duration-150`}
												type="button"
											>
												<MdRestaurant /> Food & Dining
											</button>	

											<button
												onClick={() => {
													toggleCategory("transportation");
													setValue("category", CategoriesEnum.TRANSPORTATION);
												}}
												className={`flex w-full items-center gap-x-2 rounded-lg px-3 py-2 
												text-white text-[0.9rem] hover:bg-blue-600
												${isCategoryActive("transportation") ? "bg-blue-600" : "bg-gray-700"}
												transition duration-150`}
												type="button"
											>
												<MdLocalGasStation /> Transportation
											</button>

											<button
												onClick={() => {
													toggleCategory("entertainment");
													setValue("category", CategoriesEnum.ENTERTAINMENT);
												}}
												className={`flex w-full items-center gap-x-2 rounded-lg px-3 py-2 
												text-white text-[0.9rem] hover:bg-blue-600
												${isCategoryActive("entertainment") ? "bg-blue-600" : "bg-gray-700"}
												transition duration-150`}
												type="button"
											>
												<MdMovie /> Entertainment
											</button>

											<button
												onClick={() => {
													toggleCategory("housing");
													setValue("category", CategoriesEnum.HOUSING);
												}}
												className={`flex w-full items-center gap-x-2 rounded-lg px-3 py-2 
												text-white text-[0.9rem] hover:bg-blue-600
												${isCategoryActive("housing") ? "bg-blue-600" : "bg-gray-700"}
												transition duration-150`}
												type="button"
											>
												<MdHome /> Housing
											</button>

											<button
												onClick={() => {
													toggleCategory("education");
													setValue("category", CategoriesEnum.EDUCATION);
												}}
												className={`flex w-full items-center gap-x-2 rounded-lg px-3 py-2 
												text-white text-[0.9rem] hover:bg-blue-600
												${isCategoryActive("education") ? "bg-blue-600" : "bg-gray-700"}
												transition duration-150`}
												type="button"
											>
												<MdSchool /> Education
											</button>

											<button
												onClick={() => {
													toggleCategory("shopping");
													setValue("category", CategoriesEnum.SHOPPING);
												}}
												className={`flex w-full items-center gap-x-2 rounded-lg px-3 py-2 
												text-white text-[0.9rem] hover:bg-blue-600
												${isCategoryActive("shopping") ? "bg-blue-600" : "bg-gray-700"}
												transition duration-150`}
												type="button"
											>
												<MdShoppingCart /> Shopping
											</button>
										</div>
									</div>

									<div className="mb-4">
										<label className="block text-white font-semibold mb-2">
											Value ($)
										</label>

										<div className="relative text-white bg-gray-700 rounded-lg ">
											<MdAttachMoney className="absolute top-[15px] left-3 text-lg"/>
											<input
												{...register("value")}
												className="pl-10 pr-4 py-3 rounded-lg outline-0"  
												type="number" 
												placeholder="Enter value"
											/>
										</div>
									</div>

									<div className="flex gap-x-2">
										<button
											onClick={closeModal} 
											className="flex w-1/2 justify-center gap-x-2 bg-gray-700 
											rounded-lg px-4 py-3 text-white hover:cursor-pointer"
											type="button"
										>
											Cancel
										</button>

										<button 
											className="flex w-1/2 items-center justify-center gap-x-2 
											bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-3 text-white
											transiction duration-150 hover:cursor-pointer"
										>
											<MdAdd /> Add Transaction
										</button>
									</div>
								</form>
							</div>
						</Modal>
					</div>

					<TransactionContainer>
						{filteredTransactions ? filteredTransactions.map((t) => (
							<TransactionItem
								key={t.id}
								name={t.name}
								category={t.category}
								value={t.value}
								type={t.type}
								timestamp={t.timestamp}
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