using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Services;

public interface IBudgetService
{
    public Task<IEnumerable<BudgetResponseDTO>> GetBudgetsAsync();
    public Task<BudgetResponseDTO> GetBudgetByIdAsync(Guid id);
    public Task<IEnumerable<BudgetResponseDTO>> GetBudgetByUserIdAsync(Guid id);
    public Task<BudgetResponseDTO> AddBudgetAsync(AddBudgetDTO addBudgetDTO);
    public Task<BudgetResponseDTO> EditBudgetAsync(Guid id, EditBudgetDTO editBudgetDTO);
    public Task RemoveBudgetAsync(Guid id);
}