using System.ComponentModel.DataAnnotations;

namespace PortfolioWebApp.Server.DTO.Skills
{
    public class CreateSkillDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;
    }
}
