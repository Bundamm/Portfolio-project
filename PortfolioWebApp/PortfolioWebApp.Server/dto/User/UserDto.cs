namespace PortfolioWebApp.Server.DTO.User;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string Role { get; set; } = "admin";
    public List<int> ProjectIds { get; set; } = new List<int>();
}