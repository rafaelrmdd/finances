import Modal from "react-modal";
import { CategoriesEnum, CreateTransaction, Transaction, TransactionContext, TypesEnum, UpdateTransaction } from "../../../../../context/TransactionProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { useTransactionsButtonManagement } from "@/hooks/transaction/useTransactionsButtonManagement";
import { MdAdd, MdAttachMoney, MdHome, MdKeyboardDoubleArrowUp, MdLocalGasStation, MdMovie, MdRestaurant, MdSchool, MdShoppingCart } from "react-icons/md";

interface AddTransactionModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    transaction: Transaction;
}

export function EditTransactionModal({
    isModalOpen,
    closeModal,
    transaction
}: AddTransactionModalProps) {
    Modal.setAppElement('body');
    
    const { updateTransaction } = useContext(TransactionContext);

    const {
        register, 
        handleSubmit, 
        formState: { errors }, 
        setValue,
        reset
    } = useForm<CreateTransaction>({
        defaultValues: {
            name: transaction.name,
            category: transaction.category,
            type: transaction.type,
            value: transaction.value,
        }
    });

    const {
        isIncomeActive,
        isExpenseActive,
        isCategoryActive,
        toggleCategory,
        selectIncome,
        selectExpense,
        resetCategoryAndType
    } = useTransactionsButtonManagement();

    useEffect(() => {
        toggleCategory(transaction.category);
        reset({
            name: transaction.name,
            category: transaction.category,
            type: transaction.type,
            value: transaction.value,
        });

        if (transaction.type === "income") selectIncome();
        if (transaction.type === "expense") selectExpense();
    }, [isModalOpen])

    const onSubmit: SubmitHandler<UpdateTransaction> = (updateData) => {
        closeModal();
        reset();
        resetCategoryAndType();
        toggleCategory("");

        updateTransaction({
            id: transaction.id,
            updateData,
        });
    }

    return (
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
                <h1 className="text-white font-bold text-2xl mb-6">Edit Transaction</h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4"
                >
                    <div>
                        <label className="block text-white font-semibold mb-2">
                            Transaction Name <span className="text-red-400">*</span>
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
                            Transaction Type <span className="text-red-400">*</span>
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
                            Category <span className="text-red-400">*</span>
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
                            Value ($) <span className="text-red-400">*</span>
                        </label>

                        <div className="relative text-white bg-gray-700 rounded-lg ">
                            <MdAttachMoney className="absolute top-[15px] left-3 text-lg"/>
                            <input
                                {...register("value")}
                                name="value"
                                className="pl-10 pr-4 py-3 rounded-lg outline-0 w-full"  
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
                            <MdAdd /> Edit Transaction
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}