using System.Text.Json.Serialization;

namespace backend.financesApi.Models;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    [JsonIgnore]
    public virtual IEnumerable<TransactionItem>? Transactions { get; set; }
    [JsonIgnore]
    public virtual IEnumerable<Saving>? Savings { get; set; }
    [JsonIgnore]
    public virtual IEnumerable<Budget>? Budgets { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}