using System.ComponentModel.DataAnnotations;
using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Enums;
using backend.financesApi.Models;
using backend.financesApi.Repository;


namespace backend.financesApi.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly IMapper _mapper;

    public UserService(IUserRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        var transactions = await _repository.GetUsersAsync();

        if (transactions == null || !transactions.Any())
        {
            return new List<User>();
        }

        return transactions;
    }

    public async Task<UserResponseDTO> GetUserByIdAsync(Guid id)
    {
        var user = await _repository.GetUserByIdAsync(id);

        if (user == null)
        {
            throw new ValidationException($"User with id: {id} was not found.");
        }

        return _mapper.Map<UserResponseDTO>(user);
    }

    public async Task<UserResponseDTO> AddUserAsync(AddUserDTO addUserDTO)
    {
        if (string.IsNullOrEmpty(addUserDTO.Email))
        {
            throw new InvalidDataException("Field 'email' cannot be empty.");
        }

        if (string.IsNullOrEmpty(addUserDTO.Password))
        {
            throw new InvalidDataException("Field 'password' cannot be empty.");
        }

        User user = _mapper.Map<User>(addUserDTO);

        var userEntity = await _repository.AddUserAsync(user);

        return _mapper.Map<UserResponseDTO>(userEntity);
    }

    public async Task<UserResponseDTO> EditUserAsync(Guid id, EditUserDTO editUserDTO)
    {
        if (string.IsNullOrEmpty(editUserDTO.Email))
        {
            throw new InvalidDataException("Field 'name' cannot be empty.");
        }

        if (string.IsNullOrEmpty(editUserDTO.Password))
        {
            throw new InvalidDataException("Field 'password' cannot be empty.");
        }

        User user = _mapper.Map<User>(editUserDTO);

        var userEntity = await _repository.EditUserAsync(id, user);

        return _mapper.Map<UserResponseDTO>(userEntity);
    }


    public async Task RemoveUserAsync(Guid id)
    {
        var wasRemoved = await _repository.RemoveUserAsync(id);

        if (!wasRemoved)
        {
            throw new ValidationException($"User with id: {id} was not removed.");
        }
    }
}