using System.Runtime.Serialization;

[DataContract]
public enum SavingsCategoriesEnum
{
    [EnumMember(Value = "emergency")]
    EMERGENCY,
    [EnumMember(Value = "vacation")]
    VACATION,
    [EnumMember(Value = "housing")]
    HOUSING,
    [EnumMember(Value = "car")]
    CAR,
    [EnumMember(Value = "wedding")]
    WEDDING,
    [EnumMember(Value = "retirement")]
    RETIREMENT,
    [EnumMember(Value = "education")]
    EDUCATION,
    [EnumMember(Value = "business")]
    BUSINESS,
    [EnumMember(Value = "investment")]
    INVESTMENT,
    [EnumMember(Value = "health")]
    HEALTH,
    [EnumMember(Value = "technology")]
    TECHNOLOGY,
    [EnumMember(Value = "other")]
    OTHER
}