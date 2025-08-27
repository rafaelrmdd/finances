namespace backend.financesApi.DTOs;

public record EditBudgetDTO(
    string Name,
    string Category,
    string Amount,
    string startDate,
    string endDate,
    DateTimeOffset UpdatedAt
);