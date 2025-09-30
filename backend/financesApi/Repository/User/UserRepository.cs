using backend.financesApi.Context;
using backend.financesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.financesApi.Repository;

public class UserRepository : IUserRepository
{
    private readonly FinancesContext _context;

    public UserRepository(FinancesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> GetUserByIdAsync(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> AddUserAsync(User user)
    {
        var entityEntry = await _context.Users.AddAsync(user);

        await _context.SaveChangesAsync();

        return entityEntry.Entity;
    }

    public async Task<User> EditUserAsync(Guid id, User user)
    {
        var entityTransaction = await _context.Users.FindAsync(id);

        if (entityTransaction == null)
        {
            return null;
        }

        entityTransaction.Email = user.Email;
        entityTransaction.Jwt = user.Jwt;
        entityTransaction.Timestamp = user.Timestamp;
        entityTransaction.UpdatedAt = DateTimeOffset.UtcNow;

        await _context.SaveChangesAsync();

        return entityTransaction;
    }

    public async Task<bool> RemoveUserAsync(Guid id)
    {
        var rowsAffected = await _context.Users
            .Where(u => u.Id == id)
            .ExecuteDeleteAsync();

        return rowsAffected > 0;
    }
}