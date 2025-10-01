using backend.financesApi.Enums;

namespace backend.financesApi.DTOs;

public record AddTransactionDTO(
    string Name,
    string UserId,
    string Type,
    string Category,
    string Value
);