using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace backend.financesApi.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum CategoriesEnum
{
    FOOD,
    TRANSPORTATION,
    ENTERTAINMENT,
    HOUSING,
    EDUCATION,
    SHOPPING,
    OTHER,
}