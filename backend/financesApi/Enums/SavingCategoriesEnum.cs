using System.Runtime.Serialization;
using System.Text.Json.Serialization;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum SavingsCategoriesEnum
{
    EMERGENCY,
    VACATION,
    HOUSING,
    CAR,
    WEDDING,
    RETIREMENT,
    EDUCATION,
    BUSINESS,
    INVESTMENT,
    HEALTH,
    TECHNOLOGY,
    OTHER
}