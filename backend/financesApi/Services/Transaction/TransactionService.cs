using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Models;
using backend.financesApi.Repository;

namespace backend.financesApi.Services;

class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _repository;
    private readonly IMapper _mapper;

    public TransactionService(ITransactionRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TransactionResponseDTO>> GetTransactionsAsync()
    {
        var transactions = await _repository.GetTransactionsAsync();

        if (transactions.Count() < 1)
        {
            throw new ValidationException("No transaction was found.");
        }

        return _mapper.Map<IEnumerable<TransactionResponseDTO>>(transactions);
    }

    public async Task<TransactionResponseDTO> GetTransactionByIdAsync(Guid id)
    {
        var transaction = await _repository.GetTransactionByIdAsync(id);

        if (transaction == null)
        {
            throw new ValidationException($"Transaction with id: {id} was not found.");
        }

        return _mapper.Map<TransactionResponseDTO>(transaction);
    }

    public async Task<TransactionResponseDTO> AddTransactionAsync(TransactionItem transaction)
    {
        var transactionEntity = await _repository.AddTransactionAsync(transaction);

        return _mapper.Map<TransactionResponseDTO>(transactionEntity);
    }

    public async Task<TransactionResponseDTO> EditTransactionAsync(TransactionItem transaction)
    {
        var transactionEntity = await _repository.EditTransactionAsync(transaction);

        return _mapper.Map<TransactionResponseDTO>(transactionEntity);
    }

    public async Task RemoveTransactionAsync(Guid id)
    {
        var wasRemoved = await _repository.RemoveTransactionAsync(id);

        if (!wasRemoved)
        {
            throw new ValidationException($"Transaction with id: {id} was not removed.");
        }
    }
}