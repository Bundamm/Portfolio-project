using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Experience;

namespace PortfolioWebApp.Server.Interfaces
{
    public interface IExperienceRepository
    {
        Task<IEnumerable<Experience>> GetAllAsync();
        Task<Experience?> GetByIdAsync(int id);
        Task<Experience> CreateAsync(CreateExperienceDto dto);
        Task<Experience?> UpdateAsync(int id, UpdateExperienceDto dto);
        Task<bool> DeleteAsync(int id);
    }
}

