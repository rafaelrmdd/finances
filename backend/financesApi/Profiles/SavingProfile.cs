using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Profiles;

public class SavingProfile : Profile
{
    public SavingProfile()
    {
        CreateMap<Saving, SavingResponseDTO>();
        CreateMap<AddSavingDTO, Saving>();
    }

}
