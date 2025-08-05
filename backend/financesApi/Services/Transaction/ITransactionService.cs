using System.Transactions;
using backend.financesApi.Models;

namespace backend.financesApi.Services;

interface ITransactionService
{
    public Task<IEnumerable<TransactionItem>> GetTransactions();
    public Task<TransactionItem> GetTransactionById(Guid transactionId);
    public Task<TransactionItem> AddTransaction(TransactionItem transaction);
    public Task<TransactionItem> EditTransaction(TransactionItem transaction);
    public Task<TransactionItem> RemoveTransaction(TransactionItem transaction);
}