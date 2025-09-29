namespace backend.financesApi.DTOs;

public record EditBudgetDTO(
    string Name,
    string Category,
    string Amount,
    string StartDate,
    string EndDate,
    DateTimeOffset UpdatedAt
);