using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Experience;

public class CreateExperienceDto
{
    [Required]
    [MaxLength(255)]
    public string Workplace { get; set; } = null!;

    [Required]
    public string WorkDescription { get; set; } = null!;

    [Required]
    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; } // if EndDate is null we can just Show "Present" on Frontend
}
