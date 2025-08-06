using System.Transactions;
using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Services;

interface ITransactionService
{
    public Task<IEnumerable<TransactionResponseDTO>> GetTransactionsAsync();
    public Task<TransactionResponseDTO> GetTransactionByIdAsync(Guid transactionId);
    public Task<TransactionResponseDTO> AddTransactionAsync(TransactionItem transaction);
    public Task<TransactionResponseDTO> EditTransactionAsync(TransactionItem transaction);
    public Task RemoveTransactionAsync(Guid id);
}