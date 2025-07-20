namespace PortfolioWebApp.Server.DTO.Image;

public class UpdateImageDto
{
    public string Path { get; set; } = null!;
    public int ProjectId { get; set; }
}