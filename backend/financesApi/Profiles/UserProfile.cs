using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserResponseDTO>();
        CreateMap<AddUserDTO, User>();
        CreateMap<EditUserDTO, User>();
    }

}
