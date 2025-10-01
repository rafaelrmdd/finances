namespace backend.financesApi.DTOs;

public record TransactionResponseDTO(
    Guid Id,
    Guid UserId,
    string Name,
    string Type,
    string Category,
    string Value,
    DateTimeOffset Timestamp,
    DateTimeOffset UpdatedAt
);