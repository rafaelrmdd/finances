using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Services;

public interface IBudgetService
{
    public Task<IEnumerable<Budget>> GetBudgetsAsync();
    public Task<BudgetResponseDTO> GetBudgetByIdAsync(Guid BudgetId);
    public Task<BudgetResponseDTO> AddBudgetAsync(AddBudgetDTO addBudgetDTO);
    public Task<BudgetResponseDTO> EditBudgetAsync(EditBudgetDTO editBudgetDTO);
    public Task RemoveBudgetAsync(Guid id);
}