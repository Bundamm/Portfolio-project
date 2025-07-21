using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.DTO.Project;

namespace PortfolioWebApp.Server.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task<Project> CreateAsync(Project projectModel);
        Task<Project?> UpdateAsync(int id, UpdateProjectDto projectDto);
        Task<Project?> DeleteAsync(int id);
        Task<bool> ImageExists(int id);

    }
}