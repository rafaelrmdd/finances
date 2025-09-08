using System.ComponentModel.DataAnnotations;
using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Enums;
using backend.financesApi.Models;
using backend.financesApi.Repository;


namespace backend.financesApi.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _repository;
    private readonly IMapper _mapper;

    public TransactionService(ITransactionRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TransactionItem>> GetTransactionsAsync()
    {
        var transactions = await _repository.GetTransactionsAsync();

        if (transactions == null || !transactions.Any())
        {
            return new List<TransactionItem>();
        }

        return transactions;
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

    public async Task<TransactionResponseDTO> AddTransactionAsync(AddTransactionDTO addTransactionDTO)
    {
        if (string.IsNullOrEmpty(addTransactionDTO.Name))
        {
            throw new InvalidDataException("Field 'name' cannot be empty.");
        }

        if (string.IsNullOrEmpty(addTransactionDTO.Value))
        {
            throw new InvalidDataException("Field 'value' cannot be empty.");
        }

        if (string.IsNullOrEmpty(addTransactionDTO.Category))
        {
            throw new InvalidDataException("Field 'category' cannot be empty.");
        }

        if (string.IsNullOrEmpty(addTransactionDTO.Type))
        {
            throw new InvalidDataException("Field 'type' cannot be empty.");
        }

        if (!Enum.TryParse(addTransactionDTO.Type, ignoreCase: true, out TypesEnum type))
        {
            throw new ArgumentException($"Invalid type: {addTransactionDTO.Type}");
        }

        if (!Enum.TryParse(addTransactionDTO.Category, ignoreCase: true, out CategoriesEnum category))
        {
            throw new ArgumentException($"Invalid category: {addTransactionDTO.Category}");
        }

        AddTransactionWithEnumDTO addTransactionWithEnumDTO = new AddTransactionWithEnumDTO
        (
            addTransactionDTO.Name,
            type,
            category,
            addTransactionDTO.Value,
            DateTimeOffset.UtcNow
        );

        TransactionItem transaction = _mapper.Map<TransactionItem>(addTransactionWithEnumDTO);

        var transactionEntity = await _repository.AddTransactionAsync(transaction);

        return _mapper.Map<TransactionResponseDTO>(transactionEntity);
    }

    public async Task<TransactionResponseDTO> EditTransactionAsync(Guid id, EditTransactionDTO editTransactionDTO)
    {
        if (string.IsNullOrEmpty(editTransactionDTO.Name))
        {
            throw new InvalidDataException("Field 'name' cannot be empty.");
        }

        if (string.IsNullOrEmpty(editTransactionDTO.Value))
        {
            throw new InvalidDataException("Field 'value' cannot be empty.");
        }

        if (string.IsNullOrEmpty(editTransactionDTO.Category))
        {
            throw new InvalidDataException("Field 'category' cannot be empty.");
        }

        if (string.IsNullOrEmpty(editTransactionDTO.Type))
        {
            throw new InvalidDataException("Field 'type' cannot be empty.");
        }

        EditTransactionWithUpdatedAtDTO editTransactionWithUpdatedAtDTO = new EditTransactionWithUpdatedAtDTO(
            editTransactionDTO.Name,
            editTransactionDTO.Value,
            editTransactionDTO.Category,
            editTransactionDTO.Type,
            DateTimeOffset.UtcNow
        );

        TransactionItem transaction = _mapper.Map<TransactionItem>(editTransactionWithUpdatedAtDTO);

        var transactionEntity = await _repository.EditTransactionAsync(id, transaction);

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