namespace backend.financesApi.DTOs;

public record AddSavingDTO(
    string Name,
    string? Description,
    Guid UserId,
    string TargetAmount,
    string Category,
    DateTimeOffset TargetDate
);