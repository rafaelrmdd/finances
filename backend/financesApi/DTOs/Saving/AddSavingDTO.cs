namespace backend.financesApi.DTOs;

public record AddSavingDTO(
    string Name,
    string? Description,
    string TargetAmount,
    string Category,
    DateTimeOffset TargetDate
);