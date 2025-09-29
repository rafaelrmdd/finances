using System.Text.Json.Serialization;
using backend.financesApi.Enums;

namespace backend.financesApi.Models;

public class TransactionItem
{
    public Guid Id { get; set; }
    [JsonIgnore]
    public virtual User? User { get; set; }
    public Guid UserId { get; set; }
    public string? Name { get; set; }
    public TypesEnum Type { get; set; }
    public CategoriesEnum Category { get; set; }
    public string? Value { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }

}