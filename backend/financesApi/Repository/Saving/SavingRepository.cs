using backend.financesApi.Context;
using backend.financesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.financesApi.Repository;

public class SavingRepository : ISavingRepository
{
    private readonly FinancesContext _context;

    public SavingRepository(FinancesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Saving>> GetSavingsAsync()
    {
        return await _context.Savings.ToListAsync();
    }

    public async Task<Saving> GetSavingByIdAsync(Guid id)
    {
        return await _context.Savings.FindAsync(id);
    }

    public async Task<IEnumerable<Saving>> GetSavingByUserIdAsync(Guid id)
    {
        return await _context.Savings.Where(s => s.UserId == id).ToListAsync();
    }

    public async Task<Saving> AddSavingAsync(Saving saving)
    {
        var entityEntry = await _context.Savings.AddAsync(saving);

        await _context.SaveChangesAsync();

        return entityEntry.Entity;
    }

    public async Task<Saving> EditSavingAsync(Guid id, Saving saving)
    {
        var entity = await _context.Savings.FindAsync(id);

        if (entity == null)
        {
            return null;
        }

        entity.Name = saving.Name;
        entity.Description = saving.Description;
        entity.CurrentAmount = saving.CurrentAmount;
        entity.TargetAmount = saving.TargetAmount;
        entity.UpdatedAt = DateTimeOffset.UtcNow;
        entity.TargetDate = saving.TargetDate;

        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task<bool> RemoveSavingAsync(Guid id)
    {
        var rowsAffected = await _context.Savings
            .Where(t => t.Id == id)
            .ExecuteDeleteAsync();

        return rowsAffected > 0;
    }
}