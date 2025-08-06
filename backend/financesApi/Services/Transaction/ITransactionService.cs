using System.Transactions;
using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Services;

public interface ITransactionService
{
    public Task<IEnumerable<TransactionResponseDTO>> GetTransactionsAsync();
    public Task<TransactionResponseDTO> GetTransactionByIdAsync(Guid transactionId);
    public Task<TransactionResponseDTO> AddTransactionAsync(AddTransactionDTO addTransactionDTO);
    public Task<TransactionResponseDTO> EditTransactionAsync(EditTransactionDTO editTransactionDTO);
    public Task RemoveTransactionAsync(Guid id);
}