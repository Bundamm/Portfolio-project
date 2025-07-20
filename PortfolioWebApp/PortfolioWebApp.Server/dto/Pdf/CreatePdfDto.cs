namespace PortfolioWebApp.Server.DTO.Pdf;

public class CreatePdfDto
{
    public int ProjectId { get; set; }
    public string Name { get; set; } = null!;
    public string Path { get; set; } = null!;
}