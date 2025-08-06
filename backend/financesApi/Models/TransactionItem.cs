namespace backend.financesApi.Models;

public class TransactionItem
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Type { get; set; }
    public string? Category { get; set; }
    public string? Value { get; set; }
    public DateTimeOffset Timestamp = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedAt = DateTimeOffset.UtcNow;

}