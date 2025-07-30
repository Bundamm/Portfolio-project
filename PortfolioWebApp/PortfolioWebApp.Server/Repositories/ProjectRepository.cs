
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using PortfolioWebApp.Server.DTO.Project;
using PortfolioWebApp.Server.Helpers;

namespace PortfolioWebApp.Server.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly PortfolioWebAppContext _context;
        public ProjectRepository(PortfolioWebAppContext context)
        {
            _context = context;
        }

        public async Task<Project> CreateAsync(Project projectModel)
        {
            _context.Projects.Add(projectModel);
            await _context.SaveChangesAsync();
            return projectModel;
        }

        public async Task<Project?> DeleteAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return null;   
            }
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            return await _context.Projects
                .Include(i => i.Images)
                .Include(p => p.Pdfs)
                .Include(c => c.Category)
                .ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            return await _context.Projects
                .Include(i => i.Images)
                .Include(p => p.Pdfs)
                .Include(c => c.Category)
                .FirstOrDefaultAsync(i => i.ProjectId == id);
        }

        public Task<bool> ProjectExists(int id)
        {
            return _context.Projects.AnyAsync(s => s.ProjectId == id);
        }

        public async Task<Project?> UpdateAsync(int id, Project projectModel)
        {
            var existingProject = await _context.Projects.FirstOrDefaultAsync(x => x.ProjectId == id);
            if (existingProject == null) return null;
            existingProject.ProjectName = projectModel.ProjectName;
            existingProject.Description = projectModel.Description;
            existingProject.CategoryId = projectModel.CategoryId;
            await _context.SaveChangesAsync();
            return existingProject;
        }


    }
}