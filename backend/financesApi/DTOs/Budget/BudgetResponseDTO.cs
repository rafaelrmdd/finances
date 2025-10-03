namespace backend.financesApi.DTOs;

public record BudgetResponseDTO(
    Guid Id,
    Guid UserId,
    string Name,
    string Description,
    string Amount,
    string StartDate,
    string EndDate,
    string Category,
    DateTimeOffset Timestamp,
    DateTimeOffset UpdatedAt
);