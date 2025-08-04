namespace backend.financesApi.Models;

class Transaction
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Type { get; set; }
    public string? Category { get; set; }
    public string? Value { get; set; }
    public DateTimeOffset timestamp = DateTimeOffset.UtcNow;

}