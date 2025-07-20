namespace PortfolioWebApp.Server.DTO;

public class PdfDto
{
    public int Id { get; set; }
    public int ProjectId {  get; set; }
    public string Name { get; set; } = null!;
    public string Path { get; set; } = null!;
}