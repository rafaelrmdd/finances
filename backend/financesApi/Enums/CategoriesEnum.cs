using System.Runtime.Serialization;

namespace backend.financesApi.Enums;

[DataContract]
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
    [EnumMember(Value = "other")]
    OTHER,
}