using PortfolioWebApp.Server.DTO.Category;

namespace PortfolioWebApp.Server.DTO;

public class ProjectDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int CategoryId { get; set; }
    public int UserId { get; set; }
    public List<ImageDto>? Images { get; set; } 
    public List<PdfDto>? Pdfs { get; set; } 
    
}