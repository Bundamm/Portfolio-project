using PortfolioWebApp.Server.DTO.AboutMe;
using PortfolioWebApp.Server.Models;

namespace PortfolioWebApp.Server.Repositories
{
    public interface IAboutMeRepository
    {
        Task<AboutMe?> GetByIdAsync(int id);
        Task<AboutMe?> UpdateAsync(int id, UpdateAboutMeDto aboutMeDto);
    }
}
