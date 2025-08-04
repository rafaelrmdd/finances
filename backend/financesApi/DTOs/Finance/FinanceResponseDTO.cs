namespace backend.financesApi.DTOs;

public record FinanceResponseDTO(
                                    string Name,
                                    string Type,
                                    string Category,
                                    string Value,
                                    DateTimeOffset Timestamp
                                );