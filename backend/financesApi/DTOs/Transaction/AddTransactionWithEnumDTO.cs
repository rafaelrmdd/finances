using backend.financesApi.Enums;

namespace backend.financesApi.DTOs;

public record AddTransactionWithEnumDTO(
    string Name,
    Guid UserId,
    TypesEnum Type,
    CategoriesEnum Category,
    string Value,
    DateTimeOffset Timestamp
);