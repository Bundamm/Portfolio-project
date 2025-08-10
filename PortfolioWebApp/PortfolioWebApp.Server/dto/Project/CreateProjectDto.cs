using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Project;

public class CreateProjectDto
{
    [Required]
    [MinLength(5, ErrorMessage = "Name must be at least 5 characters long.")]
    [MaxLength(255, ErrorMessage = "Name cannot be longer than 25 characters.")]
    public string Name { get; set; } = null!;
    [Required]
    [MinLength(10, ErrorMessage = "Description must be at least 5 characters long.")]
    public string? Description { get; set; }
}