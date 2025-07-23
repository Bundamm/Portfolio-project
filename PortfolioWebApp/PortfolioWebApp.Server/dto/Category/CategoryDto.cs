namespace PortfolioWebApp.Server.DTO.Category;

public class CategoryDto
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;
    public string? Description { get; set; }
    public List<ProjectDto>? Projects { get; set; }
}