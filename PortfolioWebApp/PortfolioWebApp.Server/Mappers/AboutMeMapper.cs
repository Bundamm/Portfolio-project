using PortfolioWebApp.Server.DTO.AboutMe;
using PortfolioWebApp.Server.DTO.Experience;
using PortfolioWebApp.Server.DTO.Skills;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Mappers
{
    public static class AboutMeMappers
    {
        public static AboutMeDto ToAboutMeDto(this AboutMe aboutMe)
        {
            return new AboutMeDto
            {
                Id = aboutMe.Id,
                Title = aboutMe.Title,
                Description = aboutMe.Description,
                Phone = aboutMe.PhoneNumber,
                Email = aboutMe.Email,
                Experiences = aboutMe.Experiences.Select(e => new ExperienceDto
                {
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    Workplace = e.Workplace,
                    WorkDescription = e.WorkDescription
                }).ToList(),
                Skills = aboutMe.Skills.Select(s => new SkillDto
                {
                    Name = s.Name
                }).ToList()
            };
        }
    }

}