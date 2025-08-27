using System.Transactions;
using AutoMapper;
using backend.financesApi.DTOs;
using backend.financesApi.Models;

namespace backend.financesApi.Profiles;

public class BudgetProfile : Profile
{
    public BudgetProfile()
    {
        CreateMap<AddBudgetDTO, Budget>();
        CreateMap<Budget, BudgetResponseDTO>();
    }

}

// {
//   "name": "testename",
//   "description": "testedescription",
//   "amount": "testeamount",
//   "startDate": "testestartDate",
//   "endDate": "testeendDate"
// }