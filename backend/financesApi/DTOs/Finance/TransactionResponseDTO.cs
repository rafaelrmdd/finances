namespace backend.financesApi.DTOs;

public record TransactionResponseDTO(
    string Name,
    string Type,
    string Category,
    string Value,
    DateTimeOffset Timestamp
);