using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace backend.financesApi.Enums;

public enum CategoriesEnum
{
    [EnumMember(Value = "food")]
    FOOD,
    [EnumMember(Value = "transportation")]
    TRANSPORTATION,
    [EnumMember(Value = "entertainment")]
    ENTERTAINMENT,
    [EnumMember(Value = "housing")]
    HOUSING,
    [EnumMember(Value = "education")]
    EDUCATION,
    [EnumMember(Value = "shopping")]
    SHOPPING,
    [EnumMember(Value = "other")]
    OTHER,
}