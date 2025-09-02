namespace backend.financesApi.DTOs;

public record SavingResponseDTO(
    string Name,
    string? Description,
    string CurrentAmount,
    string TargetAmount,
    string Category,
    DateTimeOffset TargetDate,
    DateTimeOffset Timestamp
);