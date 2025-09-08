

using backend.financesApi.Models;

namespace backend.financesApi.Repository;

public interface IBudgetRepository
{
    public Task<IEnumerable<Budget>> GetBudgetsAsync();
    public Task<Budget> GetBudgetByIdAsync(Guid id);
    public Task<Budget> AddBudgetAsync(Budget Budget);
    public Task<Budget> EditBudgetAsync(Guid id, Budget Budget);
    public Task<bool> RemoveBudgetAsync(Guid id);
}