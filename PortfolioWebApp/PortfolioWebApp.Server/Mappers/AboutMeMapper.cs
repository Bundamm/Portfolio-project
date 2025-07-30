using PortfolioWebApp.Server.DTO.AboutMe;
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
                Email = aboutMe.Email
            };
        }
    }
}