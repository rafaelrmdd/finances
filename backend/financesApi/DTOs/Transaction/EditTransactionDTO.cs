namespace backend.financesApi.DTOs;

public record EditTransactionDTO(
    string Name,
    string Type,
    string Category,
    string Value
);