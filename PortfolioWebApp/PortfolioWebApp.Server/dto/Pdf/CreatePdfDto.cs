using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Pdf;

public class CreatePdfDto
{
    [Required]
    public int ProjectId { get; set; }
    [Required]
    [MinLength(5, ErrorMessage = "Name must be at least 5 characters long.")]
    [MaxLength(25, ErrorMessage = "Name cannot be longer than 25 characters.")]
    public string Name { get; set; } = null!;
    [Required]
    [MinLength(1, ErrorMessage = "Path cannot be empty.")]
    public string Path { get; set; } = null!;
}