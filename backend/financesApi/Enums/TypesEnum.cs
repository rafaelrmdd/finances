namespace backend.financesApi.Enums;

using System.Text.Json.Serialization;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TypesEnum
{
    INCOME,
    EXPENSE
}