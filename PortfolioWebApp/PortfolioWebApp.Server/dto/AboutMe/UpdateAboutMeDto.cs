using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.AboutMe;

public class UpdateAboutMeDto
{
    [Required]
    [MinLength(5, ErrorMessage ="Title must be at least 5 characters long.")]
    [MaxLength(25, ErrorMessage = "Title cannot be longer than 25 characters.")]
    public string? Title { get; set; }
    [Required]
    [MinLength(10, ErrorMessage ="Description must be at least 10 characters long.")]
    public string? Description { get; set; }

    public string? Phone { get; set; }
    public string? Email { get; set; }
}