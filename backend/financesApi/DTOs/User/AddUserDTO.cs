using backend.financesApi.Enums;

namespace backend.financesApi.DTOs;

public record AddUserDTO(
    string Email,
    string Password,
    string Jwt
);