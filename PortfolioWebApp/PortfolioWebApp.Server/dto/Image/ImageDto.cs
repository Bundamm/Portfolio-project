namespace PortfolioWebApp.Server.DTO;


public class ImageDto
{
    public int Id { get; set; }
    public string Path { get; set; } = null!;
    public bool IsMain { get; set; } = false;
    public int ProjectId { get; set; }
}