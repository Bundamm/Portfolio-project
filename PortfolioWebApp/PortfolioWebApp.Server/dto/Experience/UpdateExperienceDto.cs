using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Experience;

public class UpdateExperienceDto
{
    [Required]
    [MaxLength(255)]
    public string Workplace { get; set; } = null!;

    [Required]
    public string WorkDescription { get; set; } = null!;

    [Required]
    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }
}
