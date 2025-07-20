namespace PortfolioWebApp.Server.DTO.Image;

public class CreateImageDto
{
    public string Path { get; set; } = null!;
    public int ProjectId { get; set; }
}