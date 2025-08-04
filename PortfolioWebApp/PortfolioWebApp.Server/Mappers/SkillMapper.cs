using PortfolioWebApp.Server.DTO.Skills;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Mappers
{
    public static class SkillMappers
    {
        public static SkillDto ToSkillDto(this Skill skill)
        {
            return new SkillDto
            {
                Id = skill.Id,
                Name = skill.Name
            };
        }

        public static Skill ToSkillFromCreateDto(this CreateSkillDto dto)
        {
            return new Skill
            {
                Name = dto.Name
            };
        }

        public static void UpdateFromDto(this Skill skill, UpdateSkillDto dto)
        {
            skill.Name = dto.Name;
        }
    }
}
