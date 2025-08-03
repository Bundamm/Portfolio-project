using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Project;

namespace PortfolioWebApp.Server.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task<Project> CreateAsync(Project projectModel);
        Task<Project?> UpdateAsync(int id, Project projectModel);
        Task<Project?> DeleteAsync(int id);
    }
}
