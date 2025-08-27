namespace backend.financesApi.DTOs;

public record AddBudgetDTO(
    string Name,
    string Description,
    string Amount,
    string StartDate,
    string EndDate
);