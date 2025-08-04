using PortfolioWebApp.Server.DTO.Experience;
using PortfolioWebApp.Server.DTO.Skills;

namespace PortfolioWebApp.Server.DTO.AboutMe;

public class AboutMeDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }

    public List<ExperienceDto> Experiences { get; set; } = new();
    public List<SkillDto> Skills { get; set; } = new();

}