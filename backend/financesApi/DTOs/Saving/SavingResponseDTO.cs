namespace backend.financesApi.DTOs;

public record SavingResponseDTO(
    Guid Id,
    Guid UserId,
    string Name,
    string? Description,
    string CurrentAmount,
    string TargetAmount,
    string Category,
    DateTimeOffset TargetDate,
    DateTimeOffset Timestamp
);