using backend.financesApi.Context;
using backend.financesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.financesApi.Repository;

public class TransactionRepository : ITransactionRepository
{
    private readonly FinancesContext _context;

    public TransactionRepository(FinancesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TransactionItem>> GetTransactionsAsync()
    {
        return await _context.Transactions.ToListAsync();
    }

    public async Task<TransactionItem> GetTransactionByIdAsync(Guid id)
    {
        return await _context.Transactions.FindAsync(id);
    }

    public async Task<TransactionItem> AddTransactionAsync(TransactionItem transaction)
    {
        var entityEntry = await _context.Transactions.AddAsync(transaction);

        await _context.SaveChangesAsync();

        return entityEntry.Entity;
    }

    public async Task<TransactionItem> EditTransactionAsync(TransactionItem transaction)
    {
        var entityTransaction = await _context.Transactions.FirstOrDefaultAsync(t => t.Id == transaction.Id);

        if (entityTransaction == null)
        {
            return null;
        }

        entityTransaction.Name = transaction.Name;
        entityTransaction.Value = transaction.Value;
        entityTransaction.Timestamp = transaction.Timestamp;
        entityTransaction.Type = transaction.Type;
        entityTransaction.UpdatedAt = DateTimeOffset.UtcNow;

        await _context.SaveChangesAsync();

        return entityTransaction;
    }

    public async Task<bool> RemoveTransactionAsync(Guid id)
    {
        var rowsAffected = await _context.Transactions
            .Where(t => t.Id == id)
            .ExecuteDeleteAsync();

        return rowsAffected > 0;
    }
}