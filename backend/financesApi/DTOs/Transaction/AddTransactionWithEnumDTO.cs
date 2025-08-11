using backend.financesApi.Enums;

namespace backend.financesApi.DTOs;

public record AddTransactionWithEnumDTO(
    string Name,
    TypesEnum Type,
    CategoriesEnum Category,
    string Value
);