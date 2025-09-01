namespace backend.financesApi.DTOs;

public record EditSavingDTO(
    string Name,
    string Description,
    string Amount,
    string Category,
    DateTimeOffset TargetDate
);