using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Image;

public class UpdateImageDto
{
    [Required]
    [MinLength(1, ErrorMessage = "Path cannot be empty.")]
    public string Path { get; set; } = null!;
}