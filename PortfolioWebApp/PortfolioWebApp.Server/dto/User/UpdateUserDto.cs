namespace PortfolioWebApp.Server.DTO.User;

public class UpdateUserDto
{
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string Role { get; set; } = "admin";
}