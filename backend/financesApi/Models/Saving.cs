using System.Text.Json.Serialization;

namespace backend.financesApi.Models;

public class Saving
{
    public Guid Id { get; set; }
    [JsonIgnore]
    public virtual User? User { get; set; }
    public Guid UserId { get; set; }

    public string Name { get; set; }
    public string Description { get; set; }
    public string CurrentAmount { get; set; } = "0";
    public string TargetAmount { get; set; }
    public SavingsCategoriesEnum Category { get; set; }
    public DateTimeOffset TargetDate { get; set; }
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedAt { get; set; }
}