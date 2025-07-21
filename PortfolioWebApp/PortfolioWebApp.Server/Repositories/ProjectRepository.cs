
using System.ComponentModel.DataAnnotations;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.DTO.Project;

namespace PortfolioWebApp.Server.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly PortfolioWebAppContext _context;
        public ProjectRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public Task<Project> CreateAsync(Project projectModel)
        {
            throw new NotImplementedException();
        }

        public Task<Project?> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            return await _context.projects
                .Include(i => i.Images)
                .Include(p => p.Pdfs)
                .ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            return await _context.projects
                .Include(i => i.Images)
                .Include(p => p.Pdfs)
                .FirstOrDefaultAsync(i => i.ProjectId == id);
        }

        public Task<bool> ProjectExists(int id)
        {
            return _context.projects.AnyAsync(s => s.ProjectId == id);
        }

        public Task<Project?> UpdateAsync(int id, UpdateProjectDto projectDto)
        {
            throw new NotImplementedException();
        }


    }
}