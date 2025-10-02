namespace backend.financesApi.DTOs;

public record AddBudgetDTO(
    string Name,
    string Description,
    Guid UserId,
    string Category,
    string Amount,
    string StartDate,
    string EndDate
);