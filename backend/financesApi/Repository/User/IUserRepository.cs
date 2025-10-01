

using backend.financesApi.Models;

namespace backend.financesApi.Repository;

public interface IUserRepository
{
    public Task<IEnumerable<User>> GetUsersAsync();
    public Task<User> GetUserByIdAsync(Guid id);
    public Task<User> GetUserByEmailAsync(string email);
    public Task<User> AddUserAsync(User user);
    public Task<User> EditUserAsync(Guid id, User user);
    public Task<bool> RemoveUserAsync(Guid id);
}