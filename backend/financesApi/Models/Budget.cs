using backend.financesApi.Enums;

namespace backend.financesApi.Models;

public class Budget
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string Amount { get; set; }
    public CategoriesEnum Category { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public DateTimeOffset Timestamp { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedAt { get; set; }
}