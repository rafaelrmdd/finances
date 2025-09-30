using System.Transactions;
using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Services;

public interface IUserService
{
    public Task<IEnumerable<User>> GetUsersAsync();
    public Task<UserResponseDTO> GetUserByIdAsync(Guid userId);
    public Task<UserResponseDTO> AddUserAsync(AddUserDTO addUserDTO);
    public Task<UserResponseDTO> EditUserAsync(Guid id, EditUserDTO editUserDTO);
    public Task RemoveUserAsync(Guid id);
}