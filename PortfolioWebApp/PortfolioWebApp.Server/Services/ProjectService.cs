using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Npgsql.PostgresTypes;
using PortfolioWebApp.Server.Data;
using PortfolioWebApp.Server.Models;
using PortfolioWebApp.Server.Repositories;
using System.ComponentModel;

namespace PortfolioWebApp.Server.Services
{
    public class ProjectService
    {
        private readonly PortfolioWebAppContext _context;

        public ProjectService(PortfolioWebAppContext context, ProjectRepository projectRepository, UserRepository userRepository)
        {
            _context = context;
        }

        public async Task<Project> CreateProjectAsync(string projectName, string? description, int categoryId)
        {
            Project project = new Project { ProjectName = projectName, Description = description, CategoryId = categoryId };

            _context.projects.Add(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project?> DeleteProjectAsync(int projectId)   //or Task<Bool> if only want to know if deleted
        {
            var project = await _context.projects.FindAsync(projectId);
            if (project is null)
                throw new ArgumentNullException(nameof(project));

            _context.projects.Remove(project);
            await _context.SaveChangesAsync();
            return project;

        }


        public async Task<List<Project>> GetAllAsync()
        {
            return await _context.projects
                .Include(p => p.Category)
                .Include(p => p.User)
                .Include(p => p.Images)
                .Include(p => p.Pdfs)
                .OrderByDescending(p => p.ProjectId)
                .ToListAsync();
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            return await _context.projects
                .Include(p => p.Category)
                .Include(p => p.User)
                .Include(p => p.Images)
                .Include(p => p.Pdfs)
                .FirstOrDefaultAsync(p => p.ProjectId == id);
        }

        public async Task<Project?> UpdateAsync(int id, Project updated)
        {
            var project = await _context.projects.FindAsync(id);
            if (project == null)
                return null;

            project.ProjectName = updated.ProjectName;
            project.Description = updated.Description;
            project.CategoryId = updated.CategoryId;
            project.UserId = updated.UserId;

            await _context.SaveChangesAsync();
            return project;
        }
    }

}