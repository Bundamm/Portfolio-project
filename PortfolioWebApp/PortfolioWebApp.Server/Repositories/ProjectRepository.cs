
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

        public async Task<Project> CreateAsync(Project projectModel)
        {
            _context.projects.Add(projectModel);
            await _context.SaveChangesAsync();
            return projectModel;
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

        public async Task<Project?> UpdateAsync(int id, UpdateProjectDto projectDto)
        {
            var project = await _context.projects.FindAsync(id);
            if (project == null) return null;
            project.ProjectName = projectDto.Name;
            project.Description = projectDto.Description;
            project.CategoryId = projectDto.CategoryId;
            project.UserId = projectDto.UserId;
            await _context.SaveChangesAsync();
            return project;
        }


    }
}