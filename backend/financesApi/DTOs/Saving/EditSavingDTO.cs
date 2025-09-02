namespace backend.financesApi.DTOs;

public record EditSavingDTO(
    string Name,
    string Description,
    string CurrentAmount,
    string TargetAmount,
    string Category,
    DateTimeOffset TargetDate
);