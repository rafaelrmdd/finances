using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Profiles;

public class TransactionProfile : Profile
{
    public TransactionProfile()
    {
        CreateMap<TransactionItem, TransactionResponseDTO>();
        CreateMap<AddTransactionWithEnumDTO, TransactionItem>();
        CreateMap<EditTransactionDTO, TransactionItem>();
        CreateMap<EditTransactionWithUpdatedAtDTO, TransactionItem>();
    }

}
