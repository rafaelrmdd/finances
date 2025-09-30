namespace backend.financesApi.DTOs;

public record EditUserDTO(
    string Email,
    string Password,
    string Jwt
);