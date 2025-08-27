using backend.financesApi.Context;
using backend.financesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.financesApi.Repository;

public class BudgetRepository : IBudgetRepository
{
    private readonly FinancesContext _context;

    public BudgetRepository(FinancesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Budget>> GetBudgetsAsync()
    {
        return await _context.Budgets.ToListAsync();
    }

    public async Task<Budget> GetBudgetByIdAsync(Guid id)
    {
        return await _context.Budgets.FindAsync(id);
    }

    public async Task<Budget> AddBudgetAsync(Budget Budget)
    {
        var entityEntry = await _context.Budgets.AddAsync(Budget);

        await _context.SaveChangesAsync();

        return entityEntry.Entity;
    }

    public async Task<Budget> EditBudgetAsync(Budget budget)
    {
        var entityBudget = await _context.Budgets.FirstOrDefaultAsync(t => t.Id == budget.Id);

        if (entityBudget == null)
        {
            return null;
        }

        entityBudget.Name = budget.Name;
        entityBudget.Description = budget.Description;
        entityBudget.Amount = budget.Amount;
        entityBudget.StartDate = budget.StartDate;
        entityBudget.EndDate = budget.EndDate;
        entityBudget.UpdatedAt = DateTimeOffset.UtcNow;

        await _context.SaveChangesAsync();

        return entityBudget;
    }

    public async Task<bool> RemoveBudgetAsync(Guid id)
    {
        var rowsAffected = await _context.Budgets
            .Where(t => t.Id == id)
            .ExecuteDeleteAsync();

        return rowsAffected > 0;
    }
}