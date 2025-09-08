namespace backend.financesApi.DTOs;

public record EditTransactionWithUpdatedAtDTO(
    string Name,
    string Type,
    string Category,
    string Value,
    DateTimeOffset UpdatedAt
);