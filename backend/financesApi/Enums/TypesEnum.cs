namespace backend.financesApi.Enums;

using System.Runtime.Serialization;

public enum TypesEnum
{
    [EnumMember(Value = "income")]
    INCOME,
    [EnumMember(Value = "expense")]
    EXPENSE
}