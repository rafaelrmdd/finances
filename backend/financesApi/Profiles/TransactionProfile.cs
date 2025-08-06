using System.Transactions;
using AutoMapper;
using backend.financesApi.DTOs;

namespace backend.financesApi.Profiles;

public class TransactionProfile : Profile
{
    public TransactionProfile()
    {
        CreateMap<Transaction, TransactionResponseDTO>();
    }

}
