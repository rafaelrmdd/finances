namespace backend.financesApi.DTOs;

public record AddTransactionDTO(
    string Name,
    string Type,
    string Category,
    string Value
);