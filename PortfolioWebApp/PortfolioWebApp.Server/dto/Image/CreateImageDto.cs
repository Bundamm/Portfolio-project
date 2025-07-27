using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Image;

public class CreateImageDto
{
    [Required]
    [MinLength(1, ErrorMessage = "Path cannot be empty.")]
    public string Path { get; set; } = null!;
    [Required]
    public int ProjectId { get; set; }
}