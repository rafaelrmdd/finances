using System.Transactions;
using backend.financesApi.Context;
using backend.financesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.financesApi.Services;

class TransactionService : ITransactionService
{
    private readonly FinancesContext _context;

    public TransactionService(FinancesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TransactionItem>> GetTransactions()
    {
        var transactions = await _context.Transactions.ToListAsync();

        return transactions;
    }

    public async Task<TransactionItem> GetTransactionById(Guid id)
    {

    }

    public async Task<TransactionItem> AddTransaction(TransactionItem transaction)
    {

    }

    public async Task<TransactionItem> EditTransaction(TransactionItem transaction)
    {

    }

    public async Task<TransactionItem> RemoveTransaction(TransactionItem transaction)
    {

    }
}