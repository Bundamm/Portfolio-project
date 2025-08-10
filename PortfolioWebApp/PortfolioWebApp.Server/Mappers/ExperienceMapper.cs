using PortfolioWebApp.Server.DTO.Experience;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Mappers
{
    public static class ExperienceMappers
    {
        public static ExperienceDto ToExperienceDto(this Experience experience)
        {
            return new ExperienceDto
            {
                Id = experience.Id,
                StartDate = experience.StartDate,
                EndDate = experience.EndDate,
                Workplace = experience.Workplace,
                WorkDescription = experience.WorkDescription
            };
        }

        public static Experience ToExperienceFromCreateDto(this CreateExperienceDto dto)
        {
            return new Experience
            {
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Workplace = dto.Workplace,
                WorkDescription = dto.WorkDescription
            };
        }

        public static void UpdateFromDto(this Experience experience, UpdateExperienceDto dto)
        {
            experience.StartDate = dto.StartDate;
            experience.EndDate = dto.EndDate;
            experience.Workplace = dto.Workplace;
            experience.WorkDescription = dto.WorkDescription;
        }
    }
}
