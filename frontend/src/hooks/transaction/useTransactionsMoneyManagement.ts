import { formatMoney } from "@/utils/formatters";
import { useContext } from "react";
import { TransactionContext } from "../../../context/TransactionProvider";

export function useTransactionsMoneyManagement() {
    const { transactions = [] } = useContext(TransactionContext);
    
    const totalIncome = transactions
        .filter((t) => t.type.toLowerCase() === 'income')
        .reduce((sum, t) => sum + Number(t.value), 0);

    const totalExpense = transactions
        .filter((t) => t.type.toLowerCase() === 'expense')
        .reduce((sum, t) => sum + Number(t.value), 0);

    const balance = totalIncome - totalExpense;
    const balanceFormated = formatMoney(balance);
    console.log('balance: ', balance);
    console.log('expense: ', totalExpense);
    console.log('income: ', totalIncome);
    console.log('transactions: ', transactions);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthTransactions = transactions
        .filter((t) => 
            new Date(t.timestamp).getMonth() === currentMonth && 
            new Date(t.timestamp).getFullYear() ===  currentYear
        )

    const currentMonthTotalIncome = currentMonthTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.value), 0);

    const currentMonthTotalExpense = currentMonthTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.value), 0);

    const currentMonthNetIncome = currentMonthTotalIncome - currentMonthTotalExpense;

    const currentMonthTotalIncomeFormatted = formatMoney(currentMonthTotalIncome);
    const currentMonthTotalExpenseFormatted = formatMoney(currentMonthTotalExpense);
    const currentMonthNetIncomeFormatted = formatMoney(currentMonthNetIncome);

    return {
        balance: balanceFormated,
        currentMonthTotalIncome: currentMonthTotalIncomeFormatted,
        currentMonthTotalExpense: currentMonthTotalExpenseFormatted,
        currentMonthNetIncome: currentMonthNetIncomeFormatted
    }
}