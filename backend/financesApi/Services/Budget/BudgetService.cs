using System.ComponentModel.DataAnnotations;
using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Enums;
using backend.financesApi.Models;
using backend.financesApi.Repository;


namespace backend.financesApi.Services;

public class BudgetService : IBudgetService
{
    private readonly IBudgetRepository _repository;
    private readonly IMapper _mapper;

    public BudgetService(IBudgetRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<Budget>> GetBudgetsAsync()
    {
        var budgets = await _repository.GetBudgetsAsync();

        if (budgets == null || !budgets.Any())
        {
            return new List<Budget>();
        }

        return budgets;
    }

    public async Task<BudgetResponseDTO> GetBudgetByIdAsync(Guid id)
    {
        var Budget = await _repository.GetBudgetByIdAsync(id);

        if (Budget == null)
        {
            throw new ValidationException($"Budget with id: {id} was not found.");
        }

        return _mapper.Map<BudgetResponseDTO>(Budget);
    }

    public async Task<BudgetResponseDTO> AddBudgetAsync(AddBudgetDTO addBudgetDTO)
    {
        if (string.IsNullOrEmpty(addBudgetDTO.Name))
        {
            throw new InvalidDataException("Field 'name' cannot be empty.");
        }

        if (string.IsNullOrEmpty(addBudgetDTO.Amount))
        {
            throw new InvalidDataException("Field 'amount' cannot be empty.");
        }

        Budget Budget = _mapper.Map<Budget>(addBudgetDTO);

        var BudgetEntity = await _repository.AddBudgetAsync(Budget);

        return _mapper.Map<BudgetResponseDTO>(BudgetEntity);
    }

    public async Task<BudgetResponseDTO> EditBudgetAsync(EditBudgetDTO editBudgetDTO)
    {
        if (string.IsNullOrEmpty(editBudgetDTO.Name))
        {
            throw new InvalidDataException("Field 'name' cannot be empty.");
        }

        if (string.IsNullOrEmpty(editBudgetDTO.Amount))
        {
            throw new InvalidDataException("Field 'amount' cannot be empty.");
        }

        if (string.IsNullOrEmpty(editBudgetDTO.Category))
        {
            throw new InvalidDataException("Field 'category' cannot be empty.");
        }

        Budget Budget = _mapper.Map<Budget>(editBudgetDTO);

        var BudgetEntity = await _repository.EditBudgetAsync(Budget);

        return _mapper.Map<BudgetResponseDTO>(BudgetEntity);
    }

    public async Task RemoveBudgetAsync(Guid id)
    {
        var wasRemoved = await _repository.RemoveBudgetAsync(id);

        if (!wasRemoved)
        {
            throw new ValidationException($"Budget with id: {id} was not removed.");
        }
    }
}