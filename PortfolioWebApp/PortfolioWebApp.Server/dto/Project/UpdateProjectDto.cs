namespace PortfolioWebApp.Server.DTO.Project;

public class UpdateProjectDto
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public int UserId { get; set; }
}