using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Category;

public class UpdateCategoryDto
{
    [Required]
    [MinLength(5, ErrorMessage = "Name of category must be at least 5 characters long.")]
    [MaxLength(25, ErrorMessage = "Name of category cannot be longer than 25 characters.")]
    public string? CategoryName { get; set; } = null!;
    [Required]
    [MinLength(10, ErrorMessage = "Description must be at least 10 characters long.")]
    public string? Description { get; set; }
}