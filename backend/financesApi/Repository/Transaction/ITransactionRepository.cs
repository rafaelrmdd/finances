

using backend.financesApi.Models;

namespace backend.financesApi.Repository;

public interface ITransactionRepository
{
    public Task<IEnumerable<TransactionItem>> GetTransactionsAsync();
    public Task<TransactionItem> GetTransactionByIdAsync(Guid id);
    public Task<IEnumerable<TransactionItem>> GetTransactionUserIdAsync(Guid id);
    public Task<TransactionItem> AddTransactionAsync(TransactionItem transaction);
    public Task<TransactionItem> EditTransactionAsync(Guid id, TransactionItem transaction);
    public Task<bool> RemoveTransactionAsync(Guid id);
}