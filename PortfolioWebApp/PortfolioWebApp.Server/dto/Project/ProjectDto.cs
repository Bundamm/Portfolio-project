namespace PortfolioWebApp.Server.DTO;

public class ProjectDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public int UserId { get; set; }
    public List<int> ImageIds { get; set; } = new List<int>();
    public List<int> PdfIds { get; set; } = new List<int>();
}