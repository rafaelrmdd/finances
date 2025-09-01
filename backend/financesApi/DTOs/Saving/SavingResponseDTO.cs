namespace backend.financesApi.DTOs;

public record SavingResponseDTO(
    string Name,
    string? Description,
    string TargetAmount,
    string Category,
    DateTimeOffset TargetDate,
    DateTimeOffset Timestamp
);